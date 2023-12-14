import { Locator, Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    goto =async () => {
        await this.page.goto('https://www.terminalx.com/women')
    }
    pausePage =async () => {
        await this.page.pause()
    }
    reloadPage =async () => {
        await this.page.reload()
    }

}