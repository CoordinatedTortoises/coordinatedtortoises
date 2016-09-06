# Project Name

> Pithy project description

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

The app has 2 separate databases, one for user preferences and user authorization, and the other one for containing all the info on the currency we
are looking at. The user database is postgreSQL, so we can have a material view, and the other is rethinkDB which is noSQL, which has very fast read and write.

The server uses node and express along with some other middleware for development.

The front end uses react and d3.


## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
