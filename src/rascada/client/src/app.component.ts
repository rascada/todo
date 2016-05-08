import { Component, OnInit } from 'angular2/core';

import { TodoService, Todo } from "./todo.service";
import { TodoComponent } from "./todo.component";
import {TodoCreatorComponent} from './todo-creator.component';
import {SocketService} from "./socket.service";
import {TodoPipe} from "./todo.pipe";


@Component({
    selector: 'todo-app',
    styles: [require('./app.component.styl')],
    template: require('./app.component.html'),
    directives: [TodoComponent, TodoCreatorComponent],
    providers: [TodoService, SocketService],
    pipes: [TodoPipe],
})
export class TodoAppComponent implements OnInit {
    smallLayout: boolean;
    todos: Todo[] = [];
    sort: string = 'all';

    constructor(private store: TodoService) {}

    get archived(): number {
        return this.todos.filter(todo => todo.done).length;
    }

    remove(todo: Todo) {
        const i = this.todos.indexOf(todo);
        this.todos.splice(i, 1);
    }

    ngOnInit():void {
        this.store
            .fetch()
            .subscribe((todo: Todo) => this.todos.push(todo));
    }
}
