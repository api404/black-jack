import { Card } from "@/models/Card";
import { cardKinds, cardValues, isCardString } from "@/models/Card/types";

export class Deck {
  constructor(private readonly cards: Card[]) {}

  static createNewShuffledDeck() {
    const cards = Deck.createOrderedDeck();
    const shuffledCards = Deck.shuffle(cards);
    return new Deck(shuffledCards);
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
    return this.cards.map((card) => card.toString()).join(",");
  }

  static fromString(deckString: string) {
    const cardsStrings = deckString.split(",");
    const cards = cardsStrings.map((card) => {
      if (!isCardString(card)) {
        throw new Error("Invalid card string");
      }
      return Card.fromString(card);
    });
    return new Deck(cards);
  }
  private static createOrderedDeck() {
    const cards: Card[] = [];
    cardKinds.forEach((kind) => {
      cardValues.forEach((value) => {
        cards.push(new Card(kind, value));
      });
    });
    return cards;
  }
  private static shuffle(cards: Card[]) {
    const deckSize = cards.length;
    cards?.forEach((card, index) => {
      const indexToSwapWith = Math.floor(Math.random() * deckSize);
      const cardToSwap = cards[indexToSwapWith];
      cards[indexToSwapWith] = card;
      cards[index] = cardToSwap;
    });
    return cards;
  }
}
