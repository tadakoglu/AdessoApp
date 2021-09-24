/* tslint:disable:no-unused-variable */
import { provideMockStore } from '@ngrx/store/testing';

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import UnitService from './unit.service';

describe('Service: Unit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitService]
    });
  });

  it('should inject', inject([UnitService], (service: UnitService) => {
    expect(service).toBeTruthy();
  }));
});

