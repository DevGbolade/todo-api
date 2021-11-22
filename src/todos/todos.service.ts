import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] = [
        {
            id: 'f3e97b6b-45d1-4a6e-8a22-811212db31b0',
            name: 'read on eductive.io',
            completed: false,
            isActive: false,
        },
        {
            id: '57f7cfb8-781e-4e19-b9a8-d6e19089c0b7',
            name: 'play soccer at noon',
            completed: true,
            isActive: false,

        },
        {
            id: 'a5765048-962c-4353-93d1-e04691045a4f',
            name: 'See a friend at the gym',
            completed: false,
            isActive: true,

        },
    ];

    findAll(search?: string) {
        if (search) {
            return this.todos.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
        }
        return this.todos;
    }
    filterAll(type?: string) {
        switch (type) {
            case "all":
                return this.todos
            case "active":
                return this.todos.filter(el => el.isActive);
            case "completed":
                return this.todos.filter(el => el.completed);
            default:
                return []
        }
    }

    getById(id: string) {
        return this.todos.find((el: any) => el.id == id);
    }

    createTodo(todoDto: CreateTodoDto): Todo {
        const newTodo = { id: uuidv4(), completed: false, isActive: false, ...todoDto };
        this.todos.push(newTodo);
        return newTodo;
    }
    updateTodo(id: string, body: UpdateTodoDto) {
        if (id) {
            this.todos = id ? this.todos.map(el => el.id === id ? { ...el, ...body } : el) : this.todos;
            const findIndex = this.todos.findIndex(el => el.id === id)
            return this.todos[findIndex]
        }
        return;
    }

    deleteTodo(id: string) {
        const findIndex = this.todos.findIndex(el => el.id === id);
        if (findIndex > -1) {
            this.todos = this.todos.filter(el => el.id !== id)
            return {
                statusCode: 204,
                message: `todo with the id ${id} is successfully deleted`
            }
        }
        return;
    }
}
