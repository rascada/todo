import {Injectable} from "angular2/core";
import {Mongoose} from '../../../../../app/src/app';

@Injectable()
export class TodoModel {
    model;

    constructor(mg: Mongoose) {
        this.model = mg.db.model('todo', {
            title: String,
            content: String,
            done: Boolean,
        });
    }
}