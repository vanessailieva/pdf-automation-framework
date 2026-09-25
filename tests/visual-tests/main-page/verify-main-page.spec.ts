import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/test';
import { validUser } from '../../../core/fixtures/users';

test('matches the authenticated main page', async ({
	page,
	loginPage,
	mainPage,
}) => {
	await test.step('open the login page and dismiss cookie consent', async () => {
		await loginPage.navigateToLocalEnvironment();
		await loginPage.dismissCookieConsent();
	});

	await test.step('log in and dismiss the welcome modal', async () => {
		await loginPage.loginToLocalEnvironment(
			validUser.username,
			validUser.password,
		);
		await mainPage.closeWelcomeModal();
	});

	await test.step('compare the main page without documents', async () => {
		await expect(page).toHaveScreenshot('main-page.png', {
			mask: [mainPage.documentsPanel],
		});
	});
});