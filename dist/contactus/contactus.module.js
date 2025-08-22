"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactusModule = void 0;
const common_1 = require("@nestjs/common");
const contactus_service_1 = require("./contactus.service");
const contactus_resolver_1 = require("./contactus.resolver");
const prisma_service_1 = require("../prisma.service");
let ContactusModule = class ContactusModule {
};
exports.ContactusModule = ContactusModule;
exports.ContactusModule = ContactusModule = __decorate([
    (0, common_1.Module)({
        providers: [contactus_resolver_1.ContactusResolver, contactus_service_1.ContactusService, prisma_service_1.PrismaService],
    })
], ContactusModule);
//# sourceMappingURL=contactus.module.js.map