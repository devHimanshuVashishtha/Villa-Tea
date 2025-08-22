import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import axios from 'axios';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}


async chat(query: string, imageUrl?: string): Promise<string> {
  try {
    let answer: string;

    if (imageUrl) {
      answer = await this.analyzeImageWithDeepInfra(imageUrl, query);
    } else {
      answer = await this.callDeepSeekAPI(query);
    }

    await this.prisma.chat.create({
      data: {
        prompt: query,
        imageUrl: imageUrl || null,
        response: answer,
      },
    });

    return answer;
  } catch (error) {

    throw new InternalServerErrorException('Something went wrong while processing the chat request.');
  }
}


  async analyzeImageWithDeepInfra(
    imageUrl: string,
    prompt: string,
  ): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.deepinfra.com/v1/openai/chat/completions',
        {
          model: 'meta-llama/Llama-3.2-11B-Vision-Instruct',
          messages: [
            {
              role: 'user',
              content: [
                { 
                  type: 'text',
                 text: prompt 
                },
                 { "type": "image_url",
              "image_url": {
                "url": imageUrl}}],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer xpqensUkRBteCGQiad1jotaKOGRWd5lt`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content;
      } else {
        throw new Error('No valid response from Deep Infra');
      }
    } catch (error) {
      console.error(
        'Deep Infra API error:',
        error?.response?.data || error.message,
      );
      throw new Error('Failed to analyze image with Deep Infra');
    }
  }

  private async callDeepSeekAPI(query: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: 'user',
              content: query,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );


      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content;
      } else {
        throw new Error('Unexpected response format from OpenRouter API');
      }
    } catch (error) {
      console.error(
        'OpenRouter API error:',
        error?.response?.data || error.message,
      );
      throw new Error('Failed to fetch answer from OpenRouter');
    }
  }


}
