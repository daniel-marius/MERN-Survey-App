const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', async () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('Can see survey create form', async () => {
    const label = await page.getContentsOf('form label');
    expect(label).toEqual('Survey Title');
  });

  describe('And using valid inputs', async () => {
    beforeEach(async () => {
      await page.type('input' 'My Title');
      await page.click('form button.teal.btn-flat.right.white-text');
    });

    test('Submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });

    test('Submitting then saving adds survey to index page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');

      const title = await page.getContentsOf('.card-title');

      expect(title).toEqual('My Title');
    });
  });

  describe('And using invalid inputs', async () => {
    beforeEach(async () => {
      await page.click('form button.teal.btn-flat.right.white-text');
    });

    test('The form shows an error message', async () => {
      const error = await page.getContentsOf('div.red-text');
      expect(error).toEqual('You must provide a value!');
    });
  });
});

describe('User is not logged in', async () => {
  test('User cannot create survey post', async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/surveys', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: 'My Title', subject: 'My Subject', body: 'My Body', recipients: 'email@yahoo.com' })
        }).then(res => res.json());
      }
    );
    expect(result).toEqual({ error: 'Not logged in!' });
  });
});
