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
exports.RatingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const rating_service_1 = require("./rating.service");
const rating_entity_1 = require("./entities/rating.entity");
const create_rating_input_1 = require("./dto/create-rating.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RatingResolver = class RatingResolver {
    ratingService;
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    createUpdateRating(context, createRatingInput) {
        const userId = context.req.user.id;
        return this.ratingService.create(userId, createRatingInput);
    }
    deleteRating(context, productId) {
        const userId = context.req.user.id;
        return this.ratingService.deleteRating(userId, productId);
    }
};
exports.RatingResolver = RatingResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => rating_entity_1.Rating),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('createRatingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rating_input_1.CreateRatingInput]),
    __metadata("design:returntype", void 0)
], RatingResolver.prototype, "createUpdateRating", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => rating_entity_1.Rating),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RatingResolver.prototype, "deleteRating", null);
exports.RatingResolver = RatingResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingResolver);
//# sourceMappingURL=rating.resolver.js.map