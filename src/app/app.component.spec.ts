import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { UnitItem } from 'src/app-state/entity/unitItem.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [provideMockStore({
        initialState: { 
          unit: {  
            unitItems: [],
            ageItems: [],
            activeAge: '',
            costItems: [], 
          },
          unitDetail:{
            activeUnitItemId: 0
          }
         },
        // selectors: [
        //   { selector: selectActiveAge, value: ['Book 1', 'Book 2'] },
        //   { selector: selectVisibleBooks, value: ['Book 1'] },
        // ],
      })],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
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

 
});


