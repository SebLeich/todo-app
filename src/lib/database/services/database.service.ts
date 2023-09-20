import { Inject, Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DATABASE_CONFIG } from '../constants/database-config.injection-token';

@Injectable()
export class DatabaseService {
  private _db!: Dexie;

  constructor(@Inject(DATABASE_CONFIG) private _tableConfig: { [key: string]: string }) {
    this._initDatabase();
  }

  public async getAllAsync<T>(columnName: string): Promise<T[]> {
    return await this._db.table(columnName).toArray() as T[];
  }

  public async setDataAsync<T>(columnName: string, updatedValues: T[]): Promise<void> {
    const collection = await this._db.table(columnName);
    collection.clear();
    collection.bulkAdd(updatedValues);
  }

  private _initDatabase() {
    this._db = new Dexie('AppData');
    this._db.version(1).stores(this._tableConfig);
  }
}
