const {MTPortalPage} = require('../pageObject/MTPortalPageObject')

const searchPage = new MTPortalPage(page);
const inputTextArea = searchPage.inputTextArea();
const outputTextArea = searchPage.outputTextArea();
const selectLanguageFrom = searchPage.selectLanguageFrom();
const selectLanguageTo = searchPage.selectLanguageTo();
const selectProvider = searchPage.selectProvider();

it("Checking the authorization", async () => {
    searchPage.initPage();
    await page.waitForTimeout(7000);
}, 120000);
// TODO тест отрабатывает с ошибкой т.к в консоль портала посе нажатия кнопки "Cancel Translate" падает ошибка
it("checking cancel translate", async () => {
    await selectLanguageFrom.changeLanguage('English');
    await selectLanguageTo.changeLanguage('Russian');
    await inputTextArea.writeText('Run test');
    await outputTextArea.clickCancelButton();
    const resultTranslate = await outputTextArea.getContent();
    await expect(resultTranslate).toBe("");
    await page.waitForTimeout(3000);
},70000);