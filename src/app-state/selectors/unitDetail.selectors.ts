import { createSelector } from "@ngrx/store";
import { State } from "..";
import { UnitItem } from "../entity/unitItem.model";
import { UnitState } from "../reducers/unit.reducer";
import { UnitDetailState } from "../reducers/unitDetail.reducer";
import { selectRouteParams } from "./router.selectors";


export const selectUnit = (appState: State) => appState.unit // createFeatureSelector<State>(unit)
export const selectUnitDetail = (appState: State) => appState.unitDetail // createFeatureSelector<State>(unitDetail)

// export const selectActiveUnit = createSelector(selectUnit, selectUnitDetail, (s1: UnitState, s2: UnitDetailState) => {
//     return s1.unitItems.find(ui => ui.id == s2.activeUnitItemId);
// })


export const selectActiveUnit = createSelector(selectUnit, selectRouteParams, (s1: UnitState, { UnitId }) => {
   return s1.unitItems.find(ui => ui.id == UnitId);
})

