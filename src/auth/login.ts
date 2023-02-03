/* Auth Login */
import { Static, Type } from '@sinclair/typebox';

export const loginBody = Type.Object({
	username: Type.String({
		description: 'Username',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyss'
	}),
	password: Type.String({
		minLength: 10,
		pattern: '^(?=.*\\d)(?=.*^[A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{10,}$',
		description: 'Password must be minimum 8 letters, with at least a symbol, upper and lower case letters and a number',
		example: 'Secure_Password1'
	})
});

export type ILoginBody = Static<typeof loginBody>

export const loginResponseSuccess = Type.Object({
	username: Type.String({ description: 'Username is returned as an Identifier' }),
	accessToken: Type.String({ description: 'Access Token for further requests to the API' }),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type ILoginResponseSuccess = Static<typeof loginResponseSuccess>

export const usernamePasswordError = Type.Object({
	username: Type.String({ description: 'Username is returned as an Identifier' }),
	error: Type.String({ default: 'Username or Password are incorrect' })
});

export type IUsernamePasswordError = Static<typeof usernamePasswordError>

const loginResponses = {
	200: loginResponseSuccess,
	401: usernamePasswordError
};

export const loginSchema = {
	description: 'Login User',
	tags: [ 'Authentication' ],
	summary: 'Sends a login request',
	body: loginBody,
	response: loginResponses
};
