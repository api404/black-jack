export const cardKinds = ['clubs', 'hearts', 'spades', 'diamonds'] as const;
export type CardKind = typeof cardKinds[number];
export const cardValues = ['2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , 'J' , 'Q' , 'K' , 'A'] as const;
export type CardValue = typeof cardValues[number];