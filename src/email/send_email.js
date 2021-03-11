const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });
const VIOLART_EMAIL = 'info@violartstudio.com';
const VIOLA_EMAIL = 'viola.hv@gmail.com'
const CHARSET = 'ISO-8859-1';

exports.handler = async (event) => {
  const req = JSON.parse(event.body);
  const res = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }

  const { sender, subject, body } = req;
  const finalBody = getFinalBody(sender, subject, body);
  const finalSubject = `ViolArt üzenet: ${subject}`

  return sendEmail(sender, VIOLART_EMAIL, VIOLA_EMAIL, finalSubject, finalBody)
    .then(_ => {
      res.body = JSON.stringify({ error: false })
      return res;
    })
    .catch(err => {
      console.error(err, err.stack);
      res.statusCode = 500
      res.body = JSON.stringify({
        error: true,
        message: 'An error occured'
      });
      return res;
    });
};

function getFinalBody(sender, subject, body) {
  return `
    <h1>Üzenet érkezett a violartstudio.com-ról</h1>
    <div style="background-color: #0001; border-radius: 10px; padding: 8px 16px">
      <b>Feladó</b>: ${sender}</br>
      <b>Tárgy</b>: ${subject}</br>
      <b>Üzenet</b>:
      <p>${body}</p>
    </div>
  `
}

function sendEmail(from, to, cc, subject, message) {
  const params = {
    Destination: {
      ToAddresses: [to, cc]
    },
    Source: to,
    ReplyToAddresses: [from],
    Message: {
      Subject: { Charset: CHARSET, Data: subject },
      Body: {
        Html: { Charset: CHARSET, Data: message }
      },
    }
  };

  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const sendEmail = ses.sendEmail(params)

  return sendEmail.promise();
}