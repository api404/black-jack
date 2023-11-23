import { FC } from "react";

interface Props {
  className?: string;
}
export const InfoLink: FC<Props> = ({ className }) => (
  <a
    className={className}
    target="_blank"
    href="https://www.pinnacle.com/en/betting-articles/casino/how-to-play-blackjack/apn24f8ark6vlkzn"
  >
    How to play?
  </a>
);
