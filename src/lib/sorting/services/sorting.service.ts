import { Injectable } from '@angular/core';
import { IIndexSortable } from '../interfaces/index-sortable.interface';

@Injectable()
export class SortingService {
  public sort<T extends IIndexSortable>(sortedTodos: T[], previousIndex: number, currentIndex: number): T[] {
    return sortedTodos.map((todo, originalIndex) => {
			let newIndex = originalIndex;
			if (currentIndex > previousIndex) 
			{
				if (originalIndex > previousIndex && originalIndex <= currentIndex) newIndex--;
				else if (originalIndex === previousIndex) newIndex = currentIndex;
			}
			else if (currentIndex < previousIndex) 
			{
				if (originalIndex >= currentIndex && originalIndex < previousIndex) newIndex++;
				else if (originalIndex === previousIndex) newIndex = currentIndex;
			}

			return { ...todo, index: newIndex };
		});
  }
}
