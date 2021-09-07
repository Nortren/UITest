import {Autorization} from './Autorization'
import {Page} from "playwright";
import {Locator} from "playwright/types/types";

class MTPortalPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    initPage() {
        const initAutorization = new Autorization(this.page);
        initAutorization.init();
    }

    inputTextArea() {
        return new InputTextArea(this.page);
    }

    outputTextArea() {
        return new OutputTextArea(this.page);
    }

    selectProvider() {
        return new SelectProvider(this.page);
    }

    selectLanguageFrom() {
        return new SelectLanguageFrom(this.page);
    }

    selectLanguageTo() {
        return new SelectLanguageTo(this.page);
    }

    operationList() {
        return new OperationList(this.page);
    }
}


class InputTextArea {

    //@ts-ignore
    page: any;

    //@ts-ignore
    constructor(page) {
        this.page = page;
    }

    async writeText(inputText: string) {
        await this.page.fill('textarea[id="standard-multiline-static-from"]', inputText);
    }

    async clearArea() {
        await this.page.click('//*[@id="root"]/div/div/div[2]/div/div[2]/div[1]/div/div[2]/span');
    }

}

class OutputTextArea {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickCancelButton(){
        await this.page.click('button:has-text("Cancel translation")');
    }

    async getContent(){
        const getOutputData = await this.page.$('textarea[id="standard-multiline-static-to"]');
        const outputText = await getOutputData?.inputValue();
        return outputText;
    }

}

class SelectProvider {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async changeProvider(textProvider: string):Promise<void>{
        await this.page.click('//*[@id="root"]/div/div/div[2]/div/div[2]/div[1]/div/div[1]/div[1]/div/div/div');
        await this.page.click(`text=${textProvider}`);
    }
}

class SelectLanguageFrom {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async changeLanguage(textLanguage: string):Promise<void>{
        await this.page.click('//*[@id="root"]/div/div/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/div/div/div');
        await this.page.click(`text=${textLanguage}`);
    }
}

class SelectLanguageTo {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async changeLanguage(textLanguage: string):Promise<void>{
        await this.page.click('//*[@id="root"]/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div/div/div/div/div');
        await this.page.click(`text=${textLanguage}`);
    }
}

class OperationList {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

module.exports = {MTPortalPage};