import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDTO } from '../DTO/create-task.dto';
import { FilterTaskDTO } from '../DTO/Filter-task.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskWithFilters(filterTaskDTO: FilterTaskDTO): Task[]{
        const {status, search} = filterTaskDTO;
        let Tasks = this.getAllTasks()
        if (status){
            Tasks = Tasks.filter(task => task.status === status);
        }
        if (search){
            Tasks = Tasks.filter(
                task => task.title.includes(search) || task.description.includes(search)
            )
        }
        return Tasks
    }
    getById(id:string): Task{
        const found =  this.tasks.find(t => t.id === id);
        if (!found){
            throw new NotFoundException(`ID not found: ${id}`);
        }
        return found;
    }
    deleteById(id:string):void{
        const found = this.getById(id);
        this.tasks =  this.tasks.filter(t => t.id !== found.id);
    }
    updateById(id:string,status:TaskStatus): Task{
        const task = this.getById(id);
        task.status = status;
        return task;
    }
    createTask(createTaskdto: CreateTaskDTO): Task {
        const {title, description} = createTaskdto;
        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
}
