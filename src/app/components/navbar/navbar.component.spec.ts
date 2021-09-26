import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "src/app/app-routing.module";
import { NavbarComponent } from "./navbar.component";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(routes)],
      declarations: [NavbarComponent],
      
    })
      .compileComponents();
  });

  beforeEach(() => {
   
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('navigating to "" redirect you to /home',fakeAsync(()=>{
  //   router.navigate([''])
  //   tick() // wait all promises to be solved
  //   console.log(location.path)
  //   expect(location.path).toEqual('/home')

  // }))
});
