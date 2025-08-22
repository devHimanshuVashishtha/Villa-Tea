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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactusResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contactus_service_1 = require("./contactus.service");
const contactus_entity_1 = require("./entities/contactus.entity");
const create_contactus_input_1 = require("./dto/create-contactus.input");
let ContactusResolver = class ContactusResolver {
    contactusService;
    constructor(contactusService) {
        this.contactusService = contactusService;
    }
    createContactUs(createContactusInput) {
        return this.contactusService.create(createContactusInput);
    }
};
exports.ContactusResolver = ContactusResolver;
__decorate([
    (0, graphql_1.Mutation)(() => contactus_entity_1.Contactus),
    __param(0, (0, graphql_1.Args)('createContactusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contactus_input_1.CreateContactusInput]),
    __metadata("design:returntype", void 0)
], ContactusResolver.prototype, "createContactUs", null);
exports.ContactusResolver = ContactusResolver = __decorate([
    (0, graphql_1.Resolver)(() => contactus_entity_1.Contactus),
    __metadata("design:paramtypes", [contactus_service_1.ContactusService])
], ContactusResolver);
//# sourceMappingURL=contactus.resolver.js.map