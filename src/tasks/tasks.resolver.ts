import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => String)
  startCronJob(@Args('name') name: string): string {
    this.tasksService.addCronJob(name);
    return `Cron job "${name}" started`;
  }

  @Mutation(() => String)
  stopCronJob(@Args('name') name: string): string {
    this.tasksService.stopCronJob(name);
    return `Cron job "${name}" stopped`;
  }

  @Mutation(() => String)
  deleteCronJob(@Args('name') name: string): string {
    this.tasksService.deleteCronJob(name);
    return `Cron job "${name}" deleted`;
  }
}