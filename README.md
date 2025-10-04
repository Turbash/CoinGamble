# CoinGamble

This is the repo for my first project for siege, hackclub.

# Theme

The game is based on this week's theme for siege hackclub that is something related to coins,etc.

## Overview

This is a website where coin collectors can log their coins and the then experts will evaluate their coins and they will get to know the value of their coins.

* First the user comes and registers themselves either as a collector, or a user, settin up there credentialls.

* If you are a collector, you get a dashboard of all you coins, initially empty where you can add your coin.

* For a collector, you see all the coins whose evaluation is still pending in the database.

* Then any evaluator can assign value to a pending coin based on its description and picture.

## How to run locally

* Clone the repository:

```
git clone https://github.com/Turbash/CoinGamble
```

* Set up backend environ ment variables in backend/.env:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

* start the backend:

```
cd backend
node server.js
```

* set up the frontend environment variables in .env:

```
VITE_BACKEND_URL=your_backend_url
```

* start the froned:

```
npm run dev
```

## Tech 

For frontend React with Vite and for backend Node express is used, Monog db is used for database.

## Requirements

Just make sure to have a decent version of node an npm in your system. And make sure the environment variables are setup properly for both frontend and backend.

## License

NO License, DO whatever you want to do with this code.