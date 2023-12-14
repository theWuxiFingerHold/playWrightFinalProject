import { request } from "@playwright/test";
async function globalSetupfun() {
    const requestContext = await request.newContext()
    await requestContext.post("https://www.terminalx.com/pg/MutationUserLogin", {
      data: {
        username: "foadnassar69@gmail.com",
        password: "Fou@d123"
      }
    })
    await requestContext.storageState({
      path: "auth.json"
    })
}

export default globalSetupfun