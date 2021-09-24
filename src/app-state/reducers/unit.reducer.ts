import { createReducer, on } from '@ngrx/store';
import * as unitActions from '../actions/unit.actions';
import { CostItem } from '../entity/costItem.model';

import * as _ from 'lodash'
import { UnitItem } from '../entity/unitItem.model';

export interface UnitState {
    unitItems: UnitItem[];
    ageItems: string[];
    activeAge: string;
    costItems: CostItem[];
};

const initialState: UnitState = {
    unitItems: [],
    ageItems: [],
    activeAge: '',
    costItems: [],
};

export const reducer = createReducer(
    initialState,

    on(unitActions.setAllItems,
        (state) => ({ ...state })
    ),

    on(unitActions.setAllItemsSuccess,
        (state, { items }) => {
            let itemsClone = _.cloneDeep(items)
            let ageItems = ['', 'Dark', 'Feudal', 'Castle', 'Imperial']
            let costItems = [new CostItem("Wood", false, 0), new CostItem("Gold", false, 0), new CostItem("Food", false, 0)]
            return { ...state, unitItems: itemsClone, ageItems: ageItems, costItems: costItems };
        }
    ),
    on(unitActions.setUnitItems,
        (state, { items }) => ({ ...state, unitItems: items }),
    ),
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
            costItemsClone = costItemsClone.map(ci => { // ci is also cloned with _.cloneDeep
                if (ci.name == name) {
                    ci.slider = value
                }
                return ci

            })

            return { ...state, costItems: costItemsClone }
        },
    ),
);

