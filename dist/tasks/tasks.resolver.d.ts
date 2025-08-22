import { TasksService } from './tasks.service';
export declare class TasksResolver {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    startCronJob(name: string): string;
    stopCronJob(name: string): string;
    deleteCronJob(name: string): string;
}
