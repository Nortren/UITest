it('test', async () => {

  // Click body
  await page.click('body');

  // Go to https://portal-stage.inten.to/
  await page.goto('https://portal-stage.inten.to/');

  // Go to https://console2.inten.to/?next=https://portal-stage.inten.to
  await page.goto('https://console2.inten.to/?next=https://portal-stage.inten.to');

  // Go to https://console2.inten.to/register
  await page.goto('https://console2.inten.to/register');

  // Click button:has-text("Sign in")
  await page.click('button:has-text("Sign in")');

  // Click [placeholder="Enter your email"]
  await page.click('[placeholder="Enter your email"]');

  // Fill [placeholder="Enter your email"]
  await page.fill('[placeholder="Enter your email"]', 'timofei.trunov+no-mtp@inten.to');

  // Click [placeholder="Enter your password"]
  await page.click('[placeholder="Enter your password"]');

  // Fill [placeholder="Enter your password"]
  await page.fill('[placeholder="Enter your password"]', 'timofei.trunov+no-mtp@inten.to');

  // Click button:has-text("Sign in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://console2.inten.to/dashboard?bucket=1h&endDate=1632295355&group=client&startDate=1632208955' }*/),
    page.click('button:has-text("Sign in")')
  ]);

  // Click div[role="button"]:has-text("Translation Portal")
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('div[role="button"]:has-text("Translation Portal")')
  ]);

  // Click text=Autodetect
  await page1.click('text=Autodetect');

  // Click text=English
  await page1.click('text=English');

  // Click text=Spanish
  await page1.click('text=Spanish');

  // Click text=Russian
  await page1.click('text=Russian');

  // Fill textarea
  await page1.fill('textarea', 'test run');

  // Click text=тестовый запускTranslated via Yandex Cloud Translate API v2 >> svg
  await page1.click('text=тестовый запускTranslated via Yandex Cloud Translate API v2 >> svg');

},70000);