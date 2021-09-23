import { Injectable } from '@angular/core';
import UnitServiceMock from './mocks/unit.service.mock';

@Injectable({ providedIn: 'root' })
export default class UnitService extends UnitServiceMock { }
