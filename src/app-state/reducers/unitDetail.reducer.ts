import { createReducer, on } from '@ngrx/store';
import * as unitDetailActions from '../actions/unitDetail.actions';

import * as _ from 'lodash'

export interface UnitDetailState {
    activeUnitItemId: number;
};

const initialState: UnitDetailState = {
    activeUnitItemId: 0
};

export const reducer = createReducer(
    initialState,
    on(unitDetailActions.setActiveUnit,
        (state, { id }) => ({ ...state, activeUnitItemId: id ?? 0 }),
    ),

);

