/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UnitComponent } from './unit.component';
import { selectAgeItems, selectCostItems, selectFilteredUnits } from 'src/app-state/selectors/unit.selectors';
import { CostItem } from 'src/app-state/entity/costItem.model';
import { UnitItem, Cost } from 'src/app-state/entity/unitItem.model';
import { UnitState } from 'src/app-state/reducers/unit.reducer';
import { UnitDetailState } from 'src/app-state/reducers/unitDetail.reducer';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

describe('UnitComponent', () => {
  let fixture: ComponentFixture<UnitComponent>;
  let store: MockStore
  let component: UnitComponent;
  let tdElement: DebugElement;

  let initialState = {
    unit: {
      unitItems: [new UnitItem(33, 'test13', 'desc', 'exp', 'age1', new Cost(undefined, 30, 40)), new UnitItem(44, 'test13xx', 'desc', 'exp', 'age2', new Cost(55, 55, 40))],
      ageItems: ['age1', 'age2'],
      activeAge: 'age2',
      costItems: [new CostItem('Wood', true, 22), new CostItem('Gold', true, 41)]
    },
    unitDetail: {
      activeUnitItemId: 99
    }
  }
  
  let matToggleGroupEl: MatButtonToggleGroup;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnitComponent],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    matToggleGroupEl = fixture.debugElement.query(By.directive(MatButtonToggleGroup)).injector.get<MatButtonToggleGroup>(MatButtonToggleGroup)

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tdElement = fixture.debugElement.query(By.css('table > * > tr:nth-child(1) > td:nth-child(2)'))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoud mat button toggle group select age when component input property activeAge changed', ()=>{
    component.activeAge = 'age1' // from age2
    fixture.detectChanges();
    

  })

  it("should selectFilteredUnits selector work properly ", () => {

    let s1: UnitState = {
      unitItems: [new UnitItem(33, 'test13', 'desc', 'exp', 'age1', new Cost(undefined, 30, 40)), new UnitItem(44, 'test13', 'desc', 'exp', 'age2', new Cost(55, 55, 40))],
      ageItems: ['age1', 'age2'],
      activeAge: 'age2',
      costItems: [new CostItem('Wood', true, 22), new CostItem('Gold', true, 41)]
    }


    const result: UnitItem[] = selectFilteredUnits.projector(s1)

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(44);
  });

  it("should selectFilteredUnits selector refrects to HTML view properly ", () => {

    expect(tdElement.nativeElement.textContent).toContain('test13xx');

  });
});

