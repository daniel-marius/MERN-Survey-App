const Joi = require("joi");

const recipientValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .email()
      .required(),
    responded: Joi.boolean()
      .required()
  };

  const inputValidation = Joi.validate(data, schema);
  return inputValidation;
};

const surveyValidation = data => {
  const email = Joi.string()
    .min(6)
    .max(255)
    .email()
    .required();

  const schema = {
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    subject: Joi.string()
      .min(1)
      .max(255)
      .required(),
    body: Joi.string()
      .min(1)
      .min(255)
      .required(),
    recipients: Joi.array()
      .items(email),
    imageUrl: Joi.string()
      .min(8)
      .required()
  };

  const inputValidation = Joi.validate(data, schema);
  return inputValidation;
};

module.exports.surveyValidation = surveyValidation;
