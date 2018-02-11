---
id: tutorials-express
title: Tutorial: Express
sidebar_label: Express
---

This tutorial outlines how to create a simple [Express](https://expressjs.com/) server using Noderize. You can see the [final code here](https://github.com/Cretezy/Noderize/tree/master/examples/basic-express) with a [running demo](https://noderize-basic-express.herokuapp.com).

Our goal is to have 2 endpoints:

* `GET /`: Displays welcome message
* `GET /greet`: Accepts a `name` parameter and greets the user

Time required: ~5 minutes.

## Setup

To start, [create](create.md) your Noderize app and `cd` into it:

```bash
yarn create noderize basic-express
# or
npx create-noderize basic-express

# then
cd basic-express
```

Next, we'll install our `express` dependency:

```bash
yarn add express
# or
npm install express
```

Our `package.json` should look something like this (except the versions being the latest):

```json
{
	"name": "basic-express",
	"version": "0.1.0",
	"private": true,
	"scripts": {
		"watch": "noderize-scripts watch",
		"test": "noderize-scripts test",
		"format": "noderize-scripts format",
		"build": "noderize-scripts build",
		"start": "noderize-scripts start"
	},
    "devDependencies": {
        "noderize-scripts": "^0.2.5"
    },
	"dependencies": {
		"express": "^4.16.2"
	}
}
```

## Express server

Looking into `src/index.js`, we can see an empty app. Let's clear the file and start making our app.

We'll first start by importing Express using ES modules and creating our Express server.

```js
import express from "express";

const app = express();
```

To determine which port our web server will run on, we'll try reading from the `PORT` environment variable, and default back to `3000`:

```js
const port = parseInt(process.env.PORT) || 3000;
```

Next, we will to tell Express to listen to requests. We will also provide a callback to indicate us that our app is running:

```js
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
```

Finally, for our `GET /` route, we'll attach a function to send `Hello from Noderize!`:

```js
app.get("/", (req, res) => {
	res.send("Hello from Noderize!");
});
```

## Running our app

Let's try it out! Let's start our app in development mode using `watch`:

```bash
yarn watch
# or
npm run watch
```

When visiting `http://localhost:3000`, we'll see this:

![](/img/docs/tutorials-express-1.png)

Success! From now our, on code will automatically update on changes.

## Greeting route

Lets next add our greeting endpoint, which will takes a `name` parameter (defaulting to `world`) and returns a greeting:

```js
app.get("/greet", (req, res) => {
	res.send(`Hello ${req.query.name || "world"}!`);
});
```

![](/img/docs/tutorials-express-2.png)

![](/img/docs/tutorials-express-3.png)

Finished!

## Summary

In this tutorial we saw how to:

* [Setup a Noderize app and install Express](#setup)
* [Import Express and setup our Express server](#express-server)
* [Run our Noderize app](#running-our-app)
* [Add our greeting route](#greeting-route)
