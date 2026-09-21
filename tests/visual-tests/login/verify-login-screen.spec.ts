import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/test';
import { invalidUser } from '../../../core/fixtures/users';

test('matches the login panel, cookie consent dialog, and validation messages', async ({ loginPage }) => {
	await test.step('open the login page', async () => {
		await loginPage.navigateToLocalEnvironment();
	});

	await test.step('compare the cookie consent dialog', async () => {
		await expect(loginPage.cookieConsentDialog).toHaveScreenshot(
			'cookie-consent-dialog.png',
		);
	});

	await test.step('dismiss cookie consent and compare the login panel', async () => {
		await loginPage.dismissCookieConsent();
		await expect(loginPage.loginPanel).toHaveScreenshot('login-panel.png');
	});

	await test.step('compare the required username message', async () => {
		await loginPage.fillCredentials(' ', ' ');
		await loginPage.submitLogin();
		await loginPage.verifyUsernameIsRequiredMessage();
		await expect(loginPage.usernameRequiredMessage).toHaveScreenshot(
			'username-required-message.png',
		);
	});

	await test.step('compare the invalid credentials message', async () => {
		await loginPage.loginToLocalEnvironment(
			invalidUser.username,
			invalidUser.password,
		);
		await loginPage.expectUnsuccessfulLogin();
		await expect(loginPage.invalidCredentialsMessage).toHaveScreenshot(
			'invalid-credentials-message.png',
		);
	});
});
