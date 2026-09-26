export const validUser = {
	username: process.env.E2E_USERNAME || 'admin',
	password: process.env.E2E_PASSWORD || 'changeme123',
};

export const invalidUser = {
	username: validUser.username,
	password: 'wrong-password',
};

export const createRandomUser = () => ({
	username: `user_${Date.now()}`,
	password: `Pass${Math.random().toString(36).slice(2, 10)}!`,
});
