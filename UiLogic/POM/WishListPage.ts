import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class WishListPage extends BasePage {

    private colorSpan: Locator
    private itemNameFromWishList: Locator
    private noItemAddedWarning: Locator
    private itemColorLocator: Locator
    private EditItemButton: Locator
    private saveChangesButton: Locator

    constructor(page: Page) {
        super(page)
        this.colorSpan = this.page.locator("//span[contains(., 'צבע')]")
        this.itemNameFromWishList = this.page.locator(`//li/div[3]/div/div[@class='right_1o65']/a`)
        this.noItemAddedWarning = this.page.locator('//*[@id="app-root"]/div[2]/main/div[2]/div/div/div[2]/span')
        this.itemColorLocator = this.page.locator("//li/div[3]/div[2]/span")
        this.EditItemButton = this.page.locator("//button[text() = 'EDIT']")
        this.saveChangesButton = this.page.locator("//button[contains(text(), 'CHANGE')]")
        
    }


    getItemNameFromWishList = async (title: string): Promise<string> => {
        const element = await this.page.locator(`//a[text() = '${title}']`);
        const textContent: any = await element.textContent();
        return textContent;
    }
    
    getItemColorFromWishList =async () => {
        const color = this.colorSpan.textContent()
        return color
    }

    getItemPriceFromWishList = async (itemName: string) => {
        const item = this.page.locator(`//a[text() = '${itemName}']/parent::div/parent::div/div/div/div`)
        const price = await item.textContent()
        return price;
    }

    isWishlistEmpty =async (): Promise<boolean> => {
        const isVisible = await this.noItemAddedWarning.isVisible()
        return isVisible
    }

    getItemColor =async (): Promise<string> => {
        const itemColor: any = await this.page.locator("//li/div[3]/div[2]/span")
        const textContent: any = await itemColor.nth(0).textContent();
        return textContent;
    }
    getItemSize =async (): Promise<string> => {
        const itemColor: any = await this.page.locator("//li/div[3]/div[2]/span")
        const textContent: any = await itemColor.nth(1).textContent();
        return textContent;
    }

    editProductColor =async (colorName: string) => {
        await this.EditItemButton.click()
        const color = this.page.locator(`//div[contains(@style, '${colorName}')]`)
        await color.click()
    }

    saveChanges =async () => {
        await this.saveChangesButton.click()
    }

    getItemsCount =async () => {
        const itemTitles = await this.page.locator('//li/div[3]/div/div[2]/a')
        const count = itemTitles.count()
        return count
    }



// 

}
