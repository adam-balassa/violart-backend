const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });
const CHARSET = 'ISO-8859-1';

exports.handler = async (event) => {
  const { from, to, replyTo, subject, body } = event;

  const params = {
    Destination: {
      ToAddresses: to
    },
    Source: from,
    ReplyToAddresses: [replyTo],
    Message: {
      Subject: { Charset: CHARSET, Data: subject },
      Body: {
        Html: { Charset: CHARSET, Data: body }
      },
    }
  };

  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const sendEmail = ses.sendEmail(params)

  return sendEmail.promise();
};