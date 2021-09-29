/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnitDetailComponent } from './unit-detail.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectActiveUnit } from 'src/app-state/selectors/unitDetail.selectors';
import { Cost, UnitItem } from 'src/app-state/entity/unitItem.model';
import { CostItem } from 'src/app-state/entity/costItem.model';
import * as UnitDetailReducer from 'src/app-state/reducers/unitDetail.reducer'
import * as UnitDetailActions from 'src/app-state/actions/unitDetail.actions'
import { UnitState } from 'src/app-state/reducers/unit.reducer';
import { UnitDetailState } from 'src/app-state/reducers/unitDetail.reducer';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDetailComponent],
      providers: [provideMockStore({
        initialState: {
          unit: {
            unitItems: [
              new UnitItem(99, 'test', 'test', 'test', 'age', new Cost(), 0, 0),
              new UnitItem(22, 'test', 'test', 'test', 'bbb', new Cost(), 0, 0)],
            ageItems: ['age', 'test'],
            activeAge: 'age',
            costItems: [new CostItem("costname", true, 22)],
          },
          unitDetail: {
            activeUnitItemId: 99
          }
        },
        selectors: [
          { selector: selectActiveUnit, value: new UnitItem(3) },
        ],
       
      })],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should unit detail reducer return the default state', () => {
    const { initialState } = UnitDetailReducer
    const action = { type: 'Unknown' }
    const state = UnitDetailReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should unit detail reducer setActiveUnit works', () => {
    const { initialState } = UnitDetailReducer

    const newState = {
      id: 5
    };

    const action = UnitDetailActions.setActiveUnit(newState)
    const state = UnitDetailReducer.reducer(initialState, action);

    expect(newState.id).toBe(state.activeUnitItemId);
  });

  it("should selectActiveUnit selector work ", () => {

    let s1: UnitState = {
      unitItems: [new UnitItem(33, 'test13'),new UnitItem(45,'test1')],
      ageItems: [],
      activeAge: '',
      costItems: []
    }
    // let s2: UnitDetailState = {
    //   activeUnitItemId: 45
    // }
    let params = {
      UnitId:45
    }


    const result:UnitItem|undefined = selectActiveUnit.projector(s1, params)

    expect(result?.name).toEqual('test1');
  });
});

