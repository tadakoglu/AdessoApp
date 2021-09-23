import { JsonProperty } from "json-object-mapper";

export class UnitItemCapsule {
    constructor(
        @JsonProperty()
        public units: UnitItem[] = []
    ) { }
}
export class UnitItem {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public expansion: string = '',
        public age: string = '',
        public cost: Cost = new Cost(),
        public build_time: number = 0,
        public reload_time: number = 0,
        public attack_delay: number = 0,
        public movement_rate: number = 0,
        public line_of_sight: number = 0,
        public hit_points: number = 0,
        public range: number = 0,
        public attack: number = 0,
        public armor: string = '',
        public accuracy: string = '') { }
}

export class Cost {
    constructor(
        public Wood: number = 0,
        public Gold: number = 0,
        public Food: number = 0) { }
}



