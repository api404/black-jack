import { Deck } from "@/game/Deck/index";
import { Card } from "@/game/Card";

describe("Deck", () => {
  describe("draw", () => {
    it("returns a card from the deck", () => {
      const deck = new Deck();
      expect(deck.draw()).toBeInstanceOf(Card);
    });

    it("returns every card exactly once until the deck is empty", () => {
      const deck = new Deck();
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
      const firstDeck = new Deck();
      for (let i = 0; i < testsCount; i++) {
        const secondDeck = new Deck();
        expect(firstDeck.toString()).not.toEqual(secondDeck.toString());
      }
    });

    it("does not return an excluded cards", () => {
      const cardsToExclude = [
        Card.fromString("Q♥"),
        Card.fromString("5♥"),
        Card.fromString("A♣"),
        Card.fromString("9♦"),
      ];
      const deck = new Deck({ cardsToExclude });
      while (deck.getSize() > 0) {
        const card = deck.draw();
        cardsToExclude.forEach((cardToExclude) => {
          expect(card).not.toEqual(cardToExclude);
        });
      }
    });
  });
});
