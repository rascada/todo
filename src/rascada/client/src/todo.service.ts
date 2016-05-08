import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {SocketService} from "./socket.service";
import {assign} from "rxjs/util/assign";

export interface Todo {
    title: string;
    content: string;
    done?: boolean;
}

@Injectable()
export class TodoService {
    todos$ = new Subject();
    
    constructor(private http: Http, private sock: SocketService) { }

    fetch(): Observable<Todo> {
        this.http
            .get('http://localhost:7000/todos')
            .map(res => res.json())
            .subscribe(todos =>
                todos.forEach(todo => this.todos$.next(todo))
            );
        
        return this.todos$;
    }

    toggle(todo: Todo) {
        this.sock.io.emit('toggle', todo);
        todo.done = !todo.done;
    }
    remove(todo: Todo) {
        this.sock.io.emit('remove', todo);
    }
    
    update(todo: Todo) {
        this.sock.io.emit('update', todo);
    }

    add(todo: Todo): void {
        if (!todo.title || !todo.content) return;
        const newTodo = assign({}, todo);

        todo.title = '';
        todo.content = '';

        this.todos$.next(newTodo);
        this.sock.io.emit('add', newTodo);
    }
}