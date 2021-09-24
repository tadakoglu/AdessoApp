import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, of } from 'rxjs';
import { UnitItem, UnitItemCapsule } from 'src/app-state/entity/unitItem.model';
import * as MOCK_UNITS from './data/age-of-empires-units.json';
@Injectable()
export default class UnitServiceMock {

    getUnitItems$(): Observable<UnitItem[]> {
        let all = MOCK_UNITS
        let units = ObjectMapper.deserializeArray(UnitItem, all.default.units) // library have problems with jagged arrays
        return of(units)
    }

}
