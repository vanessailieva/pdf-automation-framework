import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { MainPage } from '../pages/main-page';
import { SettingsPage } from '../pages/settings';

type PageFixtures = {
	loginPage: LoginPage;
	mainPage: MainPage;
	settingsPage: SettingsPage;
};

export const test = base.extend<PageFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	mainPage: async ({ page }, use) => {
		await use(new MainPage(page));
	},
	settingsPage: async ({ page }, use) => {
		await use(new SettingsPage(page));
	},
});
