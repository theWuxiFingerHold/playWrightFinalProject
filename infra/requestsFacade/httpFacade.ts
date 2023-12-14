import { test, Page, request, APIRequest, APIResponse } from '@playwright/test';
import { BasePage } from '../../UiLogic/POM/BasePage';

export class RequestWrapper extends BasePage {


  constructor(page: Page) {
    super(page)
  }


  async post<T>(url: string, requestBody: any): Promise<T> {
    const response = await this.page.request.post(url, {
      data: requestBody,
    });
    await this.page.context().storageState();
    const responseBody = await response.json();
    return responseBody as T;
  }


  async PostForCartItem<T>(url: string, requestBody: any): Promise<T> {
    const [response] = await Promise.all([
      this.page.waitForResponse(response => response.url() === url),
      this.page.evaluate(({ url, requestBody }) => {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      }, { url, requestBody }),
    ]);

    const responseBody = await response.json();
    return responseBody as T;

  }


  

}