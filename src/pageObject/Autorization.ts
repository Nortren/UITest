
// import {Page} from "@playwright/test";
export class Autorization {
    //@ts-ignore
    page: any;

    //@ts-ignore
    constructor(page) {
        this.page = page;
    }
    async init() {
        const USERNAME = ''
        const PASSWORD = ''

        await this.page.goto('');

        await this.page.click('text=Sign in');
        await this.page.fill('input[id="login-email"]', USERNAME);
        await this.page.fill('input[id="login-password"]', PASSWORD);
        await this.page.click('button:has-text("Sign in")');
        await this.page.waitForTimeout(3000);
        await this.page.goto('https://portal-stage.inten.to/');


    }
}
