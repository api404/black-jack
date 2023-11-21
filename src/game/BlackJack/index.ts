import {Card} from "@/game/Card";
import {Deck} from "@/game/Deck";
import {BlackJackGameState, ResultType, Score} from "@/game/BlackJack/types";

const DEALER_MIN_SCORE = 17;
const WINNING_SCORE = 21;

export class BlackJackGame {
    static createNewGame (): BlackJackGameState {
        const deck = new Deck();
        const playerCards = [deck.draw(), deck.draw()]
        const dealerOpenCards = [deck.draw()];
        const dealerHiddenCard = deck.draw();
        const playerScore = BlackJackGame.calculateHandScore(playerCards, false);
        const dealerScore = BlackJackGame.calculateHandScore([dealerHiddenCard,...dealerOpenCards], true);
        const result = BlackJackGame.calculateResult({playerScore, dealerScore, isGameFinished: false});
        return {
            playerCards,
            dealerOpenCards,
            dealerHiddenCard,
            playerScore,
            dealerScore,
            result
        }
    }
    static play(currentState: BlackJackGameState, action: 'hit' | 'stand'): BlackJackGameState {
        const deck = new Deck({ cardsToExclude: [
                ...currentState.dealerOpenCards,
                currentState.dealerHiddenCard,
                ...currentState.playerCards,
            ]})
        const newState = {...currentState};
        if (action === 'hit') {
            newState.playerCards.push(deck.draw());
            newState.playerScore = BlackJackGame.calculateHandScore(newState.playerCards, false);
            if (newState.playerScore === WINNING_SCORE) {
                return BlackJackGame.playDealerTurn(newState, deck)
            }
            newState.result = BlackJackGame.calculateResult({
                playerScore: newState.playerScore,
                dealerScore: newState.dealerScore,
                isGameFinished: false
            })
        }
        else {
            return BlackJackGame.playDealerTurn(newState, deck);
        }
        return newState;
    }

    private static playDealerTurn (state: BlackJackGameState, deck: Deck) {
        const newState = {...state};
        newState.dealerOpenCards.push(newState.dealerHiddenCard);
        while (newState.dealerScore !== 'black jack' && newState.dealerScore < DEALER_MIN_SCORE) {
            newState.dealerOpenCards.push(deck.draw());
            newState.dealerScore = BlackJackGame.calculateHandScore(newState.dealerOpenCards, true);
        }
        newState.result = BlackJackGame.calculateResult({
            playerScore: newState.playerScore,
            dealerScore: newState.dealerScore,
            isGameFinished: true
        })
        return newState;
    }

    private static calculateResult ({playerScore, dealerScore, isGameFinished}: Pick<BlackJackGameState, 'playerScore' | 'dealerScore'> & { isGameFinished: boolean},): ResultType {
        if (playerScore === dealerScore) return 'push';
        if(playerScore === 'black jack') return 'player wins';
        if(dealerScore === 'black jack') return 'dealer wins';
        if(playerScore > WINNING_SCORE) return 'dealer wins';
        if(dealerScore > WINNING_SCORE) return 'player wins';
        if (isGameFinished) return playerScore > dealerScore ? 'player wins' : 'dealer wins';
        return null;
    }

    private static calculateHandScore(cards: Card[], isDealer: boolean): Score {
        if(isBlackJack(cards)) {
            return 'black jack'
        }
        const potentialScores = cards.reduce<number[]>((accu, card) => {
            const cardValues = getCardValues(card);
            if (cardValues.length > 1) {
                accu = accu.reduce<number[]>((acc, score) => {
                    cardValues.forEach((cardValue) => {
                        acc.push(cardValue + score)
                    })
                    return acc;
                }, [])
            } else {
                accu = accu.map(v => v + cardValues[0])
            }
            return accu;
        }, [0])
        return findBestScore(potentialScores, isDealer);
    }
}

// TODO:
const findBestScore = (scores: number[], isDealer: boolean) => {
    return scores.reduce((bestScore: number, score: number) => {
        if (bestScore === 0) {
            return score;
        }
        if (score === WINNING_SCORE) {
            return score;
        }
        if (score > WINNING_SCORE && bestScore < WINNING_SCORE) {
            return bestScore;
        }
        if (score < WINNING_SCORE && bestScore > WINNING_SCORE) {
            return score;
        }
        if (score < WINNING_SCORE && bestScore < WINNING_SCORE) {
            if (isDealer) {
                if (bestScore >= DEALER_MIN_SCORE && score < DEALER_MIN_SCORE) {
                    return score
                }
                if (bestScore < DEALER_MIN_SCORE && score >= DEALER_MIN_SCORE) {
                    return bestScore
                }
            }
            return Math.max(bestScore, score);
        }
        if (score > WINNING_SCORE && bestScore > WINNING_SCORE) {
            return Math.min(bestScore, score);
        }
        return bestScore;
    }, 0);
}

const isBlackJack = (cards: Card[]) => {
    return cards.length === 2
        && cards.some((card)=> card.value === 'A')
        && cards.some((card)=> ['Q', 'K', 'J','10'].includes(card.value));
}
const getCardValues = (card: Card) => {
    switch (card.value) {
        case 'Q':
        case 'K':
        case 'J':return [10];
        case 'A':return [1,11]
        default: return [Number(card.value)]
    }
}
