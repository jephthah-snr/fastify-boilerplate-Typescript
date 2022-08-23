import Bull from "bull";
import * as dotenv from "dotenv";

dotenv.config();

export const EriConfig = {
  name: process.env.APP_NAME as string,
  port: process.env.PORT,
  environment: process.env.APP_ENV as string,
  key: process.env.APP_KEY as string,
  otpExpiry: process.env.OTP_EXPIRE_IN,
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID as string,
    token: process.env.TWILIO_AUTH_TOKEN as string,
  },
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD as string,
  },
  database: {
    host: (process.env.DB_HOST as string) || "us-cdbr-east-05.cleardb.net",
    database: (process.env.DB_NAME as string) || "heroku_9247e57bb11464c",
    user: (process.env.DB_USER as string) || "bf2e42f1686ee5",
    password: (process.env.DB_PASSWORD as string) || "dd8cf755",
    port: "3306",
    charset: "utf8mb4",
  },
  mailer: {
    host: process.env.MAILER_HOST || "",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  attempts: Number(process.env.QUEUE_ATTEMPTS),
  queue: (name: string) => {
    return new Bull(name, {
      redis: EriConfig.redis,
    });
  },
};

const mailConfig = EriConfig.mailer;

export default mailConfig;
