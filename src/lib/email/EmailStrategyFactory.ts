import type { EmailStrategy } from './EmailStrategy';
import { PlunkStrategy } from './PlunkStrategy';

export enum EmailStrategyFeatureFlag {
	PLUNK = 'plunk',
	SMTP = 'smtp'
}

export class EmailStrategyFactory {
	public static getEmailStrategy(featureFlag: EmailStrategyFeatureFlag): EmailStrategy {
		switch (featureFlag) {
			case EmailStrategyFeatureFlag.PLUNK:
				return new PlunkStrategy();

			default:
				throw new Error(`Unknown email strategy feature flag: ${featureFlag}`);
		}
	}
}
