import { ActionType, ResultType } from "@/game/BlackJack/types";
import { Card } from "@/game/Card";
import { BlackJackGame } from "@/game/BlackJack/index";
import { Deck } from "../Deck";
import { jest } from "@jest/globals";
import { PrivateGameState } from "@/schemas/privateGameState";

jest.mock("../Deck");

type BlackJackGameTest = {
  cardsOnTheTopOfTheDeck: Card[];
  expectedResult: ResultType;
  name: string;
  additionalChecks?: (result: PrivateGameState) => void;
} & (
  | {
      gameStage: "createNewGame";
    }
  | {
      gameStage: ActionType;
      state: PrivateGameState;
    }
);
describe("BlackJackGame", () => {
  const drawMock = jest.spyOn(Deck.prototype, "draw");
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const tests: BlackJackGameTest[] = [
    {
      gameStage: "createNewGame",
      name: "If the player and the dealer have same score, the game continues",
      expectedResult: null,
      additionalChecks: (result) => {
        expect(result.playerScore).toEqual(19);
        expect(result.dealerScore).toEqual(19);
      },
      cardsOnTheTopOfTheDeck: [
        Card.fromString("9♦"),
        Card.fromString("10♥"),
        Card.fromString("9♥"),
        Card.fromString("10♣"),
      ],
    },
    {
      gameStage: "createNewGame",
      name: "If the player gets Blackjack and the dealer does not, the player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [
        Card.fromString("A♦"),
        Card.fromString("10♥"),
        Card.fromString("9♥"),
        Card.fromString("2♥"),
      ],
    },
    {
      gameStage: "createNewGame",
      name: "If the player has a value that is less than 21, game continues",
      expectedResult: null,
      cardsOnTheTopOfTheDeck: [
        Card.fromString("2♦"),
        Card.fromString("6♥"),
        Card.fromString("9♥"),
        Card.fromString("2♥"),
      ],
    },
    {
      gameStage: "createNewGame",
      name: "If the dealer gets Blackjack and the player does not, the dealer wins and shows all cards",
      expectedResult: "dealer wins",
      additionalChecks: (result) => {
        expect(result.dealerOpenCards.length).toBe(2);
      },
      cardsOnTheTopOfTheDeck: [
        Card.fromString("9♦"),
        Card.fromString("2♥"),
        Card.fromString("Q♥"),
        Card.fromString("A♥"),
      ],
    },
    {
      gameStage: "createNewGame",
      name: "If both the player and dealer get Blackjack, this is known as a push and neither wins",
      expectedResult: "push",
      cardsOnTheTopOfTheDeck: [
        Card.fromString("A♦"),
        Card.fromString("K♥"),
        Card.fromString("Q♥"),
        Card.fromString("A♥"),
      ],
    },
    {
      gameStage: "stand",
      name: "If the player has a higher value than the dealer without exceeding 21, the player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("4♦"), Card.fromString("K♣")],
      state: {
        playerCards: [Card.fromString("10♦"), Card.fromString("9♥")],
        playerScore: 19,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
    {
      gameStage: "stand",
      name: "If the player has a higher value than the dealer without exceeding 21, the player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("4♦")],
      state: {
        playerCards: [
          Card.fromString("3♦"),
          Card.fromString("9♥"),
          Card.fromString("2♣"),
          Card.fromString("5♣"),
        ],
        playerScore: 19,
        dealerOpenCards: [Card.fromString("7♥")],
        dealerHiddenCard: Card.fromString("10♦"),
        dealerScore: 17,
        result: null,
      },
    },
    {
      gameStage: "stand",
      name: "If the player has a value of 21 or under and the dealer goes bust, the player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("10♥")],
      state: {
        playerCards: [Card.fromString("10♦"), Card.fromString("9♥")],
        playerScore: 19,
        dealerOpenCards: [Card.fromString("6♥")],
        dealerHiddenCard: Card.fromString("10♣"),
        dealerScore: 16,
        result: null,
      },
    },
    {
      gameStage: "stand",
      name: "If the dealer has a higher value than the player without exceeding 21, the dealer wins",
      expectedResult: "dealer wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("4♥")],
      state: {
        playerCards: [Card.fromString("9♦"), Card.fromString("9♥")],
        playerScore: 18,
        dealerOpenCards: [Card.fromString("6♥")],
        dealerHiddenCard: Card.fromString("10♦"),
        dealerScore: 16,
        result: null,
      },
    },
    {
      gameStage: "stand",
      name: "If the player goes bust, the dealer wins, even if the dealer goes bust themselves",
      expectedResult: "dealer wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("10♥")],
      state: {
        playerCards: [
          Card.fromString("9♦"),
          Card.fromString("9♥"),
          Card.fromString("5♣"),
        ],
        playerScore: 23,
        dealerOpenCards: [Card.fromString("6♥")],
        dealerHiddenCard: Card.fromString("10♦"),
        dealerScore: 16,
        result: null,
      },
    },
    {
      gameStage: "stand",
      name: "If both the player and dealer get hands with the same value, this is known as a push and neither wins",
      expectedResult: "push",
      cardsOnTheTopOfTheDeck: [Card.fromString("2♥")],
      state: {
        playerCards: [Card.fromString("9♦"), Card.fromString("9♥")],
        playerScore: 18,
        dealerOpenCards: [Card.fromString("6♥")],
        dealerHiddenCard: Card.fromString("10♦"),
        dealerScore: 16,
        result: null,
      },
    },
    {
      gameStage: "hit",
      name: "If the player has a hand value without exceeding 21, the game continues",
      expectedResult: null,
      cardsOnTheTopOfTheDeck: [Card.fromString("4♦")],
      state: {
        playerCards: [Card.fromString("5♦"), Card.fromString("9♥")],
        playerScore: 14,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
    {
      gameStage: "hit",
      name: "If the player has a value of 21 and the dealer goes bust, the player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("7♦"), Card.fromString("9♥")],
      state: {
        playerCards: [Card.fromString("5♦"), Card.fromString("9♥")],
        playerScore: 14,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("10♦"),
        dealerScore: 13,
        result: null,
      },
    },
    {
      gameStage: "hit",
      name: "If the player has a value of 21 and the dealer has 21, this is known as a push and neither wins",
      expectedResult: "push",
      cardsOnTheTopOfTheDeck: [Card.fromString("7♦"), Card.fromString("7♥")],
      state: {
        playerCards: [Card.fromString("5♦"), Card.fromString("9♥")],
        playerScore: 14,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
    {
      gameStage: "hit",
      name: "If the player has a value of 21 and the dealer has less than 21, player wins",
      expectedResult: "player wins",
      cardsOnTheTopOfTheDeck: [Card.fromString("7♦"), Card.fromString("6♥")],
      state: {
        playerCards: [Card.fromString("5♦"), Card.fromString("9♥")],
        playerScore: 14,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("Q♦"),
        dealerScore: 13,
        result: null,
      },
    },
    {
      gameStage: "hit",
      name: "If the player goes bust, the dealer wins and does not need to draw more cards",
      expectedResult: "dealer wins",
      additionalChecks: (result) => {
        expect(result.dealerScore).toBe(14);
      },
      cardsOnTheTopOfTheDeck: [Card.fromString("9♦"), Card.fromString("6♥")],
      state: {
        playerCards: [Card.fromString("5♦"), Card.fromString("9♥")],
        playerScore: 14,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
    {
      name: "if the dealer has hand more than or equal to 17 without an ace he does not draw card",
      gameStage: "stand",
      expectedResult: "player wins",
      additionalChecks: (result) => {
        expect(result.dealerOpenCards).toHaveLength(3);
      },
      cardsOnTheTopOfTheDeck: [Card.fromString("7♥"), Card.fromString("5♣")],
      state: {
        playerCards: [Card.fromString("9♦"), Card.fromString("9♥")],
        playerScore: 18,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("7♦"),
        dealerScore: 10,
        result: null,
      },
    },
    {
      name: "if the dealer has soft hand equal to 17 he draws card",
      gameStage: "stand",
      expectedResult: "push",
      additionalChecks: (result) => {
        expect(result.dealerOpenCards).toHaveLength(5);
        expect(result.dealerScore).toBe(19);
      },
      cardsOnTheTopOfTheDeck: [
        Card.fromString("3♦"),
        Card.fromString("7♥"),
        Card.fromString("5♣"),
      ],
      state: {
        playerCards: [Card.fromString("10♦"), Card.fromString("9♥")],
        playerScore: 19,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
    {
      name: "if the dealer has strong hand that equals to 17 he does not draw card",
      gameStage: "stand",
      expectedResult: "push",
      additionalChecks: (result) => {
        expect(result.dealerOpenCards).toHaveLength(4);
        expect(result.dealerScore).toBe(19);
      },
      cardsOnTheTopOfTheDeck: [Card.fromString("10♥"), Card.fromString("5♣")],
      state: {
        playerCards: [Card.fromString("10♦"), Card.fromString("9♥")],
        playerScore: 19,
        dealerOpenCards: [Card.fromString("3♥")],
        dealerHiddenCard: Card.fromString("A♦"),
        dealerScore: 14,
        result: null,
      },
    },
  ];
  tests.forEach(
    ({
      cardsOnTheTopOfTheDeck,
      name,
      expectedResult,
      additionalChecks,
      ...rest
    }) => {
      it(`${rest.gameStage}: ${name}`, () => {
        cardsOnTheTopOfTheDeck.forEach((card) => {
          drawMock.mockImplementationOnce(() => card);
        });
        const result =
          rest.gameStage === "createNewGame"
            ? BlackJackGame.createNewGame()
            : BlackJackGame.play(rest.state, rest.gameStage);
        expect(result.result).toBe(expectedResult);
        if (additionalChecks) {
          additionalChecks(result);
        }
      });
    },
  );
});
