import {BlackJackGameState} from "@/game/BlackJack/types";


export type PublicGameState = { gameId: string } & Pick<BlackJackGameState, 'playerScore'| 'playerCards' | 'dealerOpenCards' | 'result'>

//TODO: add dealer score
export const getPublicGameState = (gameId: string, {playerCards, playerScore, dealerOpenCards, result}: BlackJackGameState): PublicGameState => {
    return { gameId, playerScore, playerCards, dealerOpenCards, result }
}