export default {
    transform: {},
    "transform": {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.mjs$": "babel-jest"
    },
    "testEnvironment": "node",
    "extensionsToTreatAsEsm": [".ts", ".tsx", ".jsx"],
    "transformIgnorePatterns": ["node_modules"]
  }
  