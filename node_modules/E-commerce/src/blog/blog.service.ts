import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogInput: CreateBlogInput) {
    if (
      !createBlogInput ||
      !createBlogInput.paragraphs ||
      createBlogInput.paragraphs.length === 0
    ) {
      throw new BadRequestException('Invalid data: Paragraphs are required');
    }

    try {
      const newBlogPageContent = await this.prisma.blog.create({
        data: {
          image: createBlogInput.image,
          heading: createBlogInput.heading,
          paragraphs: {
            create: createBlogInput.paragraphs.map((paragraph) => ({
              text: paragraph.text,
            })),
          },
        },
        include: {
          paragraphs: true,
        },
      });

      return newBlogPageContent;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create blog');
    }
  }

  async findAll() {
    try {
      return await this.prisma.blog.findMany({
        include: {
          paragraphs: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch blogs');
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
        include: {
          paragraphs: true,
        },
      });

      if (!blog) {
        throw new BadRequestException(`Blog with ID ${id} not found`);
      }

      return blog;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch blog');
    }
  }

  async update(id: string, updateBlogInput: UpdateBlogInput) {
    try {
      const existingBlog = await this.prisma.blog.findUnique({ where: { id } });
      if (!existingBlog) {
        throw new BadRequestException(`Blog with ID ${id} not found`);
      }

      if (updateBlogInput.paragraphs) {
        await this.prisma.blogParagraph.deleteMany({
          where: { blogId: id },
        });

        await this.prisma.blog.update({
          where: { id },
          data: {
            paragraphs: {
              create: updateBlogInput.paragraphs.map((p) => ({ text: p.text })),
            },
          },
        });
      }

      return await this.prisma.blog.update({
        where: { id },
        data: {
          heading: updateBlogInput.heading,
          image: updateBlogInput.image,
        },
        include: {
          paragraphs: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update blog');
    }
  }

  async remove(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
      });

      if (!blog) {
        throw new BadRequestException(`Blog with ID ${id} not found`);
      }

      return await this.prisma.blog.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete blog');
    }
  }
}
