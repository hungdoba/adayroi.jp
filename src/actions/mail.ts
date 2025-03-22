'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.SENDGRID_API_KEY,
  },
});

export async function sendMail(
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<true | string> {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent:', {
      accepted: info.accepted,
      response: info.response,
      envelope: info.envelope,
    });

    return true;
  } catch (err) {
    return (err as Error).message;
  }
}
