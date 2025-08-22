import { Injectable,Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string) {
    if (this.schedulerRegistry.doesExist('cron', name)) {
      throw new Error(`Cron job "${name}" already exists!`);
    }

    const job = new CronJob('*/5 * * * * *', () => {
      console.log(`${name} cron job chal rahi hai`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    console.log(` ${name} cron job added and started`);
  }

  stopCronJob(name: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(name);
      job.stop();
      console.log(`${name} cron job stopped`);
    } catch (error) {
      throw new Error(`Cron job "${name}" not found to stop`);
    }
  }

  deleteCronJob(name: string) {
    try {
      this.schedulerRegistry.deleteCronJob(name);
      console.log(`${name} cron job deleted`);
    } catch (error) {
      throw new Error(`Cron job "${name}" not found to delete`);
    }
  }
  // @Cron(CronExpression.EVERY_MINUTE)
  // handleStaticCron() {
  //   this.logger.debug(' Static cron job har minute chal rahi hai!');
  // }
}
