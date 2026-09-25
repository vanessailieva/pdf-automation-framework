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
			name: 'Open settings',
		});
		this.documentsPanel = page
			.getByText('No files yet', { exact: true })
			.locator('..');
		this.settingsModal = page
			.getByRole('dialog')
			.filter({ hasText: 'Account Settings' });
		this.closeSettingsModalButton = this.settingsModal.getByRole('button', {
			name: 'Close',
		});
		this.welcomeModal = page
			.getByRole('dialog')
			.filter({ hasText: 'Welcome to Stirling' });
		this.closeWelcomeModalButton = this.welcomeModal.getByRole('button', {
			name: /^$/,
		});
	}

	async openSettingsModal(): Promise<void> {
		await this.openSettingsButton.click();
	}

	async closeSettingsModal(): Promise<void> {
		await this.closeSettingsModalButton.click();
	}

	async navigateToSettingsTab(tabName: string): Promise<void> {
		await this.settingsModal.getByText(tabName, { exact: true }).click();
	}

	async closeWelcomeModal(): Promise<void> {
		await this.closeWelcomeModalButton.click();
	}
}
