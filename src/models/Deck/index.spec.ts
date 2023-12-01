import { Deck } from "@/models/Deck/index";
import { Card } from "@/models/Card";
import exp from "constants";

describe("Deck", () => {
  describe("draw", () => {
    it("returns a card from the deck", () => {
      const deck = Deck.createNewShuffledDeck();
      expect(deck.draw()).toBeInstanceOf(Card);
    });

    it("returns every card exactly once until the deck is empty", () => {
      const deck = Deck.createNewShuffledDeck();
      const drownCards = new Set<string>();
      while (deck.getSize() > 0) {
        const cardStr = deck.draw().toString();
        drownCards.add(cardStr);
      }
      expect(drownCards.size).toEqual(52);
    });
    /*
        The probability that two decks of cards in the world are in the same order is incredibly low.
        The number of possible orderings of a standard deck of 52 cards is 52! (52 factorial),
        which is approximately 8.06 x 10^67, making the probability equal to 1 / 8.06 x 10^67.
        Therefore, the probability of two decks being in the same order is effectively zero.
         */
    it("returns cards in random order", () => {
      const testsCount = 1000; // 1000 * 1 / 8.06 x 10^67 is still effectively zero
      const firstDeck = Deck.createNewShuffledDeck();
      for (let i = 0; i < testsCount; i++) {
        const secondDeck = Deck.createNewShuffledDeck();
        expect(firstDeck.toString()).not.toEqual(secondDeck.toString());
      }
    });

    it("returns deck from string of cards", () => {
      const deckString = "3♣,10♣,A♥";
      const deck = Deck.fromString(deckString);
      expect(deck.draw()).toEqual(Card.fromString("A♥"));
      expect(deck.draw()).toEqual(Card.fromString("10♣"));
      expect(deck.draw()).toEqual(Card.fromString("3♣"));
    });

    it("returns stringified deck", () => {
      const deck = new Deck([
        Card.fromString("3♣"),
        Card.fromString("10♣"),
        Card.fromString("A♥"),
      ]);

      expect(deck.toString()).toEqual("3♣,10♣,A♥");
    });
  });
});
