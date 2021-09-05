
// https://www.carlrippon.com/getting-started-with-playwright/
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
    await page.waitForTimeout(3000);

    const resultTranslate = await outputTextArea.getContent();
    expect(resultTranslate).toBe('Тестовый корпус');
    await inputTextArea.clearArea();
}, 70000)

it("checking cancel translate", async () => {

    await inputTextArea.writeText('Run test');
    await page.waitForTimeout(500);
    await outputTextArea.clickCancelButton();
    await inputTextArea.clearArea();
    const resultTranslate = await outputTextArea.getContent();
    expect(resultTranslate).toBe('')
}, 20000);