import { IUser } from '@components/account/user/user.interface';
import config from '@config/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const clearEmail = (email: string): string => {
  const indexPlusAt = email.indexOf('+');
  const indexAt = email.indexOf('@');
  return email.replace(email.slice(indexPlusAt, indexAt), '');
};

interface Email {
  Name?: string;
  Email: string;
}

interface SendingEmail {
  FromEmail: string;
  FromName: string;
  Recipients: Email[];
  Subject: string;
  'Text-part': string;
  'Html-part': string;
}

const sendingEmail: SendingEmail = {
  FromEmail: config.emailSender,
  FromName: config.emailSenderName,
  Recipients: [],
  Subject: '',
  'Text-part': '',
  'Html-part': '',
};

const sendVerificationEmail = (user: IUser): Promise<any> => {
  return axios.post(
    config.emailApiUrl,
    {
      ...sendingEmail,
      Recipients: [
        {
          Email: clearEmail(user.email),
          Name: user.name,
        },
      ],
      Subject: 'Verification Email',
      'Text-part': `Hello this email is for verificate your email address,
        please continue with the link (${config.appUrl}/api/account/verify/${user.verified})`,
      'Html-part': `<html>
        <head></head>
        <body>
            <h1>Hello this email is for verificate your email address,
                <a href="${config.appUrl}/api/account/verify/${user.verified}">please click here for continue...</a>
            </h1>
        </body>
        </html>`,
    },
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${config.emailApiKey}:${config.emailSecretKey}`,
        )}`,
      },
    },
  );
};

const sendWelcomeEmail = (user: IUser): Promise<any> => {
  return axios.post(
    config.emailApiUrl,
    {
      ...sendingEmail,
      Recipients: [
        {
          Email: clearEmail(user.email),
          Name: user.name,
        },
      ],
      Subject: 'Welcome to the project',
      'Text-part': `Hello, this email is to welcome you to the project,
            continue with the link (${config.appFrontUrl})`,
      'Html-part': `<html>
          <head></head>
          <body>
              <h1>Hello, this email is to welcome you to the project,
              <a href="${config.appFrontUrl}">we hope to see you here often.</a>
              </h1>
          </body>
          </html>`,
    },
    {
      auth: {
        username: config.emailApiKey,
        password: config.emailSecretKey,
      },
    },
  );
};

export { sendVerificationEmail, sendWelcomeEmail };
