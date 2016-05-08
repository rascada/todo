///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="./typings.d.ts"/>

import 'core-js';
import 'zone.js';
import { bootstrap } from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from "angular2/http";

import { TodoAppComponent } from './app.component';

document.head.innerHTML
  += `<style> ${require('./main.styl')} </style>`;

bootstrap(TodoAppComponent, [HTTP_PROVIDERS]);
