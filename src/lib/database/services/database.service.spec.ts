import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { DatabaseModule } from '../database.module';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DatabaseModule ]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
