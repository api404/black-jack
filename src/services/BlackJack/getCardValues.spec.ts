import { Card } from "../../models/Card";
import { getCardValues } from "@/services/BlackJack/getCardValues";

interface GetCardValuesTest {
  card: Card;
  expectedResult: number[];
}
describe("getCardValues", () => {
  const tests: GetCardValuesTest[] = [
    { card: Card.fromString("2♣"), expectedResult: [2] },
    { card: Card.fromString("3♣"), expectedResult: [3] },
    { card: Card.fromString("4♣"), expectedResult: [4] },
    { card: Card.fromString("5♣"), expectedResult: [5] },
    { card: Card.fromString("6♥"), expectedResult: [6] },
    { card: Card.fromString("7♣"), expectedResult: [7] },
    { card: Card.fromString("8♣"), expectedResult: [8] },
    { card: Card.fromString("9♠"), expectedResult: [9] },
    { card: Card.fromString("J♣"), expectedResult: [10] },
    { card: Card.fromString("Q♦"), expectedResult: [10] },
    { card: Card.fromString("K♣"), expectedResult: [10] },
    { card: Card.fromString("A♦"), expectedResult: [1, 11] },
  ];

  tests.forEach(({ card, expectedResult }) => {
    it(`returns value ${expectedResult} for card ${card}`, () => {
      expect(getCardValues(card)).toEqual(expectedResult);
    });
  });
});
