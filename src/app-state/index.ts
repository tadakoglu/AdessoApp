import { ActionReducerMap } from "@ngrx/store";
import { UnitState } from "./reducers/unit.reducer";
import { UnitDetailState } from "./reducers/unitDetail.reducer";
import * as unitReducer from './reducers/unit.reducer'
import * as unitDetailReducer from './reducers/unitDetail.reducer'
import { routerReducer, RouterState } from "@ngrx/router-store";

export interface State {
    unit: UnitState,
    unitDetail: UnitDetailState
    router: RouterState,
}

/* map states to reducers for app module */
export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    unit: unitReducer.reducer, /* should have same name with the related State interface property */ 
    unitDetail: unitDetailReducer.reducer /* should have same name with the related State interface property */ 
}
