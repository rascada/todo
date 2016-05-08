import {Pipe} from "angular2/core";

@Pipe({
    name: 'todo',
    pure: false,
})
export class TodoPipe {
    transform(value, which) {
        switch (which) {
            case 'done': return value.filter(todo => todo.done);
            case 'todo': return value.filter(todo => !todo.done);
            default: return value;
        }
    }
}