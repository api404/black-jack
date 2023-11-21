import {CardKind, CardValue} from "@/game/Card/types";

export class Card {
    constructor (private kind: CardKind, private value: CardValue) {}
    toString() {
        return `${this.value} ${this.kind}`;
    }
}