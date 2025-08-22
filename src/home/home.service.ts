import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHomeInput } from './dto/create-home.input';
import { UpdateHomeInput } from './dto/update-home.input';
import { Home } from './entities/home.entity'; // Adjust as needed
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHomeInput: CreateHomeInput) {
    if (!createHomeInput || !createHomeInput.paragraphs || createHomeInput.paragraphs.length === 0) {
      throw new BadRequestException('Invalid data: Paragraphs are required');
    }

    try {
      const newHomePageContent = await this.prisma.homePageContent.create({
        data: {
          image: createHomeInput.image,
          heading: createHomeInput.heading,
          paragraphs: {
            create: createHomeInput.paragraphs.map((paragraph) => ({
              text: paragraph.text,
            })),
          },
        },
      });

      return newHomePageContent;
    } catch (error) {
      throw new InternalServerErrorException('Error creating home page content: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.homePageContent.findMany({
        include: {
          paragraphs: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching home page contents: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      const homeContent = await this.prisma.homePageContent.findUnique({
        where: { id },
        include: { paragraphs: true },
      });

      if (!homeContent) {
        throw new BadRequestException(`Home page content with ID ${id} not found`);
      }

      return homeContent;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching home page content: ' + error.message);
    }
  }
}
