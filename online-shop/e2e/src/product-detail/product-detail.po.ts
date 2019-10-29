import { browser, by, element } from 'protractor';

export class ProductDetailPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('/product/0');
  }

  getPageHeadingText() {
    return element(by.css('app-product-detail h2')).getText();
  }

}
