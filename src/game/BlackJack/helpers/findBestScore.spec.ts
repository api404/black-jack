import {findBestScore} from "@/game/BlackJack/helpers/findBestScore";

interface FindBestScoreTest {
    scores: number[];
    isDealer: boolean;
    expectedResult: number;
}

describe('findBestScore', () => {
    const tests: FindBestScoreTest[] = [
        { scores: [], expectedResult: 0, isDealer: true},
        { scores: [6], expectedResult: 6, isDealer: true},
        { scores: [1,2], expectedResult: 2, isDealer: true},
        { scores: [2,21], expectedResult: 21, isDealer: true},
        { scores: [10,22], expectedResult: 10, isDealer: true},
        { scores: [10,10], expectedResult: 10, isDealer: true},
        { scores: [21,22], expectedResult: 21, isDealer: true},
        { scores: [], expectedResult: 0, isDealer: false},
        { scores: [8], expectedResult: 8, isDealer: false},
        { scores: [1, 2], expectedResult: 2, isDealer: false},
        { scores: [6, 21], expectedResult: 21, isDealer: false},
        { scores: [16, 22], expectedResult: 16, isDealer: false},
        { scores: [21, 22], expectedResult: 21, isDealer: false},
        { scores: [15, 15], expectedResult: 15, isDealer: false},
    ]

    tests.forEach(({scores,expectedResult,isDealer}) => {
        it(`For potential scores ${scores.length ? scores : '[]'} returns ${expectedResult} for ${isDealer ? 'dealer' : 'player'}`, () => {
            expect(findBestScore(scores, isDealer)).toEqual(expectedResult);
        })
    })
})