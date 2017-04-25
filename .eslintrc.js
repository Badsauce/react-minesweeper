module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "jest": true,
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "max-len": [2, 200, 4],
        "react/no-array-index-key": 0,
        "indent": [
            "error",
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
