"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const prisma_service_1 = require("./prisma.service");
const auth_module_1 = require("./auth/auth.module");
const contactus_module_1 = require("./contactus/contactus.module");
const home_module_1 = require("./home/home.module");
const upload_module_1 = require("./upload/upload.module");
const product_module_1 = require("./product/product.module");
const cart_module_1 = require("./cart/cart.module");
const blog_module_1 = require("./blog/blog.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const coupoun_module_1 = require("./coupoun/coupoun.module");
const payment_module_1 = require("./payment/payment.module");
const rating_module_1 = require("./rating/rating.module");
const chat_module_1 = require("./chat/chat.module");
const notification_module_1 = require("./notification/notification.module");
const schedule_1 = require("@nestjs/schedule");
const tasks_module_1 = require("./tasks/tasks.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({ req }),
                uploads: false,
                csrfPrevention: false,
                playground: true,
                introspection: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            contactus_module_1.ContactusModule,
            home_module_1.HomeModule,
            upload_module_1.UploadModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            blog_module_1.BlogModule,
            wishlist_module_1.WishlistModule,
            coupoun_module_1.CoupounModule,
            payment_module_1.PaymentModule,
            rating_module_1.RatingModule,
            chat_module_1.ChatModule,
            notification_module_1.NotificationModule,
            tasks_module_1.TasksModule
        ],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map