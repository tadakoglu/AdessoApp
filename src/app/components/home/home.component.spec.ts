/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { by } from 'protractor';
import { UnitComponent } from '../unit/unit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from 'src/app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

describe('HomeComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let h1El: HTMLHeadingElement
  let imgEl: HTMLImageElement

  let initialState = {}



  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, UnitComponent, AppComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance
    h1El = fixture.debugElement.query(By.css('h1')).nativeElement
    imgEl = fixture.debugElement.query(By.css('img')).nativeElement


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should heading element h1 contain text empty ', () => {
    expect(h1El.textContent).toEqual('') // '' at first
  })

  it('should heading element h1  contain text Home Page after compilation', () => {
    fixture.detectChanges(); // after compilation should have
    expect(h1El.textContent).toEqual('Home Page') // '' at first
  })
  it('should img element contain w2.jpg', () => {
    expect(imgEl.src).toContain('w2.jpg')
  })


});
