import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class DatabaseService {
  private _db!: Dexie;

  constructor() {
    this.initDatabase();
  }

  public async getAllAsync<T>(columnName: string): Promise<T[]> {
    return await this._db.table(columnName).toArray() as T[];
  }

  public initTable(name: string, arg: string | string[]): void {
    const schema = Array.isArray(arg) ? arg.join(',') : arg;
    this._db.version(1).stores({ [name]: schema });
  }

  public async setDataAsync<T>(columnName: string, updatedValues: T[]): Promise<void> {
    const collection = await this._db.table(columnName);
    collection.clear();
    collection.bulkAdd(updatedValues);
  }

  private initDatabase() {
    this._db = new Dexie('AppData');
  }
}
