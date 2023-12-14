import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Home extends BasePage {
    private categorySelectionFromNav: Locator;
    private wishListButton: Locator
    private searchButton: Locator
    private searchBar: Locator



    constructor(page: Page) {
        super(page)
        this.searchButton = this.page.locator('//*[@id="app-root"]/div[2]/header/div/div[4]/nav/ul/li[1]/button')
        this.searchBar = this.page.locator('//*[@id="app-root"]/div[2]/header/div[2]/div[4]/nav/ul/li[1]/div/form/input')
    }
    goto =async () => {
        await this.page.goto('https://www.terminalx.com/women')
    }
    pausePage =async () => {
        await this.page.pause()
    }

    clickOnCategoryFromNav =async (category:string) => {
        this.categorySelectionFromNav = this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
        await this.categorySelectionFromNav.click()
    }

    hoverOverCategory =async (category: string) => {
        this.categorySelectionFromNav = this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
        await this.categorySelectionFromNav.hover()


    }



    // selectFromSubCategory =async (KidGender:string, clothingOption: string) => {
    //     await this.page.locator(`//ul/li/a[text() = '${KidGender}']/parent::li/ul/li/a[text() ='${clothingOption}']`).click()
    // }

    subCategorySelector = async (SubCategory: string ,item:string) => {
        await this.page.locator(`//a[@href="${SubCategory}"]/parent::li/ul/li/a[text() = "${item}"]`).click()
    }

    clickOnWishList =async () => {
        await this.page.evaluate(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
        await this.page.locator(`//*[@id="app-root"]/div[2]/header/div/div[2]/div[3]/div/a[1]`).click()
    }

    clickOnCart =async () => {
        await this.page.evaluate(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
        await this.page.locator(`//*[@id="app-root"]/div[2]/header/div/div[2]/div[3]/div/a[2]`).click()
    }
    searchForItem =async (searchQuery: string) => {
        await this.searchButton.click()
        await this.searchBar.fill(`${searchQuery}`)
        await this.page.keyboard.press('Enter')
        
    }

    

}





    // //nav/ul/li/a[text() = 'ילדים']/parent::li/parent::ul/parent::nav/following::div/div/div/ul/li/a[text() = 'TEEN']
    // //ul/li/a[text() = 'בנים']/parent::li/ul/li/a[text() ='חולצות']
    // const selectFromSubCategory = this.page.locator(`//a[text() = "TEEN"]/parent::li/ul/li/a[text() = 'מכנסיים']`)
    // `//a[text() = "TEEN"]/parent::li/ul/li/a[text() = 'מכנסיים']