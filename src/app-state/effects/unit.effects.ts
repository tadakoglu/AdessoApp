import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as unitActions from '../actions/unit.actions'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import UnitService from 'src/app/services/unit.service';
import { of } from 'rxjs'
@Injectable({
    providedIn: 'root'
})
export class UnitEffects {
    constructor(private actions$: Actions, private service: UnitService) { }

    setAllItems$ = createEffect(() => this.actions$.pipe(
        ofType(unitActions.setAllItems),
        exhaustMap((props) => this.service.getUnitItems$().pipe(
            map(resp => unitActions.setAllItemsSuccess({ items: resp })),
            catchError((err) => of(unitActions.setAllItemsFailed({ error: err }))))
            )))


}