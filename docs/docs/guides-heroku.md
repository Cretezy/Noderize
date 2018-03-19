---
id: guides-heroku
title: Guide: Heroku
sidebar_label: Heroku
---

Deploying to Heroku is very simple:

* Be in a Git repo (optional, `git init`)
* Create a Heroku app using `heroku create [name]`
* Move `@noderize/scripts` from `devDependencies` to `dependencies` in your `package.json`.
* Add `heroku-postbuild` script in `package.json`:
  ```json
  {
  	"scripts": {
  		"...": "...",
  		"heroku-postbuild": "noderize-scripts build --env production"
  	}
  }
  ```
* Deploy like normal (if in a Git repo, commit and push with `git push heroku master`)!
