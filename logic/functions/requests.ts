import { Page, request, APIResponse, Browser } from "@playwright/test";
import { RequestWrapper } from "../../infra/requestsFacade/httpFacade";
import { AddItemWishListRes } from "../../infra/response/addToWishListResponse";
import { removeFromWishListResponse } from "../../infra/response/removeFromWishListResponse";
import { Root } from "../../infra/response/addToCartResponse";
import { Main } from "../../infra/response/userInfoResponse";
import { loginResponse } from "../../infra/response/loginResponse";
import { WishList } from "../../infra/response/callingWishListResponse";
// import { CurrentUserInfoResponse } from "../../infra/response/currentUserInfo";
import { LogRes } from "../../infra/response/loginRes";
import urls from "../../JSONs/urls.json"
import { addCustomItemToWishList, addShirtToWishList, addItemToCart_data, removeItemWishList_data, login_data, getWishListItems_data } from "./requestMaker";


export class ApiHandler {
    private page: Page
    private requestWrapper: RequestWrapper;
  constructor(page: Page) {
    this.page = page
    this.requestWrapper = new RequestWrapper(page);
  }
  

  async addPremadeItemToWishList() {
    await this.requestWrapper.post<AddItemWishListRes>(urls["add-to-wishlist"], addShirtToWishList())
    await this.page.reload()
  }
  
  
  async addItemToWishList(sku: string, values: string) {
    await this.requestWrapper.post<AddItemWishListRes>(urls["add-to-wishlist"], addCustomItemToWishList(sku, values))
    await this.page.reload()
  }

  async login() {
    await this.requestWrapper.post<LogRes>(urls.loginUrl, login_data() )
  }

  // returns a single id depending on the index
  async getItemIdFromWishList(itemIndex:number = 0) {
    const item = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data())
    return item.data.anyWishlist.items[itemIndex].product.id
  }

  //this one returns all the ids, not just one.
  async getItemIdsFromWishList() {
    const item = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data());
    const productIds = item.data.anyWishlist.items.map(item => item.product.id);
    return productIds;
  }
  
  //retunrs one item name depending on the index
  async getItemNameFromWishList(itemIndex:number = 0): Promise<string> {

    const itemName = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data())
    return itemName.data.anyWishlist.items[itemIndex].product.image.label
  }
  //retunrs all item Names in the wishList
  async getItemNamesFromWishList() {
    const item = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data());
    const productNames = item.data.anyWishlist.items.map(item => item.product.image.label);
    return productNames;
  }

  //gives you the amount of items in the WishList
  async getWishListCount(): Promise<number> {
    const itemName = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data())
    return itemName.data.anyWishlist.items_count
  }

// clears wishlist
  async clearWishList() {
    const productIds = await this.getItemIdsFromWishList()
    for (const productId of productIds) {
        await this.removeFromWishList(productId);
    }
}

async getDiscountValue(index: number = 0): Promise<string> {
  const itemName = await this.requestWrapper.post<WishList>(urls["get-wishlist-data"], getWishListItems_data())
  const discountValue =  itemName.data.anyWishlist.items[index].product.price_range.minimum_price.discount.percent_off
  const jsonString = JSON.stringify(discountValue);
  return jsonString;
}


// removes one item on index
  async removeFromWishList(id:number) {
    await this.requestWrapper.post<removeFromWishListResponse>(urls["remove-from-wishlist"], removeItemWishList_data(id))
    await this.page.reload()
  }


  async addItemToCart(Any_sku: string) {
    await this.requestWrapper.post<Root>(urls["add-to-cart"], addItemToCart_data(Any_sku) )
    
    
  }

  async addSeveralItemsToWishList(...items:string[]) {
    for (const item of items) {
      await this.addItemToWishList(item, '4')
    }
    return items.length
  }



  async getItemNameFromCart(itemIndex: number): Promise<string> {
    const url ="https://www.terminalx.com/pg/QueryCurrentUserInfo?v=Vy487KOB%2FsDB%2F0cFkmdYWkLOsB8%3D"
    const requestBody = {
      data: {
        withBasicDetails: true,
        withCartCheckoutDetails: true,
        withCartItems: true,
        withCartObject: true,
        withMultipass: false,
        withWishlistCount: true,
      },
    };
    const apiResponse = await this.requestWrapper.PostForCartItem<Main>(url, requestBody)
    const itemName =  apiResponse.data.currentUserInfo.cart_object.items[itemIndex].product.image.label
    return itemName
  }




  
  
  




  





}


  