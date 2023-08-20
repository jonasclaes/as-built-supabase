import { PLUNK_SECRET_API_KEY } from '$env/static/private';
import Plunk from '@plunk/node';
import type { EmailStrategy } from './EmailStrategy';

export class PlunkStrategy implements EmailStrategy {
	protected _plunk: Plunk;

	constructor() {
		this._plunk = new Plunk(PLUNK_SECRET_API_KEY);
	}

	async sendEvent(event: string, email: string, data: Record<string, string>): Promise<void> {
		const _data: Record<string, { persist: boolean; value: string }> = {};
		for (const [key, value] of Object.entries(data)) {
			_data[key] = {
				persist: false,
				value
			};
		}

		// TODO: Update this code when the Plunk library is updated. Owner of Plunk provided us with this undocumented feature.
		const { success } = await this._plunk.events.track({
			event,
			email,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			data: _data
		});

		if (!success) throw new Error('Failed to send event to Plunk');
	}
}
