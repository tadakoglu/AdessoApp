import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app-state';
import { UnitItem } from 'src/app-state/entity/unitItem.model';
import { selectActiveUnit } from 'src/app-state/selectors/unitDetail.selectors';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {

  public activeUnitItem: Observable<UnitItem | undefined>
  constructor(private readonly store: Store<State>) {
    this.activeUnitItem = this.store.select(selectActiveUnit)
  }

  ngOnInit() {
  }

}
