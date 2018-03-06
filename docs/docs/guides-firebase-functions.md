---
id: guides-firebase-functions
title: Guide: Firebase Cloud Functions
sidebar_label: Firebase Cloud Functions
---

To deploy Firebase Cloud Functions, we must:

* Create a Firebase project
* Create a Noderize app
* Configure

## Requirements

You must setup the [Firebase CLI](https://github.com/firebase/firebase-tools) before setting up Functions.

Quick Firebase CLI setup:

```bash
yarn global add firebase-tools
# or
npm install -g firebase-tools

# then
firebase login
```

## Project Setup

Create a directory to be used as your project root (for Firebase). Setup Firebase using `firebase init`, and **do not** select the Functions options when creating.

Next, [create](create.md) a Noderize project inside your project root called `functions`.

> Note: You may change the directory name (defaults to `functions`) with the `functions.source` key in `firebase.json`.

## Setup

You will need to add the Firebase-specific dependencies and scripts.

First, add the dependencies:

```bash
yarn add firebase-admin firebase-functions
# or
npm install firebase-admin firebase-functions
```

Next, add these scripts to your `package.json`:

```json
{
    "scripts": {
        "...": "...",
		"prepack": "noderize-scripts clean && noderize-scripts build --env production",
		"preserve": "npm run build",
		"serve": "firebase serve --only functions",
		"predeploy": "npm run prepack",
		"deploy": "firebase deploy --only functions",
        "preshell": "npm run build",
        "shell": "firebase experimental:functions:shell",
        "logs": "firebase functions:log"
    }
}
```

This will allow you to use the `serve`, `deploy`, `logs`, and `shell` command from Firebase.

Done!

## Demo

Replace `src/index.js` by:

```js
import { https } from "firebase-functions";

export const test = https.onRequest((req, res) => {
	res.send("Hello world!");
});
```

Then run `yarn serve` or `npm run serve`. You will see it build, then serve the function. Clicking the function link will show `Hello world!`.
