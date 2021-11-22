import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Param,
    Body,
    Query,
    NotFoundException,
    UsePipes,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { ValidatePayloadExistsPipe } from 'src/pipes/validatePayloadExist.pipe';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
    constructor(private todoServices: TodosService) {

    }

    @ApiOkResponse({ type: Todo, isArray: true })
    @ApiQuery({ name: 'search', required: false })
    @Get()
    getAllTodos(@Query('search') search?: string): Todo[] {
        return this.todoServices.findAll(search);
    }

    @ApiQuery({ name: 'type', required: true })
    @Get('filter')
    filterAllTodos(@Query('type') type: string): Todo[] {
        return this.todoServices.filterAll(type);
    }

    @ApiOkResponse({ type: Todo })
    @Get(':id')
    getTodoById(@Param('id') id: string) {
        const todo = this.todoServices.getById(id);
        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }

    @ApiCreatedResponse({ type: Todo })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Post()
    createTodo(@Body() body: CreateTodoDto): Todo {
        return this.todoServices.createTodo(body);
    }

    @UsePipes(new ValidatePayloadExistsPipe())
    @ApiOkResponse({ type: Todo })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() body: UpdateTodoDto): Todo {
        const todo = this.todoServices.updateTodo(id, body);
        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }

    @Delete(':id')
    @ApiNotFoundResponse()
    deleteTodo(@Param('id') id: string) {
        const todo = this.todoServices.deleteTodo(id);
        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }
}
