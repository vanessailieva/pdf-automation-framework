import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
	private readonly usernameInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;
	readonly loginPanel: Locator;
	readonly cookieConsentDialog: Locator;
	private readonly rejectCookieConsentButton: Locator;
	readonly invalidCredentialsMessage: Locator;
	readonly usernameRequiredMessage: Locator;

	constructor(private readonly page: Page) {
		this.usernameInput = page.getByRole('textbox', { name: 'Username' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.loginButton = page.getByRole('button', { name: 'Login' });
		this.loginPanel = page.locator('form').locator('..').locator('..');
		this.cookieConsentDialog = page.getByRole('dialog', {
			name: 'How we use Cookies',
		});
		this.rejectCookieConsentButton = page.getByRole('button', {
			name: 'No Thanks',
		});
		this.invalidCredentialsMessage = page.getByText(
			'Invalid username or password',
			{ exact: true },
		);
		this.usernameRequiredMessage = page.getByText('Username is required', {
			exact: true,
		});
	}

	async navigateToLocalEnvironment(): Promise<void> {
		// Local URL: http://localhost:8080/login
		await this.page.goto('/login');
	}

	async dismissCookieConsent(): Promise<void> {
		const cookieBannerIsVisible = await this.hasCookieConsentDialog();

		if (cookieBannerIsVisible) {
			await this.rejectCookieConsentButton.click({ timeout: 5_000 });
		}
	}

	async hasCookieConsentDialog(): Promise<boolean> {
		return this.cookieConsentDialog
			.waitFor({ state: 'visible', timeout: 5_000 })
			.then(() => true)
			.catch(() => false);
	}

	async fillCredentials(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
	}

	async verifyLoginButtonState(isEnabled: boolean): Promise<void> {
		if (isEnabled) {
			await expect(this.loginButton).toBeEnabled();
			return;
		}

		await expect(this.loginButton).toBeDisabled();
	}

	async verifyLoginButtonRequiresBothCredentials(
		username: string,
		password: string,
	): Promise<void> {
		await this.verifyLoginButtonState(false);

		await this.fillCredentials(username, '');
		await this.verifyLoginButtonState(false);

		await this.fillCredentials('', password);
		await this.verifyLoginButtonState(false);

		await this.fillCredentials(username, password);
		await this.verifyLoginButtonState(true);
	}

	async submitLogin(): Promise<void> {
		await this.loginButton.click();
	}

	async loginToLocalEnvironment(username: string, password: string): Promise<void> {
		await this.usernameInput.waitFor({ state: 'visible', timeout: 10_000 });
		await this.fillCredentials(username, password);
		await expect(this.loginButton).toBeEnabled({ timeout: 10_000 });
		await this.submitLogin();
	}

	async expectSuccessfulLogin(username: string): Promise<void> {
		await expect(this.page).toHaveURL(/\/(?:editor)?$/);
		await expect(
			this.page.getByRole('button', {
				name: new RegExp(`${username}\\s+—\\s+Account`, 'i'),
			}),
		).toBeVisible();
	}

	async expectUnsuccessfulLogin(): Promise<void> {
		await expect(this.page).toHaveURL(/\/login(?:\?.*)?$/);
		await expect(this.invalidCredentialsMessage).toBeVisible();
	}

	async verifyUsernameIsRequiredMessage(): Promise<void> {
		await expect(this.usernameRequiredMessage).toBeVisible();
	}
}
