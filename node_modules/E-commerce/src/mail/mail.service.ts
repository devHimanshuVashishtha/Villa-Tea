// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendSaleEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: `"ShopNow" ${process.env.EMAIL_USER}`,
      to,
      subject,
      html,
    });
  }
}
