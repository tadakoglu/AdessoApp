import { createAction, props } from '@ngrx/store';
import { UnitItem } from '../entity/unitItem.model';

export const setAllItems = createAction(
    '[Unit Page] SET_ALL_ITEMS');

export const setAllItemsSuccess = createAction(
    '[Unit Page] SET_ALL_ITEMS_SUCCESS',
    props<{ items: UnitItem[] }>()
);
export const setAllItemsFailed = createAction(
    '[Unit Page] SET_ALL_ITEMS_FAILED',
    props<{ error: string }>()
);

export const setUnitItems = createAction(
    '[Uni Page] SET_UNIT_ITEMS',
    props<{ items: [] }>()
);

export const setAgeItems = createAction(
    '[Units Page] SET_AGE_ITEMS',
    props<{ items: [] }>()
);

export const setActiveAgeItem = createAction(
    '[Units Page] SET_ACTIVE_AGE_ITEM',
    props<{ age: string }>()
);

export const setCostItems = createAction(
    '[Units Page] SET_COST_ITEMS',
    props<{ items: [] }>()
);

export const setCostItemCheckbox = createAction(
    '[Units Page] SET_COST_ITEM_CHECKBOX',
    props<{ name: string, value: boolean }>()
);

export const setCostItemSlider = createAction(
    '[Units Page] SET_COST_ITEM_SLIDER',
    props<{ name: string, value: number }>()
);



