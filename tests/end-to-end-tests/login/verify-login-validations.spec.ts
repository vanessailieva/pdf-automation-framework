import { test } from '../../../core/fixtures/test';
import { validUser } from '../../../core/fixtures/users';

test('shows a required username message for whitespace-only credentials', async ({ loginPage }) => {
	await test.step('open the login page and dismiss cookie consent', async () => {
		await loginPage.navigateToLocalEnvironment();
		await loginPage.dismissCookieConsent();
	});

	await test.step('verify Login requires both username and password', async () => {
		await loginPage.verifyLoginButtonRequiresBothCredentials(
			validUser.username,
			validUser.password,
		);
	});

	await test.step('fill the form with whitespace-only values and click Login', async () => {
		await loginPage.fillCredentials('   ', '   ');
		await loginPage.submitLogin();
	});

	await test.step('verify the required username message appears', async () => {
		await loginPage.verifyUsernameIsRequiredMessage();
	});
});
