const jsonConfig = {
  "name": "react-build",
  "private": true,
  "version": "16.0.0-alpha",
  "devDependencies": {
    "aliasify": "^2.0.0",
    "art": "^0.10.1",
    "async": "^1.5.0",
    "babel-cli": "^6.6.5",
    "babel-core": "^6.0.0",
    "babel-eslint": "^5.0.0",
    "babel-preset-react": "^6.5.0",
    "babel-traverse": "^6.9.0",
    "babylon": "6.8.0",
    "browserify": "^13.0.0",
    "bundle-collapser": "^1.1.1",
    "coffee-script": "^1.8.0",
    "core-js": "^2.2.1",
    "coveralls": "^2.11.6",
    "del": "^2.0.2",
    "derequire": "^2.0.3",
    "eslint": "1.10.3",
    "eslint-plugin-react": "4.1.0",
    "eslint-plugin-react-internal": "file:eslint-rules",
    "fbjs": "^0.8.4",
    "fbjs-scripts": "^0.6.0",
    "flow-bin": "^0.31.0",
    "glob": "^6.0.1",
    "gzip-js": "~0.3.2",
    "jest": "^15.1.1",
    "loose-envify": "^1.1.0",
    "merge-stream": "^1.0.0",
    "object-assign": "^4.1.0",
    "platform": "^1.1.0",
    "run-sequence": "^1.1.4",
    "through2": "^2.0.0",
    "tmp": "~0.0.28",
    "typescript": "~1.8.10",
    "uglify-js": "^2.5.0",
    "uglifyify": "^3.0.1"
  },
  "devEngines": {
    "node": "4.x || 5.x || 6.x",
    "npm": "2.x || 3.x"
  },
  "commonerConfig": {
    "version": 7
  },
  "scripts": {
    "build": "grunt build",
    "test": "jest",
    "flow": "flow"
  },
  "jest": {
    "modulePathIgnorePatterns": [
      "/.module-cache/",
      "/react/build/"
    ],
    "rootDir": "",
    "scriptPreprocessor": "scripts/jest/preprocessor.js",
    "setupFiles": [
      "scripts/jest/environment.js"
    ],
    "setupTestFrameworkScriptFile": "scripts/jest/test-framework-setup.js",
    "testRegex": "/__tests__/",
    "moduleFileExtensions": [
      "js",
      "json",
      "node",
      "coffee",
      "ts"
    ],
    "testPathDirs": [
      "<rootDir>/eslint-rules",
      "<rootDir>/mocks",
      "<rootDir>/scripts",
      "<rootDir>/src",
      "node_modules/fbjs"
    ],
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/shared/vendor/third_party/*.js",
      "!src/test/*.js"
    ],
    "timers": "fake"
  }
};