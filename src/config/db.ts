
// db.ts
import { user } from '@/utils/time';
import Dexie, { Table } from 'dexie';

export interface Message {
    id?: number;
    eid: string;
    user: string;
    zhiboid: string;
    message: string;
    type: string;
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    messages!: Table<Message>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            messages: '++id, eid, user,zhiboid,message,type' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
