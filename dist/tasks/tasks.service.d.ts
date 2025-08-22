import { SchedulerRegistry } from '@nestjs/schedule';
export declare class TasksService {
    private schedulerRegistry;
    private readonly logger;
    constructor(schedulerRegistry: SchedulerRegistry);
    addCronJob(name: string): void;
    stopCronJob(name: string): void;
    deleteCronJob(name: string): void;
}
