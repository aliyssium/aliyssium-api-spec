import { Static, Type } from '@sinclair/typebox';
import { adapter } from 'src/adapters/index';

export const adaptersListResponseSuccess = Type.Object({
	adapters: Type.Array(
		adapter,
		{ description: 'Array of adapters registered to the User' }
	),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IAdaptersListResponseSuccess = Static<typeof adaptersListResponseSuccess>

const registerResponses = {
	200: adaptersListResponseSuccess
};

export const adaptersListSchema = {
	description: 'List Adapters',
	tags: [ 'Adapters' ],
	summary: 'Sends a request to retrieve a list of adapters',
	response: registerResponses
};
