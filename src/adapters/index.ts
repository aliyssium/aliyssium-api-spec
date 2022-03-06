import { Static, Type } from '@sinclair/typebox';

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
