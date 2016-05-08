import {Component} from "angular2/core";
import {Todo, TodoService} from "./todo.service";

@Component({
    selector: 'todo-creator',
    template: require('./todo-creator.component.html'),
    styles: [require('./todo-creator.component.styl')],
})
export class TodoCreatorComponent {
    todo: Todo = {
        title: '',
        content: '',
    };

    constructor(private store: TodoService) { }

    create(): void {
        this.store.add(this.todo);
    }
}