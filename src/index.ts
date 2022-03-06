import { Static, Type } from '@sinclair/typebox';

/* General Adapter */
export enum AdapterState {
	OFFLINE = 'OFFLINE',
	ONLINE = 'ONLINE',
	PENDING_AUTH = 'PENDING_AUTH',
	PENDING_INITIALIZATION = 'PENDING_INITIALIZATION'
}

export enum AdapterBaseType {
	WHATSAPP = 'WHATSAPP'
}

export const adapterTypeSettings = Type.Object({
	executionBeforeStart: Type.Boolean({ description: 'Has execution before the start of the adapter' }),
	executionAfterStart: Type.Boolean({ description: 'Has execution after the start of the adapter' })
}, { description: 'Settings of the adapter type' });

export const adapter = Type.Object({
	name: Type.String({ description: 'Name of the adapter' }),
	type: Type.Enum(AdapterBaseType, { description: 'Type of the adapter' }),
	description: Type.String({ description: 'Description of the adapter' }),
	state: Type.Enum(AdapterState, { description: 'State of the adapter' }),
	settings: adapterTypeSettings
});

export type IAdapter = Static<typeof adapter>

export const adapterType = Type.Object({
	name: Type.String({ description: 'Name of the adapter type' }),
	type: Type.Enum(AdapterBaseType, { description: 'Type of the adapter' }),
	description: Type.String({ description: 'Description of the adapter type' }),
	settings: adapterTypeSettings
});

export type IAdapterType = Static<typeof adapterType>

/* Adapter List */
export const adaptersListResponseSuccess = Type.Object({
	adapters: Type.Array(
		adapter,
		{ description: 'Array of adapters registered to the User' }
	),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IAdaptersListResponseSuccess = Static<typeof adaptersListResponseSuccess>

const adaptersListResponses = {
	200: adaptersListResponseSuccess
};

export const adaptersListSchema = {
	description: 'List Adapters',
	tags: [ 'Adapters' ],
	summary: 'Sends a request to retrieve a list of adapters',
	response: adaptersListResponses
};

/* Adapter Add */
export const addAdapterBody = Type.Object({
	name: Type.String({
		description: 'Name of the adapter',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyssbot'
	}),
	description: Type.String({ description: 'Description of the adapter' }),
	type: Type.Enum(AdapterBaseType, { description: 'Type of the adapter' })
});

export type IAddAdapterBody = Static<typeof addAdapterBody>

export const addAdapterResponseSuccess = Type.Object({
	name: Type.String({ example: 'aliyssbot', description: 'Name is returned as an Identifier' }),
	settings: adapterTypeSettings,
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IAddAdapterResponseSuccess = Static<typeof addAdapterResponseSuccess>

export const adapterAlreadyExistsError = Type.Object({
	name: Type.String({ example: 'aliyssbot', description: 'Name is returned as an Identifier' }),
	error: Type.String({ default: 'Adapter already exists' })
});

export type IAdapterAlreadyExistsError = Static<typeof adapterAlreadyExistsError>

const addAdapterResponses = {
	200: addAdapterResponseSuccess,
	409: adapterAlreadyExistsError
};

export const addAdapterSchema = {
	description: 'Add Adapter',
	tags: [ 'Adapters' ],
	summary: 'Creates an adapter and starts it',
	body: addAdapterBody,
	response: addAdapterResponses
};

/* Adapter Type */
export const adapterTypesListResponseSuccess = Type.Object({
	adapterTypes: Type.Array(
		adapterType,
		{ description: 'Array of adapter types available' }
	),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IAdapterTypesListResponseSuccess = Static<typeof adapterTypesListResponseSuccess>

const adapterTypesListResponses = {
	200: adapterTypesListResponseSuccess
};

export const adapterTypesListSchema = {
	description: 'List Adapter Types',
	tags: [ 'Adapters' ],
	summary: 'Sends a request to retrieve a list of adapter types',
	response: adapterTypesListResponses
};

/* Auth Login */
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

/* Auth Register */
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

