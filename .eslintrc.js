module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true,
      },
      "plugins": [
        "react",
      ],
      "globals": {
        "graphql": false,
      },
      "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true,
        },
      },
      "rules":{
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0,
        "react/jsx-one-expression-per-line": 0
      }
};