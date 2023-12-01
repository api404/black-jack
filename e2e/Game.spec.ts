import { test, expect, Page } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { PrivateGameState } from "@/schemas/privateGameState";
import { Card } from "@/models/Card";
import { saveGameState } from "@/services/gamesStore";

const arrangeDataSetup = async (state: PrivateGameState) => {
  const id = uuid();
  await saveGameState(id, state);
  return id;
};

test.describe("Black Jack", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("User views the home page", async ({ page }) => {
    await expect(page).toHaveTitle("Black Jack Game");
    await expect(page.getByRole("link", { name: "how to play" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Black Jack" }),
    ).toBeVisible();
    const createNewGameButton = page.getByRole("button", {
      name: "start new game",
    });
    await expect(createNewGameButton).toBeVisible();
  });

  test("User gets 404 page for invalid game id", async ({ page }) => {
    await page.goto("/test");
    await expect(page.getByRole("link", { name: "how to play" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Game not found 😢" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "start new game",
      }),
    ).toBeVisible();
  });

  test("User can create new game", async ({ page, baseURL }) => {
    await page
      .getByRole("button", {
        name: "start new game",
      })
      .click();
    await expect(page).toHaveURL(new RegExp(`${baseURL}\/[a-z0-9]+`, "i"));
    const dealerScore = page.getByTestId("dealer-hand").getByTestId("score");
    const value = await dealerScore.innerText();
    expect(value).toEqual("?");
  });

  test("User wins the game playing stand", async ({ page }) => {
    const gameState: PrivateGameState = {
      playerScore: 20,
      playerCards: [Card.fromString("10♦"), Card.fromString("10♣")],
      dealerOpenCards: [Card.fromString("9♦")],
      dealerScore: 19,
      dealerHiddenCard: Card.fromString("10♣"),
      deck: "3♦,K♣",
      result: null,
    };
    const id = await arrangeDataSetup(gameState);
    await page.goto(`/${id}`);
    await page.getByText("stand").click();
    await expect(page.getByTestId("dealer-hand").getByText("19")).toBeVisible();
    await expect(page.getByTestId("player-hand").getByText("20")).toBeVisible();
    await expect(page.getByText("player wins")).toBeVisible();
  });
  test("User wins the game playing hit and then standing on 20", async ({
    page,
  }) => {
    const gameState: PrivateGameState = {
      playerScore: 17,
      playerCards: [Card.fromString("7♦"), Card.fromString("10♣")],
      dealerOpenCards: [Card.fromString("9♦")],
      dealerScore: 19,
      dealerHiddenCard: Card.fromString("10♣"),
      deck: "K♣,3♦",
      result: null,
    };
    const id = await arrangeDataSetup(gameState);
    await page.goto(`/${id}`);
    await page.getByText("hit!").click();
    await expect(page.getByTestId("player-hand").getByText("20")).toBeVisible();
    await page.getByText("stand").click();
    await expect(page.getByText("player wins")).toBeVisible();
  });

  test("User gets 'push' after playing hit twice and standing on 19", async ({
    page,
  }) => {
    const gameState: PrivateGameState = {
      playerScore: 13,
      playerCards: [Card.fromString("3♦"), Card.fromString("10♣")],
      dealerOpenCards: [Card.fromString("3♦")],
      dealerScore: 13,
      dealerHiddenCard: Card.fromString("10♣"),
      deck: "6♣,3♣,3♦",
      result: null,
    };
    const id = await arrangeDataSetup(gameState);
    await page.goto(`/${id}`);
    await page.getByText("hit!").click();
    await expect(page.getByTestId("player-hand").getByText("16")).toBeVisible();
    await page.getByText("hit!").click();
    await expect(page.getByTestId("player-hand").getByText("19")).toBeVisible();
    await page.getByText("stand").click();
    await expect(page.getByText("push")).toBeVisible();
  });

  test("User wins the game playing stand and dealer goes bust", async ({
    page,
  }) => {
    const gameState: PrivateGameState = {
      playerScore: 20,
      playerCards: [Card.fromString("10♦"), Card.fromString("10♣")],
      dealerOpenCards: [Card.fromString("6♦")],
      dealerScore: 16,
      dealerHiddenCard: Card.fromString("10♣"),
      deck: "3♦,K♣",
      result: null,
    };
    const id = await arrangeDataSetup(gameState);
    await page.goto(`/${id}`);
    await page.getByText("stand").click();
    await expect(page.getByTestId("dealer-hand").getByText("26")).toBeVisible();
    await expect(page.getByTestId("player-hand").getByText("20")).toBeVisible();
    await expect(page.getByText("player wins")).toBeVisible();
  });

  test("User loses the game playing hit and going bust", async ({ page }) => {
    const gameState: PrivateGameState = {
      playerScore: 15,
      playerCards: [Card.fromString("5♦"), Card.fromString("10♣")],
      dealerOpenCards: [Card.fromString("6♦")],
      dealerScore: 16,
      dealerHiddenCard: Card.fromString("10♣"),
      deck: "3♦,K♣",
      result: null,
    };
    const id = await arrangeDataSetup(gameState);
    await page.goto(`/${id}`);
    await page.getByText("hit!").click();
    await expect(page.getByTestId("dealer-hand").getByText("16")).toBeVisible();
    await expect(page.getByTestId("player-hand").getByText("25")).toBeVisible();
    await expect(page.getByText("dealer wins")).toBeVisible();
  });
});
