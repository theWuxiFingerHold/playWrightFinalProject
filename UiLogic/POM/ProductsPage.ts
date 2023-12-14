import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    private filters: Locator
    private ColorSelect: Locator
    private hoverOverImage: Locator
    private sizeSelect: Locator
    private brandOption: Locator
    private addToWishListButton: Locator
    private itemNameFromProductPage: Locator
    private itemPriceLocator: Locator
    private VIEWby: Locator
    private itemDiscount: Locator



    constructor(page: Page) {
        super(page)
        this.hoverOverImage = this.page.locator('//a/div/div/img')
        this.addToWishListButton = this.page.locator("//button[text() = 'MY LIST']")
        this.itemNameFromProductPage = this.page.locator(`//div[@class = 'right_1o65']/a`)
        this.itemPriceLocator = this.page.locator(`//li/div[3]/div/div/div/div`)
        this.VIEWby = this.page.locator(`//select[@name = 'sortField']`)
        this.itemDiscount = this.page.locator(`//li/div[3]/div/div/a`)


    }

    filterBy =async (by: string) => {
       this.filters = this.page.locator(`//h4[contains(text(), '${by}')]`) 
       await this.filters.click()
    }

    selectColor =async (Color:string) => {
        this.ColorSelect = this.page.locator(`//div[contains(@style, '${Color}')]`)
        await this.ColorSelect.click()
    }

    selectSize =async (size:string) => {
        this.sizeSelect = this.page.locator(`//h4[contains(text(), 'מידה')]/parent::div/following-sibling::ol/li/a[text() = '${size}']`)
        await this.sizeSelect.scrollIntoViewIfNeeded();
        await this.sizeSelect.click()
    }


    selecBrand =async (brandName: string) => {
        const brand = brandName.toLocaleUpperCase()
        this.brandOption = this.page.locator(`//h4[contains(text(), 'מותג')]/parent::div/following-sibling::ol/li/a[text() = '${brand}']`)
        await this.brandOption.click()

    }
    selectDiscount =async (discount:string) => {
        // await this.page.waitForLoadState('networkidle');
        this.sizeSelect = this.page.locator(`//h4[contains(text(), 'מידה')]/parent::div/following-sibling::ol/li/a[text() = '${discount}']`)
        await this.sizeSelect.scrollIntoViewIfNeeded();
        await this.sizeSelect.click()
    }

    addToWishList =async (index: number = 0) => {
        await this.addToWishListButton.nth(index).click()
    }

    getItemNameFromProductPage =async (index: number = 0): Promise<string> => {
        const itemName: any = this.itemNameFromProductPage.nth(index).textContent()
        return itemName;
    }

    getItemPriceFromProductPage =async (index: number = 0) => {
        const price = this.itemPriceLocator.nth(index).textContent()
        return price
    }
    getDiscount =async (index:number = 0) => {
        const discount = this.itemDiscount.nth(index).textContent()
        return discount
    }


    viewBy =async (option: string) => {
        await this.VIEWby.selectOption({ label: `${option}` })
    }



}
