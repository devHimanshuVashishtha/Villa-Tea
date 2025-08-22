"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const axios_1 = require("axios");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async chat(query, imageUrl) {
        try {
            let answer;
            if (imageUrl) {
                answer = await this.analyzeImageWithDeepInfra(imageUrl, query);
            }
            else {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong while processing the chat request.');
        }
    }
    async analyzeImageWithDeepInfra(imageUrl, prompt) {
        try {
            const response = await axios_1.default.post('https://api.deepinfra.com/v1/openai/chat/completions', {
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
                                    "url": imageUrl
                                } }
                        ],
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer xpqensUkRBteCGQiad1jotaKOGRWd5lt`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data && response.data.choices && response.data.choices[0]) {
                return response.data.choices[0].message.content;
            }
            else {
                throw new Error('No valid response from Deep Infra');
            }
        }
        catch (error) {
            console.error('Deep Infra API error:', error?.response?.data || error.message);
            throw new Error('Failed to analyze image with Deep Infra');
        }
    }
    async callDeepSeekAPI(query) {
        try {
            const response = await axios_1.default.post('https://openrouter.ai/api/v1/chat/completions', {
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [
                    {
                        role: 'user',
                        content: query,
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data && response.data.choices && response.data.choices[0]) {
                return response.data.choices[0].message.content;
            }
            else {
                throw new Error('Unexpected response format from OpenRouter API');
            }
        }
        catch (error) {
            console.error('OpenRouter API error:', error?.response?.data || error.message);
            throw new Error('Failed to fetch answer from OpenRouter');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map