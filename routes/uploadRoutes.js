const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  endpoint: 'https://s3.eu-west-1.amazonaws.com',
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'eu-west-1',
  sslEnaled: true
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const bucket = 's3_bucket_name';
    const contentType = 'images/jpeg|jpg|png|gif';
    const key = `${req.user.id}/${uuid()}.jpg`;
    const params = {
      Bucket: bucket,
      ContentType: contentType,
      Key: key
    };

    s3.getSignedUrl('putObject', params, (err, url) => res.send({ key, url }));
  });
};
