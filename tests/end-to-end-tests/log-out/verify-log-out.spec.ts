import { test } from '../../../core/fixtures/test';
import { validUser } from '../../../core/fixtures/users';

test('verify log out functionality', async ({
	loginPage,
	mainPage,
	settingsPage,
}) => {

	await test.step('open the login page and dismiss cookie consent', async () => {
		await loginPage.navigateToLocalEnvironment();
		await loginPage.dismissCookieConsent();
	});

	await test.step('log in with valid credentials', async () => {
		await loginPage.loginToLocalEnvironment(
			validUser.username,
			validUser.password,
		);
	});

	await test.step('open settings and navigate to Account Settings', async () => {
		await mainPage.closeWelcomeModal();
		await mainPage.openSettingsModal();
		await mainPage.navigateToSettingsTab('Account Settings');
	});

	await test.step('log out', async () => {
		await settingsPage.logOut();
	});
});
