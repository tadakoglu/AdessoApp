import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app-state';
import { CostItem } from 'src/app-state/entity/costItem.model';
import { UnitItem } from 'src/app-state/entity/unitItem.model';
import { selectAgeItems, selectCostItems, selectFilteredUnits } from 'src/app-state/selectors/unit.selectors';
import * as UnitDetailActions from 'src/app-state/actions/unitDetail.actions'
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  // public ageItems: Observable<string[]>
  // public costItems: Observable<CostItem[]>
  // public filteredUnits: Observable<UnitItem[]>
  public ageItems: string[] = []
  public costItems: CostItem[] = []
  public filteredUnits: UnitItem[] = []
  constructor(private readonly store: Store<State>) {
    this.store.select(selectAgeItems).subscribe(items => this.ageItems = items);
    this.store.select(selectCostItems).subscribe(items => this.costItems = items);
    this.store.select(selectFilteredUnits).subscribe(items => this.filteredUnits = items)
  }

  ngOnInit() {
  }

  setActiveUnit(id:number){
    this.store.dispatch(UnitDetailActions.setActiveUnit({id:id}))
  }

}
