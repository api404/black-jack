import { Card } from "../../models/Card";

export const isBlackJack = (cards: Card[]) =>
  cards.length === 2 &&
  cards.some((card) => card.value === "A") &&
  cards.some((card) => ["Q", "K", "J", "10"].includes(card.value));
