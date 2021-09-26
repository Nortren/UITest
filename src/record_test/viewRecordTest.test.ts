test('test', async () => {

  // Go to https://www.google.com/search?q=test&oq=test&aqs=chrome..69i57.44339j0j2&sourceid=chrome&ie=UTF-8
  await page.goto('https://www.google.com/search?q=test&oq=test&aqs=chrome..69i57.44339j0j2&sourceid=chrome&ie=UTF-8');

  // Click [aria-label="Копировать текст"]
  await page.click('[aria-label="Копировать текст"]');

},70000);