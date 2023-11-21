export const cardKinds = ['♣', '♥', '♠', '♦'] as const;
export type CardKind = typeof cardKinds[number];
export function isCardKind(str: string): str is CardKind {
    return cardKinds.includes(str as CardKind);
}
export const cardValues = ['2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , 'J' , 'Q' , 'K' , 'A'] as const;
export type CardValue = typeof cardValues[number];
export function isCardValue(str: string): str is CardValue {
    return cardValues.includes(str as CardValue);
}