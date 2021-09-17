const settingsTest = require('./settingTest.json');

const browserConfig = Object.keys(settingsTest['browserSettings']).filter((item) => {
    if (settingsTest.browserSettings[item]) {
        return item
    }
})
console.log(browserConfig, 'testBrowser')

module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    testEnvironmentOptions: {
        "jest-playwright": {
            browsers: browserConfig,
            launchOptions: {
                headless: settingsTest.headless,
            },
        },
    },
    reporters: [
        "default",
        "jest-html-reporters"
    ]
};