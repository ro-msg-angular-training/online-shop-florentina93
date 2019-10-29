import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentials = {
    username: 'doej',
    password: 'password'
  };

  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('/login');
  }

  fillCredentials(credentials: any = this.credentials) {
    element(by.name('username')).sendKeys(credentials.username);
    element(by.name('password')).sendKeys(credentials.password);
    element(by.css('.btn-primary')).click();
  }

  getPageTitleText() {
    return element(by.css('app-login h3')).getText();
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}
