import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from 'src/app-state';
import { UnitItem } from 'src/app-state/entity/unitItem.model';
import { selectActiveUnit } from 'src/app-state/selectors/unitDetail.selectors';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {

  public activeUnitItem: UnitItem | undefined
  constructor(private readonly store: Store<State>) {
    this.store.select(selectActiveUnit).pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.activeUnitItem = val;
    })
  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

}
