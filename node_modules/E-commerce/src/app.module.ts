import { Module} from '@nestjs/common';

import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ContactusModule } from './contactus/contactus.module';
import { HomeModule } from './home/home.module';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { BlogModule } from './blog/blog.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CoupounModule } from './coupoun/coupoun.module';
import { PaymentModule } from './payment/payment.module';
import { RatingModule } from './rating/rating.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
 
    
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }), // 👈 जरूरी है
      uploads: false,
      csrfPrevention: false,
      playground: true, 
      introspection: true, 
     }),
     
     ScheduleModule.forRoot(),
     

    UserModule,
    AuthModule,
    ContactusModule,
    HomeModule,
    UploadModule,
    ProductModule,
    CartModule,
    BlogModule,
    WishlistModule,
    CoupounModule,
    PaymentModule,
    RatingModule,
    ChatModule,
    NotificationModule,
   TasksModule
  ],
  providers: [ PrismaService],
})
export class AppModule {}
