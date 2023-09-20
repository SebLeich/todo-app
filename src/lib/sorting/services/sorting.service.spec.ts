import { TestBed } from '@angular/core/testing';

import { SortingService } from './sorting.service';
import { SortingModule } from '../sorting.module';

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortingModule],
    });
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
