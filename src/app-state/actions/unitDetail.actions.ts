import { createAction, props } from '@ngrx/store';

export const setActiveUnit = createAction(
    '[Unit Detail Page] SET_ACTIVE_UNIT',
    props<{ id: number }>()
);



