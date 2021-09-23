import { createAction, props } from '@ngrx/store';


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



