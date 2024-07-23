import clientSES from '@aws-sdk/client-ses';

const ses = new clientSES.SES({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export { ses, clientSES };
