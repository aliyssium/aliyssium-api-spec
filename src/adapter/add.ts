/* Adapter Add */
import { Static, Type } from '@sinclair/typebox';
import { adapter, AdapterBaseType } from './general';

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
	adapter: adapter,
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
