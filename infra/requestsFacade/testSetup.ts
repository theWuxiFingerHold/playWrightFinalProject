export async function loginAndCreatePage(request: any, browser: any): Promise<any> {
    const state = await request
      .post(
        "https://www.terminalx.com/pg/MutationUserLogin",
        {
          data: {
            username: "foadnassar69@gmail.com",
            password: "Fou@d123",
          },
        }
      )
      .then(() => request.storageState())
      .then((storageState) => browser.newContext({ storageState }))
      .then((context) => context.newPage());
  
    return state;
  }