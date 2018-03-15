---
id: guides-migrate
title: Guide: Migrate
sidebar_label: Migrate
---

You can use Noderize with an existing project.

* Move all your source into `src` or any [configured directory](configuration-noderize.md#srcdirectory).
* Add `@noderize/scripts` and `@noderize/runtime` to your project:
  ```bash
  yarn add @noderize/runtime
  yarn add -D @noderize/scripts
  # or
  npm install @noderize/runtime
  npm install -D @noderize/scripts
  ```
* Add your Noderize scripts (from the [template](https://github.com/Cretezy/Noderize/blob/master/packages/create/template/package.json)) and set `main`:
  ```json
  {
    "...": "...",
    "main": "dist/index.js"
	"scripts": {
		"watch": "noderize-scripts watch",
		"build": "noderize-scripts build",
		"start": "noderize-scripts start",
		"format": "noderize-scripts format",
		"test": "noderize-scripts test",
		"clean": "noderize-scripts clean"
    }
  }
  ```
* If your entry is not at `src/index.js` (or whichever your source directory is, you will need to configure [`bundles`](configuration-noderize.md#bundles) (for building) and [`startFile`](configuration-noderize.md#startfile) (for `watch`/`start`).

Try it out! Use the `build` command to see if it compiles.

If everything works, you can throw away all your other tools' configuration!
