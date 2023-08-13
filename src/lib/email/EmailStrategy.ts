export interface EmailStrategy {
	sendEvent: (
		event: string,
		email: string,
		data: Record<string, string | { persist: boolean; value: string }>
	) => Promise<void>;
}
