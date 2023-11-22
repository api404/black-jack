import {kv} from "@vercel/kv";
import {BlackJackGameState} from "@/game/BlackJack/types";
import {getPublicGameState} from "@/app/api/games/_helpers/getPublicGameState";

export async function GET(request: Request,
                          { params: { gameId } }: { params: { gameId: string } }) {

    const gameState = await kv.get<BlackJackGameState>(gameId);
    if (!gameState) return Response.json({
        message: 'Game not found',
    }, {
        status: 404,
    })

    return Response.json(getPublicGameState(gameId, gameState));
}
