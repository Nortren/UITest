// https://github.com/fractalliter/express-react-typescript
// https://www.carlrippon.com/getting-started-with-playwright/
// https://github.com/fractalliter/express-react-typescript
const {MTPortalPage} = require('../src/pageObject/MTPortalPageObject')

const searchPage = new MTPortalPage(page);
const inputTextArea = searchPage.inputTextArea();
const outputTextArea = searchPage.outputTextArea();
const selectLanguageFrom = searchPage.selectLanguageFrom();
const selectLanguageTo = searchPage.selectLanguageTo();
const selectProvider = searchPage.selectProvider();

it("Checking the authorization", async () => {
    searchPage.initPage();
    await page.waitForTimeout(7000);
}, 70000);


it("Checking the transfer", async () => {
    await selectLanguageFrom.changeLanguage('English');
    await selectLanguageTo.changeLanguage('Russian');
    await selectProvider.changeProvider('Alibaba Cloud');
    await inputTextArea.writeText('test case');

    await page.waitForTimeout(5000);

    const resultTranslate = await outputTextArea.getContent();
    expect(resultTranslate).toBe('Тестовый корпус');

    await page.waitForTimeout(3000);
}, 700000)

it("checking clear area", async () => {

    await inputTextArea.writeText('Run test');

    await page.waitForTimeout(3000);
    await inputTextArea.clearArea();
    const resultTranslate = await outputTextArea.getContent();
    await page.waitForTimeout(3000);
    await expect(resultTranslate).toBe("");
    await page.waitForTimeout(3000);
}, 700000);

