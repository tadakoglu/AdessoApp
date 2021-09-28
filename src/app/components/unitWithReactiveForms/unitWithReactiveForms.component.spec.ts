/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injector } from '@angular/core';

import { UnitWithReactiveFormsComponent } from './unitWithReactiveForms.component';
import { getMockStore, MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostItem } from 'src/app-state/entity/costItem.model';
import { UnitItem, Cost } from 'src/app-state/entity/unitItem.model';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

describe('UnitWithReactiveFormsComponent', () => {
  let component: UnitWithReactiveFormsComponent;
  let fixture: ComponentFixture<UnitWithReactiveFormsComponent>;

  let initialState = {
    unit: {
      unitItems: [new UnitItem(33, 'test13', 'desc', 'exp', 'age1', new Cost(10, 30, 40)), new UnitItem(44, 'test13xx', 'desc', 'exp', 'age2', new Cost(55, 55, 40))],
      ageItems: ['age1', 'age2'],
      activeAge: 'age2',
      costItems: [new CostItem('Wood', true, 22), new CostItem('Gold', true, 41)]
    },
    unitDetail: {
      activeUnitItemId: 99
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatSliderModule,
        MatButtonModule,
      ],
      declarations: [UnitWithReactiveFormsComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitWithReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reactive form be valid at first ', () => {
    expect(component.filterForm.valid).toBeTrue()
  })
  it('should age items mat toggle group be valid at first(loads as selected)', () => {
    let formControl = component.filterForm.controls['FormControlAgeRadio']
    expect(formControl.valid).toBeTrue()
  })
  it('should age items mat toggle group be age2(mockstore) ', () => {
    let formControl = component.filterForm.controls['FormControlAgeRadio']
    expect(formControl.value).toEqual('age2')
  })

  it('should FormControlAgeRadio be defined ', () => {
    let formControl = component.filterForm.controls['FormControlAgeRadio']
    expect(formControl).toBeDefined()
  })

  it('should not age items mat toggle group show errors at first', () => {
    let formControl = component.filterForm.controls['FormControlAgeRadio'].errors ?? {}
    expect(formControl['required']).toBeUndefined()
  })
  it('should not age items mat toggle group show errors after canceling selection', () => {
    let formControl = component.filterForm.controls['FormControlAgeRadio']
    formControl.setValue(undefined)
    let errors = formControl.errors ?? {}
    expect(errors['required']).toBeTrue()
  })

  it('submiting form emits the related values to component', () => {

    let formControl1 = component.filterForm.controls['FormControlAgeRadio']

    formControl1.setValue('age1')
    expect(formControl1.value).toBe('age1')
    expect(formControl1.valid).toBeTrue()

    let formControl2 = (component.filterForm.controls['FormControlCostItems'] as FormArray)

    // formControl2.controls.forEach((val, i, arr) => {
    //   let fc = val.get('FormControlCheckbox') as FormControl
    //   fc.setValue(true)
    //   let fs = val.get('FormControlSlider') as FormControl
    //   fs.setValue(200)
    // })

     formControl2.controls.forEach((val, i, arr) => {

      let fc = component.filterForm.get(['FormControlCostItems', i, 'FormControlCheckbox']) as FormControl
      let fs = component.filterForm.get(['FormControlCostItems', i, 'FormControlSlider']) as FormControl
      fc.setValue(true)
      fs.setValue(200)

    })



    expect(component.filterForm.valid).toBeTrue()

    component.submitFilterForm();

    expect(component.activeAge).toEqual('age1')
    expect(component.costItems.every(ci => ci.checked == true)).toBeTrue()
    expect(component.costItems.every(ci => ci.slider == 200)).toBeTrue()



  })


});
