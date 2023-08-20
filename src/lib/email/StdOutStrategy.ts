import type { EmailStrategy } from './EmailStrategy';

export class StdOutStrategy implements EmailStrategy {
	public async sendEvent(
		event: string,
		email: string,
		data: Record<string, string | { persist: boolean; value: string }>
	): Promise<void> {
		console.table({
			event,
			email,
			...data
		});
	}
}
