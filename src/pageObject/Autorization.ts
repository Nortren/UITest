
// import {Page} from "@playwright/test";
export class Autorization {
    //@ts-ignore
    page: any;

    //@ts-ignore
    constructor(page) {
        this.page = page;
    }
    async init() {
        const USERNAME = 'alexander.stromov@inten.to'
        const PASSWORD = 'Agidel17'

        await this.page.goto('https://portal-stage.inten.to/');

        await this.page.click('text=Sign in instead');
        await this.page.fill('input[id="login-email"]', USERNAME);
        await this.page.fill('input[id="login-password"]', PASSWORD);
        await this.page.click('button:has-text("Sign in")');



    }
}
