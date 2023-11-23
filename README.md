# Black Jack

The game is based on rules from this [article](https://www.pinnacle.com/en/betting-articles/casino/how-to-play-blackjack/apn24f8ark6vlkzn)

## Technology

- [TypeScript][ts] - Used to speed up development by catching type related issues at or before build time.
- [ESLint][eslint] - Used to enforce best practices and catch common js errors 
- [Prettier][prettier] - used to format code
- [React][react] - UI rendering lib 
- [Nextjs][nextjs] - Full stack web framework(pages and REST API)
- [Vercel][vercel] - Hosting platform
- [Jest][jest] - testing framework
- [KV][kv] - KV(Redis) - key value database hosted on Vercel
- [TailwindCSS][tailwindcss] - utility css classes for fast development and small css bundles
- [ReactQuery][reactquery] - Managing remote state across components


## Deploy

The app is deployed on vercel on every commit and available at [api404-black-jack.vercel.app](https://api404-black-jack.vercel.app/)

## Install

```bash
yarn install
```

## Running locally
In order to run the app locally you need to create .env file with following variables:

```
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.


## Tests
In order to run tests please do:

```bash
yarn test
```


## REST API endpoints

- `POST /api/games` Create new game
- `GET /api/games/:gameId` Get game by id
- `POST /api/games/:gameId/:action` Play the game. Actions can be 'hit' or 'stand'

##

[react]: https://reactjs.org/
[ts]: https://www.typescriptlang.org/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/
[nextjs]: https://nextjs.org/
[vercel]: https://vercel.com/
[tailwindcss]: https://v2.tailwindcss.com/
[kv]: https://vercel.com/docs/storage/vercel-kv
[reactquery]: https://tanstack.com/query/latest