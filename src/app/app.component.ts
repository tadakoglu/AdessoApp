import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as UnitActions from '../app-state/actions/unit.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(private readonly store: Store) {
    this.store.dispatch(UnitActions.setAllItems())
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  title = 'Adesso App By Tayfun Adakoğlu';
}
