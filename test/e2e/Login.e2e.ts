import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);

const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Login`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('Should render title', async (t) => {
  await t.expect(getPageTitle()).eql('IA²');
});

test('Should login on valid credentials', async (t) => {
  const { AUTH_USERNAME, AUTH_PASSWORD } = process.env;

  const emailInput = Selector('#email');
  const passwordInput = Selector('#password');

  await t.expect(emailInput.exists).eql(true);
  await t.expect(passwordInput.exists).eql(true);

  await t.typeText(emailInput, AUTH_USERNAME);
  await t.typeText(passwordInput, AUTH_PASSWORD);
  const submitButton = Selector('button').nth(1);
  await t.click(submitButton);
});
