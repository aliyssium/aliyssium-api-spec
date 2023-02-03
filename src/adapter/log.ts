/* Adapter Log */
import { Static, Type } from '@sinclair/typebox';

export const logAdapterBody = Type.Object({
	name: Type.String({
		description: 'Name of the adapter',
		minLength: 1,
		pattern: '^[a-zA-Z0-9_]+$',
		example: 'aliyssbot'
	})
});

export type ILogAdapterBody = Static<typeof logAdapterBody>

export const logAdapterSchema = {
	description: 'Logging Adapter',
	tags: [ 'Adapters' ],
	summary: 'Logs for an existing adapter',
	querystring: logAdapterBody
};
