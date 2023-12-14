import { expect, test } from "../tests/baseFixture";
import { Category } from '../uiEnums/Enums/CategoryEnum.ts';
import { Gender } from '../uiEnums/Enums/KidsEnum/KidsGender.ts';
import { ClothingOptionForKids } from '../uiEnums/Enums/KidsEnum/SubCategoryForKids.ts';
import { ACCESSORIES_MEN, MenSubCategory } from "../uiEnums/Enums/MenEnum/subCategoryForMen.ts";
import {WomenSubCategory, SHIRTS, PANTS, SHOES, ACCESSORIES} from "../uiEnums/Enums/WomenEnum/subCategoryForWomen.ts"
import { Colors } from "../uiEnums/Enums/filterByEnum/ColorsEnum/Colors.ts";
import { FilterBy } from "../uiEnums/Enums/filterByEnum/ColorsEnum/filterBy.ts"

test.describe('',async () => {
  
  test.beforeEach("",async ({api, home}) => {
    await api.clearWishList()
    await home.goto()
  })
  
  test("add red shorts via UI and validate the price and name and color",async ({home, product, wishList}) => {
  
    await home.goto()
    await home.hoverOverCategory(Category.WOMEN)
    await home.subCategorySelector(WomenSubCategory.WOMEN_PANTS, PANTS.SHORTS)
    await product.filterBy(FilterBy.COLOR)
    await product.selectColor(Colors.RED)
    await product.addToWishList()
    const itemNameFromProductPage = await product.getItemNameFromProductPage()
    const itemPriceFromProductPage = await product.getItemPriceFromProductPage()
    await home.clickOnWishList()
    const itemNameFromWishList = await wishList.getItemNameFromWishList(itemNameFromProductPage)
    const itemPrice = await wishList.getItemPriceFromWishList(itemNameFromProductPage)
    const itemColor = await wishList.getItemColor()
    expect(itemPrice).toBe(itemPriceFromProductPage)
    expect(itemNameFromWishList).toBe(itemNameFromProductPage)
    expect(itemColor).toContain('אדום')
  })
  
  
  test('add item via API and Validate in ui',async ({api, home, wishList}) => {
  
    await api.addItemToWishList("W214310001", "4")
    const itemNameInAPI = await api.getItemNameFromWishList()
    await home.clickOnWishList()
    const itemNamInUI = await wishList.getItemNameFromWishList(itemNameInAPI)
    expect(itemNamInUI).toBe(itemNameInAPI)
  })
  
  test("add item via UI, delete via API and check in UI",async ({api, home, product, wishList}) => {
  
    await home.hoverOverCategory(Category.MEN)
    await home.subCategorySelector(MenSubCategory.MEN_ACCESSORIES, ACCESSORIES_MEN.BAGS)
    await product.filterBy(FilterBy.COLOR)
    await product.selectColor(Colors.BLUE)
    await product.addToWishList()
    await home.clickOnWishList()
    const itemNameInAPI = await api.getItemNameFromWishList()
    const itemNamInUI = await wishList.getItemNameFromWishList(itemNameInAPI)
    expect(itemNamInUI).toBe(itemNameInAPI)
    expect(await wishList.getItemColor()).toContain('צבע: כחול')
    expect(await wishList.getItemSize()).toBe('OS')
    await api.removeFromWishList(await api.getItemIdFromWishList())
    const WishListCount = await api.getWishListCount()
    expect(WishListCount).toBe(0)
  })
  
  
  test('add item Via API and change color via UI',async ({api, home, product, wishList}) => {
  
    await api.addItemToWishList('Z962820027', '4')
    await home.clickOnWishList()
    const oldItemColor = await wishList.getItemColor()
    expect(oldItemColor).toContain('כחול נייבי')
    await wishList.editProductColor(Colors.WHITE)
    await wishList.saveChanges()
    const newItemColor = await wishList.getItemColor()
    expect(newItemColor).toContain('לבן')
  })
  
  test("adding sever item to wishList and check Count",async ({api, home, product, wishList}) => {
  
    const itemCount = await api.addSeveralItemsToWishList('Z962820027', 'X592330005', 'Z77350')
    await home.clickOnWishList()
    console.log(itemCount);
    console.log(await api.getWishListCount());
    expect(await api.getWishListCount()).toBe(itemCount)
  })
  
  test('search for item, filter by sale and check the discount value in api and ui',async ({api, home, product, wishList}) => {
  
    await home.searchForItem('Nike')
    await product.viewBy('מבצע')
    await product.addToWishList()
    const discount = await product.getDiscount();
    const discountAPI = await api.getDiscountValue()
    await home.clickOnWishList()
    expect(discount).toContain(discountAPI)
  })
  
})












