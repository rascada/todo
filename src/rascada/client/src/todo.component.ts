import {Component, Input, Output, OnDestroy, EventEmitter} from 'angular2/core';
import {Todo, TodoService} from "./todo.service";
import {assign} from "rxjs/util/assign";

@Component({
    selector: 'todo',
    styles: [require('./todo.component.styl')],
    template: require('./todo.component.html'),
})
export class TodoComponent implements OnDestroy {
    private _copy;
    private _todo: Todo;

    constructor(private store: TodoService) {}

    @Output() removed: EventEmitter<any> = new EventEmitter();

    @Input() set todo(todo: Todo) {
        this._todo = todo;
        this.copy = todo;
    }
    get todo(): Todo { return this._todo; }

    set copy(todo) { this._copy = assign({}, todo); }
    get copy() { return this._copy; }

    get clean() {
        const todo = this.todo;
        const copy = this.copy;

        return todo.title === copy.title
            && todo.content === copy.content;
    }

    toggle(todo: Todo) {
        this.store.toggle(todo);
    }

    remove() {
        this.store.remove(this.todo);
        this.removed.emit(null);
    }

    save() {
        this.copy = this.todo;
        this.store.update(this.todo);
    }

    cancel() {
        assign(this._todo, this.copy);
    }

    ngOnDestroy(): void {
        if (!this.clean) this.cancel();
    }
}
