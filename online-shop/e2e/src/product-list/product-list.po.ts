import { browser, by, element } from 'protractor';

export class ProductListPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('/products');
  }

  getPageHeadingText() {
    return element(by.css('app-product-list h2')).getText();
  }

  getProductListElements() {
    return element.all(by.css('#products'));
  }

  getFirstProductElement() {
    return element(by.css('#products tr'));
  }

  getProductDetails() {
    return element.all(by.css('#products td a')).first();
  }
}
