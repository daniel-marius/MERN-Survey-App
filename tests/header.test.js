const Page = require('./helpers/page');

let page;

// Executed before each test runs
beforeEach( async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

// Executed after each test runs
afterEach( async() => {
  await page.close();
});

test('The header has the correct text', async () => {
  const text = await page.getContentsOf('a.left.brand-logo');

  expect(text).toEqual('Emaily');
});

test('Clicking login starts oauth flow', async () => {
  await page.click('.right a');
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});
