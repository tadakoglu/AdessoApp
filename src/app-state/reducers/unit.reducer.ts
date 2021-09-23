import { createReducer, on } from '@ngrx/store';
import * as unitActions from '../actions/unit.actions';
import { CostItem } from '../entity/costItem.model';

import * as _ from 'lodash'

export interface State {
    ageItems: string[];
    activeAge: string;
    costItems: CostItem[];
};

const initialState: State = {
    ageItems: [],
    activeAge: "ALL",
    costItems: [],
};

export const reducer = createReducer(
    initialState,
    on(unitActions.setAgeItems,
        (state, { items }) => ({ ...state, ageItems: items }),
    ),
    on(unitActions.setActiveAgeItem,
        (state, { age }) => ({ ...state, activeAge: age }),
    ),
    on(unitActions.setCostItems,
        (state, { items }) => ({ ...state, costItems: items }),
    ),
    on(unitActions.setCostItemCheckbox,
        (state, { name, value }) => {
            let costItemsClone = state.costItems !== undefined ? _.cloneDeep<CostItem[]>(state.costItems) : [] // immutable
            costItemsClone = costItemsClone.map(ci => {
                if (ci.name == name) {
                    ci.checked = value
                }
                return ci

            })

            return { ...state, costItems: costItemsClone }
        },
    ),
    on(unitActions.setCostItemSlider,
        (state, { name, value }) => {
            let costItemsClone = state.costItems !== undefined ? _.cloneDeep<CostItem[]>(state.costItems) : [] // immutable
            costItemsClone = costItemsClone.map(ci => {
                if (ci.name == name) {
                    ci.slider = value
                }
                return ci

            })

            return { ...state, costItems: costItemsClone }
        },
    ),
);

