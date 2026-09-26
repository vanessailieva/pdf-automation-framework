import { type Locator, type Page } from '@playwright/test';

export class MainPage {
	private readonly openSettingsButton: Locator;
	readonly documentsPanel: Locator;
	private readonly settingsModal: Locator;
	private readonly closeSettingsModalButton: Locator;
	private readonly welcomeModal: Locator;
	private readonly closeWelcomeModalButton: Locator;

	constructor(page: Page) {
		this.openSettingsButton = page.getByRole('button', {
			name: /Account/,
		});
		this.documentsPanel = page
			.getByText('No files yet', { exact: true })
			.locator('..');
		this.settingsModal = page.locator('body');
		this.closeSettingsModalButton = page.getByRole('button', {
			name: 'Close',
		});
		this.welcomeModal = page
			.getByRole('dialog')
			.filter({ hasText: 'Do you want to help make Stirling PDF better?' });
		this.closeWelcomeModalButton = this.welcomeModal.getByRole('button', {
			name: 'No',
		});
	}

	async openSettingsModal(): Promise<void> {
		await this.openSettingsButton.click();
	}

	async closeSettingsModal(): Promise<void> {
		await this.closeSettingsModalButton.click();
	}

	async navigateToSettingsTab(tabName: string): Promise<void> {
		await this.settingsModal.getByRole('link', { name: tabName, exact: true }).click();
	}

	async closeWelcomeModal(): Promise<void> {
		const analyticsModalIsVisible = await this.welcomeModal
			.isVisible()
			.catch(() => false);

		if (analyticsModalIsVisible) {
			await this.closeWelcomeModalButton.click();
		}
	}
}
