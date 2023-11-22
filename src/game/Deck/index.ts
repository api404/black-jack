import { Card } from "@/game/Card";
import { cardKinds, cardValues } from "@/game/Card/types";

export class Deck {
  private readonly cards: Card[];
  constructor({ cardsToExclude }: { cardsToExclude?: Card[] } = {}) {
    this.cards = this.createOrderedDeck(cardsToExclude);
    this.shuffle();
  }
  draw() {
    const card = this.cards.pop();
    if (!card) {
      throw new Error("cannot draw from empty deck");
    }
    return card;
  }
  getSize() {
    return this.cards.length;
  }
  toString() {
    return this.cards.map((card) => card.toString()).join(", ");
  }
  private createOrderedDeck(cardsToExclude?: Card[]) {
    const cardsToExcludeSet = new Set(
      cardsToExclude?.map((card) => card.toString()),
    );
    const cards: Card[] = [];
    cardKinds.forEach((kind) => {
      cardValues.forEach((value) => {
        const card = new Card(kind, value);
        if (!cardsToExcludeSet.has(card.toString())) {
          cards.push(new Card(kind, value));
        }
      });
    });
    return cards;
  }
  private shuffle() {
    const deckSize = this.cards.length;
    this.cards?.forEach((card, index) => {
      const indexToSwapWith = Math.floor(Math.random() * deckSize);
      const cardToSwap = this.cards[indexToSwapWith];
      this.cards[indexToSwapWith] = card;
      this.cards[index] = cardToSwap;
    });
  }
}
