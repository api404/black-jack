import {CardKind, CardValue, isCardKind, isCardValue} from "@/game/Card/types";

export class Card {
    constructor (public kind: CardKind, public value: CardValue) {}
    toString() {
        return `${this.value}${this.kind}`;
    }
    public static fromString(str: `${CardValue}${CardKind}`) {
        const kind = str.slice(-1);
        const value = str.slice(0, -1);
        if (!isCardKind(kind) || !isCardValue(value)) {
            throw new Error('Invalid card string')
        }
        return new Card(kind, value);
    }
}
