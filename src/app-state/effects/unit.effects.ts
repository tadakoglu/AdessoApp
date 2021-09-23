import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as class from '../actions/class';

@Injectable({
    providedIn: 'root'
})
export class UnitEffects {
    constructor(private actions$: Actions) {}

    actionName$ = createEffect(()=> this.actions$.pipe(ofType(class.actionName))

}