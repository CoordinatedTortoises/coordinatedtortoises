# Project Name

Crypto currency stock tracker. Current features include live volume graph with x and y axis control, and live map of transactions, create a a transaction hash with past transactions, and ability to look up exhange rates.

## Team

  - __Product Owner__: Nick Olszowy
  - __Scrum Master__: Clarabelle Cheng-Yue
  - __Development Team Members__: Julian Knodt, Peter Herbert

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> ```npm start``` from the root directory and 

## Requirements

Install these with Brew or another shell package manager

- Node ^4.x
- Postgresql 9.1.x
- RethinkDB 2.3.5

Use this command when you need to start a DB:

```sh
brew services start <dbname>
```
## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm start
```
This will start nodemon. 

From within the client "Public" directory:

```sh
npm install
npm start
```
Will start live-server and babel transpiler.


### Roadmap

View the project roadmap [here](https://github.com/CoordinatedTortoises/coordinatedtortoises/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
