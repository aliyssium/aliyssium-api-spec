/* Adapter Start */
import { Static, Type } from '@sinclair/typebox';
import { AdapterState } from './general';

export const startAdapterBody = Type.Object({
	name: Type.String({
		description: 'Name of the adapter',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyssbot'
	})
});

export type IStartAdapterBody = Static<typeof startAdapterBody>

export const startAdapterResponseSuccess = Type.Object({
	state: Type.Enum(AdapterState, { description: 'State of the adapter' }),
	success: Type.Boolean({ description: 'Should theoretically return true in all cases' })
});

export type IStartAdapterResponseSuccess = Static<typeof startAdapterResponseSuccess>

const startAdapterResponses = {
	200: startAdapterResponseSuccess
};

export const startAdapterSchema = {
	description: 'Start Adapter',
	tags: [ 'Adapters' ],
	summary: 'Starts the adapter',
	body: startAdapterBody,
	response: startAdapterResponses
};
