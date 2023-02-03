/* Auth Register */
import { Static, Type } from '@sinclair/typebox';

export const registerBody = Type.Object({
	username: Type.String({
		description: 'Username',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyss'
	}),
	email: Type.String({
		format: 'email',
		description: 'Must be formatted as E-Mail',
		example: 'aliyss@aliyssium.com'
	}),
	password: Type.String({
		minLength: 10,
		pattern: '^(?=.*\\d)(?=.*^[A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{10,}$',
		description: 'Password must be minimum 8 letters, with at least a symbol, upper and lower case letters and a number',
		example: 'Secure_Password1'
	})
});

export type IRegisterBody = Static<typeof registerBody>

export const registerResponseSuccess = Type.Object({
	username: Type.String({ description: 'Username is returned as an Identifier' }),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IRegisterResponseSuccess = Static<typeof registerResponseSuccess>

export const userAlreadyExistsError = Type.Object({
	username: Type.String({ example: 'aliyss', description: 'Username is returned as an Identifier' }),
	error: Type.String({ default: 'Username already exists' })
});

export type IUserAlreadyExistsError = Static<typeof userAlreadyExistsError>

const registerResponses = {
	200: registerResponseSuccess,
	409: userAlreadyExistsError
};

export const registerSchema = {
	description: 'Register User',
	tags: [ 'Authentication' ],
	summary: 'Sends a registration request',
	body: registerBody,
	response: registerResponses
};

