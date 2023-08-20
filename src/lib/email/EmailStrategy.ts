export interface EmailStrategy {
	sendEvent: (event: string, email: string, data: Record<string, string>) => Promise<void>;
}
