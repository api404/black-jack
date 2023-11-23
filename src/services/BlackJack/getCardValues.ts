import { Card } from "../../models/Card";

export const getCardValues = (card: Card) => {
  switch (card.value) {
    case "Q":
    case "K":
    case "J":
      return [10];
    case "A":
      return [1, 11];
    default:
      return [Number(card.value)];
  }
};
