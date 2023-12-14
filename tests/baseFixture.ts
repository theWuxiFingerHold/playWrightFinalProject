import { test as base } from "@playwright/test";
import { Home } from "../UiLogic/POM/HomePage";
import { ProductPage } from "../UiLogic/POM/ProductsPage";
import { WishListPage } from "../UiLogic/POM/WishListPage";
import { ApiHandler } from "../logic/functions/requests";

export const test = base.extend<{product: ProductPage, home: Home, wishList: WishListPage, api : ApiHandler}>({

    product:async ({page}, use) => {
        await use(new ProductPage(page))
    },
    home:async ({page}, use) => {
        await use(new Home(page))
    },
    wishList:async ({page}, use) => {
        await use(new WishListPage(page))
    },

    
    api:async ({page}, use) => {
        await use(new ApiHandler(page))
    },

})

export { expect } from "@playwright/test";