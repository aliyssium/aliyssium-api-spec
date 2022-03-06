import { Static, Type } from '@sinclair/typebox';
import { adapterType } from 'src/adapters/index';

export const adapterTypesListResponseSuccess = Type.Object({
	adapterTypes: Type.Array(
		adapterType,
		{ description: 'Array of adapter types available' }
	),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IAdapterTypesListResponseSuccess = Static<typeof adapterTypesListResponseSuccess>

const registerResponses = {
	200: adapterTypesListResponseSuccess
};

export const adapterTypesListSchema = {
	description: 'List Adapter Types',
	tags: [ 'Adapters' ],
	summary: 'Sends a request to retrieve a list of adapter types',
	response: registerResponses
};
