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

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;
  let store:MockStore
  let initialState = { 
    unit: {  
      unitItems: [
        new UnitItem(99,'test','test','test','age', new Cost(),0,0),
        new UnitItem(22,'test','test','test','bbb', new Cost(),0,0)],
      ageItems: ['age','test','xyz'],
      activeAge: 'age',
      costItems: [new CostItem("costname",true,22)], 
    },
    unitDetail:{
      activeUnitItemId: 99
    }
   }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnitComponent],
      providers: [provideMockStore({initialState})],
    })
      .compileComponents();

      store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should selectFilteredUnits selector work properly ", () => {

    let s1: UnitState = {
      unitItems: [new UnitItem(33, 'test13','desc','exp','age1',new Cost(undefined,30,40)), new UnitItem(44, 'test13','desc','exp','age2',new Cost(55,55,40))],
      ageItems: ['age1', 'age2'],
      activeAge: 'age2',
      costItems: [new CostItem('Wood', true, 22), new CostItem('Gold', true, 41)]
    }
  


    const result:UnitItem[] = selectFilteredUnits.projector(s1)

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(44);
  });
});

