import 'reflect-metadata';

import Path = require('path');
import Express = require('express');
import Cors = require('cors');
import {Injectable, provide} from 'angular2/core';
import {Todo} from '../client/src/todo.service';
import {TodoModel} from './model/todo';

import {Server, Sockets, bootstrap} from '../../../../app/src/app';

@Injectable()
export class App {
    constructor(server: Server, app: Express, io: Sockets, private todo: TodoModel) {
        const path = Path.resolve(__dirname, '../../../../../dist');

        app.use(Express.static(path));
        app.use(Cors());

        app.get('/todos', this.todos.bind(this));

        server.listen(7000, _ => console.log(server.address()));

        io.on('connection', this.sockets.bind(this));
    }

    sockets(sock) {
        sock.on('add', this.add.bind(this));
        sock.on('update', this.update.bind(this));
        sock.on('toggle', this.toggle.bind(this));
        sock.on('remove', this.remove.bind(this));
    }

    add(todo: Todo) {
        this.todo.model.create(todo);
    }

    toggle(todo: Todo) {
        this.todo.model
            .update(todo, { $set: { done: !todo.done } })
            .exec();
    }

    remove(todo: Todo) {
        this.todo.model
            .remove(todo)
            .exec();
    }
    
    update(todo: Todo) {
        this.todo.model
            .update({ _id: todo._id }, { $set: todo })
            .exec();
    }

    todos(req, res) {
        this.todo.model
            .find()
            .then(todos => res.json(todos));
    }
}

class Config {
    db = {
        host: 'localhost',
        name: 'todo',
    }
}

bootstrap(App, TodoModel, provide('config', { useClass: Config }));