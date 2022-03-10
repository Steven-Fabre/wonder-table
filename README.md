# npm_package_react_boilerplate

Create a account on [npmjs](https://www.npmjs.com/).
Clone or download this repostiory.

## Installation

```
npm i
```

## Make a component

Create your component in ./lib/index.js.  
Make sure the package name does not exist with the search on the npm site.

## Edit package.json

Modify the package.json file.

```
"name": "Package name",
"description": "Description of package",
"author": "Dev name",
"keywords": ["a", "short", "list", "of", "keywords"],
"version": "0.1.0",
"private": false,
"main": "dist/index.js",
"module": "dist/index.js",
"files": [ "dist", "README.md" ],
"repository": {
    "type": "git",
    "url": "Your repository address"
},
```

## Documentation


Edit this readme.md file to indicate how to use and install your package. If you have published your package on github this file will be used for documentation on the npm site.

## Connect to npm and publish

Use git bash to execute "npm run build" command. The component will be created in the dist directory.

```
npm run build
```

Connect to your npm account with the npm login command.


```
npm run login
```

And publish

```
npm run publish
```

## Note


If you have an "E403" error. Make sure you have validated your npm account. If the error persists, ask to receive the confirmation email again.

## Source


[Based on this article](https://levelup.gitconnected.com/publish-react-components-as-an-npm-package-7a671a2fb7f/)



