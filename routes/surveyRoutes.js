const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const cleanCache = require('../middlewares/cleanCache');
const { surveyValidation } = require('../utils/validation');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:id', requireLogin, async (req, res) => {
    const survey = await Survey.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(survey);
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey
        .find({ _user: req.user.id })
        .cache({ key: req.user.id })
        .select({ recipients: false }) // no recipients will be returned
        .exec();
      res.send(surveys);
    } catch (err) {
      console.log(err.stack);
    }
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // A user has the choice to vote for a survey
    // When the user clicks yes or no, an email that contains a template is sent to user
    // Each choice choosen by the user is updated in the database, and incremented by one
    // In order to keep track of the user's votes, a webhook is used
    // Several methods from lodash library are chained together in order to satisfy the required update
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipient: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({ });
  });

  app.post('/api/surveys', requireLogin, cleanCache, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, imageUrl } = req.body;
    const newRecipients = recipients.split(',').map(email => ({ email: email.trim() }));

    const validateSurvey = {
      title,
      subject,
      body,
      recipient: newRecipients,
      imageUrl
    };

    const { error } = surveyValidation(validateSurvey);
    if (error) {
      res.status(400).send(error.details[0].message);
    }

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: newRecipients,
      imageUrl: imageUrl,
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
