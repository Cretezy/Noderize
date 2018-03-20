---
id: guides-google-functions
title: Guide: Google Cloud Functions
sidebar_label: Google Cloud Functions
---

Deploy Google Cloud Functions is extremely simple with Noderize.

You will need a Google Cloud account with billing and the Cloud Functions API enabled,
and the [Google Cloud SDK](https://cloud.google.com/sdk/docs) installed.

First, [create](create.md) a Noderize project and `cd` into it.

Next, create a `.gcloudignore` file in the root of your project with the follow content:

```
.gcloudignore
.git
.gitignore
node_modules
#!include:.gitignore

!dist
src
```

Then, add a Function in your `src/index.js`:

```js
export function helloWorld (req, res)  {
	res.send('Hello World!');
}
```

[Build](scripts.md#build) your app with `yarn build` or `npm run build`,
then deploy with `gcloud beta functions deploy helloWorld --trigger-http`

This will take a minute or two, then output the app description.

Open the link under `httpsTrigger.url`, and you will see:

![](/img/docs/guides-google-functions.png)
