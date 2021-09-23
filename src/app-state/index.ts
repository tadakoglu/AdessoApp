import { ActionReducerMap } from "@ngrx/store";
import { UnitState } from "./reducers/unit.reducer";
import { UnitDetailState } from "./reducers/unitDetail.reducer";
import * as unitReducer from './reducers/unit.reducer'
import * as unitDetailReducer from './reducers/unitDetail.reducer'

export interface State {
    unit: UnitState,
    unitDetail: UnitDetailState
}

/* map states to reducers for app module */
export const reducers: ActionReducerMap<State> = {
    unit: unitReducer.reducer, /* should have same name with the related State interface property */ 
    unitDetail: unitDetailReducer.reducer /* should have same name with the related State interface property */ 
}
