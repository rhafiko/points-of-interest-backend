<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the App `Points of Interest` which allows users to mark/edit their points of interest on a map. Users can use the app to share their Points of Interest with each other.

Users need to create an account and sign in to have access to the map and start to do mark Points of Interest.

**About Limitations** and what changes would need to be considered to scale to 100, 1 000, and 100 000 concurrent users:
- As the solution uses JWT tokens, it is ready for scale as microservice. 
- In order to support the load and concurrent users, it may be necessary to review the database connection pool.
- The app is mobile-friendly but, needs some enhancements, like the use of device GPS to trace routes, receive push notifications when a new place is shared. As it isn't a native/hybrid solution, have some limitations about hardware features access.

### See it running at Heroku

- [Points Of Interest](https://points-of-interest-frontend.herokuapp.com)
- https://points-of-interest-frontend.herokuapp.com


## Installation

```bash
$ npm install
```

## Environment Variables

- The database used is PostgreSQL
- Running on the development environment, it is necessary to change the DATABASE_URL located in the file: 

```html
src/environment
  .env.stage.dev
    DATABASE_URL=postgres://postgres:postgres@localhost:5432/point-management

Current value: user......: postgres
               password..: postgres
               host......: localhost
               port......: 5432
               database..: point-management

```
- Just create the database point-management.
- The NestJs framework is configured to auto-refresh and create the database struct at the start by the use of TypeORM. 
- However, if necessary, here is the database script for creation:

```javascript

CREATE TABLE public."user" (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
	CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
);

CREATE TABLE public.point (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	title varchar NOT NULL,
	"userId" uuid NULL,
	lat varchar NOT NULL,
	lng varchar NOT NULL,
	CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY (id)
);

ALTER TABLE public.point ADD CONSTRAINT "FK_c01766b92e52572f0b871c24bb6" FOREIGN KEY ("userId") REFERENCES "user"(id);

```

## Running the app

```bash
# development (localhost)
$ npm run start:dev

```

## Next Features

1. Rate the locals using stars. For rates from 1 to 2 stars force comment.
2. Add comments and photos, allowing users to share their impressions about it.
3. Show top-rated places near my location, with the option to sort by most recent, top-rated, etc.
4. Share local and Allow other users to view it by using of @userName
5. Change local visibility by toggle public/private or shared, viewing its attributes as owner, rate, and users comments.
6. Bookmark local as preferred and provide quick access to these lists
7. Search places by a distance range
8. Group places when zoomed out.
9. Add tags/categories of places like “next travel, stay away, cozy, etc”
10. Trace a new route to the select place
11. Config users profile to add photo
12. Option on users profile to make all places as public/private by default
13. User full name and email
14. Password change/recover option



