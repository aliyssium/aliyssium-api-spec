/* Adapter Edit */
import { Static, Type } from '@sinclair/typebox';
import { adapter } from './general';
import { adapterAlreadyExistsError } from './add';

export const editAdapterBody = Type.Object({
	identifier: Type.String({
		description: 'Identifier of the adapter, in this case same as the name',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyssbot'
	}),
	name: Type.String({
		description: 'Name of the adapter',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyssbot'
	}),
	description: Type.String({ description: 'Description of the adapter' })
});

export type IEditAdapterBody = Static<typeof editAdapterBody>

export const editAdapterResponseSuccess = Type.Object({
	adapter: adapter,
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IEditAdapterResponseSuccess = Static<typeof editAdapterResponseSuccess>

const addAdapterResponses = {
	200: editAdapterResponseSuccess,
	409: adapterAlreadyExistsError
};

export const editAdapterSchema = {
	description: 'Edit Adapter',
	tags: [ 'Adapters' ],
	summary: 'Edits an existing adapter',
	body: editAdapterBody,
	response: addAdapterResponses
};
