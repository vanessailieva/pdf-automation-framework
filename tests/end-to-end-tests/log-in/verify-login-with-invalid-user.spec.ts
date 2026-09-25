import { test } from '../../../core/fixtures/test';
import { createRandomUser, validUser } from '../../../core/fixtures/users';

test('rejects invalid login attempts in sequence: valid username with wrong password, invalid username with valid password, and unknown user', async ({ loginPage }) => {
	const randomUser = createRandomUser();

	await test.step('open the login page and dismiss cookie consent', async () => {
		await loginPage.navigateToLocalEnvironment();
		await loginPage.dismissCookieConsent();
	});

	await test.step('try valid username with invalid password', async () => {
		await loginPage.loginToLocalEnvironment(validUser.username, 'invalid-password');
		await loginPage.expectUnsuccessfulLogin();
	});

	await test.step('try invalid username with valid password', async () => {
		await loginPage.loginToLocalEnvironment(
			randomUser.username,
			validUser.password,
		);
		await loginPage.expectUnsuccessfulLogin();
	});

	await test.step('try non-existing user', async () => {
		await loginPage.loginToLocalEnvironment(
			randomUser.username,
			randomUser.password,
		);
		await loginPage.expectUnsuccessfulLogin();
	});
});
