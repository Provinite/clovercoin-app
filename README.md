# Installation

## Dependencies

You'll need nodejs and yarn. Optionally docker for postgres.

## Clone the repo

```sh
git clone git@github.com:provinite/clovercoin-app.git
```

## Install

```sh
yarn install
```

## Start Postgres

```sh
docker run --name clovercoin-app-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

# Running The Apps

## Server

To run the server,

```sh
cd packages/api
yarn start
```

It will start on `http://localhost:3000/`

## Client

To run the client,

```sh
cd packages/client
yarn start
```

It will start on `http://localhost:1234`
