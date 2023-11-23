import { Card } from "../../models/Card";
import { isBlackJack } from "@/services/BlackJack/isBlackJack";

interface IsBlackJackTest {
  cards: Card[];
  expectedResult: boolean;
}
describe("isBlackJack", () => {
  const tests: IsBlackJackTest[] = [
    { cards: [], expectedResult: false },
    { cards: [Card.fromString("A♣")], expectedResult: false },
    {
      cards: [Card.fromString("A♣"), Card.fromString("10♣")],
      expectedResult: true,
    },
    {
      cards: [Card.fromString("A♣"), Card.fromString("Q♣")],
      expectedResult: true,
    },
    {
      cards: [Card.fromString("A♣"), Card.fromString("K♣")],
      expectedResult: true,
    },
    {
      cards: [Card.fromString("A♣"), Card.fromString("J♣")],
      expectedResult: true,
    },
    {
      cards: [Card.fromString("A♣"), Card.fromString("A♦")],
      expectedResult: false,
    },
    {
      cards: [Card.fromString("5♣"), Card.fromString("A♦")],
      expectedResult: false,
    },
    {
      cards: [
        Card.fromString("5♣"),
        Card.fromString("5♦"),
        Card.fromString("A♦"),
      ],
      expectedResult: false,
    },
  ];

  tests.forEach(({ cards, expectedResult }) => {
    it(`returns ${expectedResult} for cards: ${cards}`, () => {
      expect(isBlackJack(cards)).toEqual(expectedResult);
    });
  });
});
