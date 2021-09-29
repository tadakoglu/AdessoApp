import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { UnitItem } from 'src/app-state/entity/unitItem.model';
import * as effects from 'src/app-state/effects/unit.effects'
import { Observable, of, ReplaySubject } from 'rxjs';
import { Action } from '@ngrx/store';
import UnitService from './services/unit.service';
import { UnitEffects } from 'src/app-state/effects/unit.effects';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { UnitDetailEffects } from 'src/app-state/effects/unitDetail.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { selectActiveUnit } from 'src/app-state/selectors/unitDetail.selectors';
import { selectRouter } from 'src/app-state/selectors/router.selectors';

describe('AppComponent', () => {
  let actions$: Observable<Action>
  let unitEffects: UnitEffects
  let unitDetailEffects: UnitDetailEffects
  let unitService: UnitService
  let store: MockStore

  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let compiled: DebugElement
  let router: Router
  let location: Location
  let activatedRoute: ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [provideMockStore({
        initialState: {
          unit: {
            unitItems: [],
            ageItems: [],
            activeAge: '',
            costItems: [],
          },
          unitDetail: {
            activeUnitItemId: 3
          }
        },
        
        selectors: [
          { selector: selectActiveUnit, value: new UnitItem(3) },
        ],
      }),
      provideMockActions(() => actions$),
        UnitEffects, UnitService, UnitDetailEffects

      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    //activatedRoute = TestBed.inject(ActivatedRoute)
    store = TestBed.inject(MockStore)
    unitEffects = TestBed.inject(UnitEffects)
    unitDetailEffects = TestBed.inject(UnitDetailEffects)
    unitService = TestBed.inject(UnitService);

    fixture = TestBed.createComponent(AppComponent)

    component = fixture.componentInstance
    compiled = fixture.debugElement;

    router.initialNavigation();
  });

  it('should create the app', () => {


    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Adesso App By Tayfun Adakoğlu'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Adesso App By Tayfun Adakoğlu');
  });

  it('should setAllItems effects dispatch setAllItemsSuccess properly', (done) => {

    actions$ = of({ type: '[Unit Page] SET_ALL_ITEMS' }) // emit once when subscribed

    let spy = spyOn(unitService, "getUnitItems$")
    spy.and.returnValue(of([new UnitItem(), new UnitItem(2, 'unit2')]))


    unitEffects.setAllItems$.subscribe(resp => {
   
      expect(spy).toHaveBeenCalled()

      expect(resp.type).toEqual('[Unit Page] SET_ALL_ITEMS_SUCCESS')

      expect(resp).toEqual({
        type: '[Unit Page] SET_ALL_ITEMS_SUCCESS'
        , items: [new UnitItem(), new UnitItem(2, 'unit2')]
      })
      done()
    })

  })

  it('should navigateTo effects navigate to units details page propertly', (done) => {
    actions$ = of({ type: '[Unit Detail Page] SET_ACTIVE_UNIT', id: 2 }) // emit once when subscribed
    spyOn(router, 'navigate')
    unitDetailEffects.navigateToDetails$.subscribe(resp => {
      expect(resp).toEqual({ type: '[Unit Detail Page] SET_ACTIVE_UNIT', id: 2 }) // no transform operators
      expect(router.navigate).toHaveBeenCalledWith(['/unit-detail/' + resp.id])
      done()
    })


  })


  it('should navigate to be called with "", with spy', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate')
    router.navigate([''])
    tick();
    expect(navigateSpy).toHaveBeenCalledWith([''])
  }));

  it('should navigate to home when called ""', fakeAsync(() => {
    router.navigate([''])
    tick()
    expect(location.path()).toBe('/home')
  }));

  it('should navigate to units when called units', fakeAsync(() => {
    router.navigate(['unit'])
    tick()
    expect(location.path()).toBe('/unit')
  }));

  it('should navigate to home when called random url', (done) => {
    router.navigate(['ldjfo2f*f3f3'])
    expect(location.path()).toBe('/home')
    done()
  });
  it('should url to be called with unit-detail/3 when called unit-detail/3 mocks and fakeasync', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate')
    router.navigate(['unit-detail/3'])
    tick()
    expect(navigateSpy).toHaveBeenCalledWith(['unit-detail/3'])

  }));

  it('should navigate unit-detail/3 when called unit-detail/3  and fakeasync', fakeAsync(() => {
    router.navigate(['/unit-detail/3'])
    tick();
    console.log('PATHHH' + location.path())
    expect(location.path()).toBe('/unit-detail/3')


  }))

  it('should navigate unit-detail/3 when called unit-detail/3 with async await', async () => {
    await router.navigate(['/unit-detail/3'])

    expect(location.path()).toBe('/unit-detail/3')


  })

  it('should navigate unit-detail/3 when called unit-detail/3 with waitForAsync', waitForAsync(() => {
    router.navigate(['/unit-detail/3']).then(val => { // or await
      expect(location.path()).toBe('/unit-detail/3')
    })
  }))

  it('should navigate unit-detail/3 when called unit-detail/3 with done', (done) => {
    router.navigate(['/unit-detail/3']).then(val => {
      expect(location.path()).toBe('/unit-detail/3')
      done()
    })
  })





});


