import AWS from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { EmailRequest } from './model';
AWS.config.update({ region: 'eu-central-1' });
const CHARSET = 'ISO-8859-1';

export async function handler(event: EmailRequest): Promise<{error: boolean}> {
  const { from, to, replyTo, subject, body } = event;

  const params: SendEmailRequest = {
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
  const sendEmail = ses.sendEmail(params);

  return sendEmail.promise()
    .then(() => ({error: false}));
}
