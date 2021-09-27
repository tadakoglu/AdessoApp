
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app-state';
import { CostItem } from 'src/app-state/entity/costItem.model';
import { UnitItem } from 'src/app-state/entity/unitItem.model';
import { selectActiveAge, selectAgeItems, selectCostItems, selectFilteredUnits } from 'src/app-state/selectors/unit.selectors';
import * as UnitDetailActions from 'src/app-state/actions/unitDetail.actions'
import * as UnitActions from 'src/app-state/actions/unit.actions'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-unitWithReactiveForms',
  templateUrl: './unitWithReactiveForms.component.html',
  styleUrls: ['./unitWithReactiveForms.component.scss']
})
export class UnitWithReactiveFormsComponent implements OnInit {


  public filterForm: FormGroup = new FormGroup({});

  public ageItems: string[] = []
  public activeAge: string = ''

  public costItems: CostItem[] = []

  public filteredUnits: UnitItem[] = []
  constructor(private readonly store: Store<State>, private formBuilder: FormBuilder) {
    combineLatest([
      this.store.select(selectAgeItems),
      this.store.select(selectActiveAge),
      this.store.select(selectCostItems),
    ]).pipe(take(1)).subscribe(([obsAgeItemsVal, obsActiveAgeVal, obsCostItemsVal]) => {
      this.ageItems = obsAgeItemsVal;
      this.activeAge = obsActiveAgeVal;
      this.costItems = obsCostItemsVal;
      this.createFilterForm();
    })

    this.store.select(selectFilteredUnits).subscribe(val => this.filteredUnits = val);
  }

  ngOnInit() { }


  createFilterForm() {
    
    //Alternative form group creation with classes 
    this.filterForm = new FormGroup({
      FormControlAgeRadio: new FormControl(this.activeAge, []),
      FormControlCostItems: new FormArray([]) // form array items are registered with name of index
    });

    this.costItems.forEach((ci, i, arr) => {
      // let formGroup = this.formBuilder.group({ FormControlCheckbox: [ci.checked, []], FormControlSlider: [ci.slider, []] })
      (this.filterForm.get('FormControlCostItems') as FormArray).
        push(new FormGroup({ FormControlCheckbox: new FormControl(ci.checked), FormControlSlider: new FormControl({value:ci.slider,disabled: !ci.checked}) }))
    })

    this.filterForm.valueChanges.subscribe((form) => {
      console.log(form);
    });
  }

  checkedEvent($event: any, i: any) {
    if ($event.checked) {
      this.getFormControlSliderByFormGroupIndexOrName(i).enable()
    }
    else {
      this.getFormControlSliderByFormGroupIndexOrName(i).disable()
    }
  }

  get FormControlCostItems() {
    return this.filterForm.controls['FormControlCostItems'] as FormArray
  }
  getFormControlCheckboxByFormGroupIndexOrName(i: any): FormControl { // controls in formArray named with index name
    return (((this.filterForm.controls['FormControlCostItems'] as FormArray).get(i.toString())) as FormGroup).get('FormControlCheckbox') as FormControl
  }
  getFormControlSliderByFormGroupIndexOrName(i: any): FormControl {
    //return (((this.filterForm.controls['FormControlCostItems'] as FormArray).at(i)) as  FormGroup).get('FormControlSlider') as FormControl
    return this.filterForm.get(['FormControlCostItems', i, 'FormControlSlider']) as FormControl // same with upper line
  }


  submitFilterForm(event: any) {
    if (this.filterForm.valid) {
      console.log()

      console.log('active' + this.filterForm.controls['FormControlAgeRadio'].value)

      this.FormControlCostItems.controls.forEach( (formGroup, inx,arr) =>{
        console.log('checkbox' + ((formGroup as FormGroup).controls['FormControlCheckbox'] as FormControl).value);
        console.log('slider' + ((formGroup as FormGroup).controls['FormControlSlider'] as FormControl).value);
        let ci = this.costItems[inx].name
        
      })
      //dispatchAllAtOnce

    }

  }


  setActiveAge(age: string) {
    this.store.dispatch(UnitActions.setActiveAgeItem({ age: age }))
  }


  setCostItemCheckbox(name: string, value: any) {
    this.store.dispatch(UnitActions.setCostItemCheckbox({ name: name, value: value ?? false }))
  }
  setCostItemSlider(name: string, value: any) {
    this.store.dispatch(UnitActions.setCostItemSlider({ name: name, value: value ?? 0 }))
  }


  setActiveUnit(id: number) {
    this.store.dispatch(UnitDetailActions.setActiveUnit({ id: id }))
  }

}
