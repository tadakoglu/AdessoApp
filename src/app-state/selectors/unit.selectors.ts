import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "..";
import { UnitState } from "../reducers/unit.reducer";


export const selectUnit = (appState: State) => appState.unit // createFeatureSelector<State>(unit)
export const selectUnitDetail = (appState: State) => appState.unitDetail // createFeatureSelector<State>(unitDetail)

export const selectFilteredUnits = createSelector(selectUnit, (s: UnitState) => s.unitItems.filter(unitItem => {

    //first filter by age
    let condition1 = s.activeAge == '' || s.activeAge == unitItem.age // selected age, if all='' so select all

    //second filter by cost item checkboxes and their sliders(all three to be true)
    let condition2 = s.costItems.map(ci => {
        let propVal: number = (unitItem.cost as any)[ci.name]
        if (!propVal || (ci.checked && ci.slider <= propVal)) {
            return true
        }
        return false;
    }).every(val => val == true)

    return condition1 && condition2;
    //return true;
}))

export const selectAgeItems = createSelector(selectUnit, (s1: UnitState) => {
    return s1.ageItems
})
export const selectCostItems = createSelector(selectUnit, (s1: UnitState) => {
    return s1.costItems
})

export const selectActiveAge = createSelector(selectUnit, (s1: UnitState)=>{
    return s1.activeAge
})