import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateContactusInput } from './dto/create-contactus.input';
import { PrismaService } from 'src/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactusInput: CreateContactusInput) {
    if (!createContactusInput) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: createContactusInput.email,
        subject: 'Your OTP for Login',
        text: `We got your message, soon we will be connecting to you.`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email');
    }

    try {
      return await this.prisma.contactUs.create({ data: createContactusInput });
    } catch (error) {
      throw new InternalServerErrorException('Failed to save contact message');
    }
  }
}
