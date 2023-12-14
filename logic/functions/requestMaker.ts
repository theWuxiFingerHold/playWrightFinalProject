import  userData  from "../../JSONs/userData.json";

export function addShirtToWishList() {
    const dataToSend = {
        sku: ['W085710006'],
        attributes: ['93'],
        values: ['9'],
    };
    return dataToSend;
}
export function addCustomItemToWishList(sku: string, values: string) {
    const dataToSend = {
        sku: [sku],
        attributes: ['93'],
        values: [values],
    };
    return dataToSend;
}

export function removeItemWishList_data(id: number) {
    const dataToSend = {
        id: id
    };
    return dataToSend;
}

export function addItemToCart_data(Any_sku:string) {
    const requestBody = {
        cart_items: [
          {
            data: {
              quantity: 1,
              any_sku: Any_sku,
            },
          },
        ],
        skip_collect: 1,
      };
      return requestBody;
}

export function login_data() {
  const dataToSend = {
    username: userData.username,
    password: userData.password,

  };
  return dataToSend;
  
}


export function getWishListItems_data() {
  const dataToSend = {
  };
  return dataToSend
}

export function addItemsToWishList(sku: string) {
  const dataToSend = {
      sku: [sku],
      attributes: ['93'],
      values: ['4'],
  };
  return dataToSend;
}


