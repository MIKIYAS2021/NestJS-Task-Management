import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from '../DTO/create-task.dto';
import { FilterTaskDTO } from '../DTO/Filter-task.dto';
import { TaskStatusValidationPipe } from 'src/Pipe/task.validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterTaskDTO: FilterTaskDTO):Task[]{
        if (Object.keys(filterTaskDTO).length){
            return this.tasksService.getTaskWithFilters(filterTaskDTO)
        }
        return this.tasksService.getAllTasks();
    }
    @Get('/:id')
    getById(@Param('id') id:string):Task{
        return this.tasksService.getById(id);
    }
    @Delete('/:id')
    deleteById(@Param('id') id:string):void{
        this.tasksService.deleteById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTasks(@Body() createTaskdto: CreateTaskDTO): Task{
        return this.tasksService.createTask(createTaskdto)
    }
    @Patch('/:id/status')
    updateById(
        @Param('id') id:string,
        @Body('status',TaskStatusValidationPipe) status:TaskStatus) : Task{
            return this.tasksService.updateById(id, status);
    }

}
