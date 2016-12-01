import {port} from './app';
import {mongoConnect} from "./db";

console.log(`Listening on port ${port}...`);

mongoConnect();
