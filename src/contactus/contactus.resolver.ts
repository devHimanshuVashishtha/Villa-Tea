import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactusService } from './contactus.service';
import { Contactus } from './entities/contactus.entity';
import { CreateContactusInput } from './dto/create-contactus.input';
import { UpdateContactusInput } from './dto/update-contactus.input';

@Resolver(() => Contactus)
export class ContactusResolver {
  constructor(private readonly contactusService: ContactusService) {}

  @Mutation(() => Contactus)
  createContactUs(@Args('createContactusInput') createContactusInput: CreateContactusInput) {
    return this.contactusService.create(createContactusInput);
  }

 
}
