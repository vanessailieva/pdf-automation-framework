import { test } from '../../../core/fixtures/test';
import { validUser } from '../../../core/fixtures/users';

test('logs in successfully with valid credentials', async ({ loginPage }) => {
	await test.step('open the login page and dismiss cookie consent', async () => {
		await loginPage.navigateToLocalEnvironment();
		await loginPage.dismissCookieConsent();
	});

	await test.step('log in with valid credentials', async () => {
		await loginPage.loginToLocalEnvironment(validUser.username, validUser.password);
	});

	await test.step('verify the signed-in user', async () => {
		await loginPage.expectSuccessfulLogin(validUser.username);
	});
});
