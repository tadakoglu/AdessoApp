import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as unitDetailActions from '../actions/unitDetail.actions'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import UnitService from 'src/app/services/unit.service';
import { of } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class UnitDetailEffects {
    constructor(private actions$: Actions, private service: UnitService,
        private router: Router) { }


        
    navigateToDetails$ = createEffect(
        () => this.actions$.pipe(
            ofType(unitDetailActions.setActiveUnit),
            tap(({id}) => this.router.navigate(['/unit-detail/' + id]))
        ),
        { dispatch: false }
    );
}