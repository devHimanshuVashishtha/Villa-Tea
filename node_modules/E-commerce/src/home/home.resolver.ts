import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HomeService } from './home.service';
import { Home } from './entities/home.entity';
import { CreateHomeInput } from './dto/create-home.input';
import { UpdateHomeInput } from './dto/update-home.input';

@Resolver(() => Home)
export class HomeResolver {
  constructor(private readonly homeService: HomeService) {}

  @Mutation(() => Home)
  createHomePage(@Args('createHomeInput') createHomeInput: CreateHomeInput) {
    return this.homeService.create(createHomeInput);
  }

  @Query(() => [Home], { name: 'homes' }) // Changed to 'homes' as it's a list
  findAllHomePage() {
    return this.homeService.findAll();
  }

  @Query(() => Home, { name: 'home' })
  findOneHomePage(@Args('id') id: string) { // ID should be string
    return this.homeService.findOne(id);
  }

}
