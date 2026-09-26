import { expect, type Locator, type Page } from '@playwright/test';

export class SettingsPage {
	private readonly settingsModal: Locator;
	private readonly logOutButton: Locator;

	constructor(private readonly page: Page) {
		this.settingsModal = page.locator('body');
		this.logOutButton = this.settingsModal.getByRole('button', {
			name: /log out/i,
		});
	}

	async logOut(): Promise<void> {
		await this.logOutButton.click();
		await expect(this.page).toHaveURL(/\/login(?:\?.*)?$/);
	}
}
