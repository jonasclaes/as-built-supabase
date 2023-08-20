import { EMAIL_STRATEGY } from '$env/static/private';
import type { EmailStrategy } from './EmailStrategy';
import { PlunkStrategy } from './PlunkStrategy';
import { StdOutStrategy } from './StdOutStrategy';

export enum EmailStrategyFeatureFlag {
	STDOUT = 'stdout',
	PLUNK = 'plunk',
	SMTP = 'smtp'
}

export class EmailStrategyFactory {
	public static getEmailStrategy(): EmailStrategy {
		const featureFlag = EMAIL_STRATEGY;

		switch (featureFlag) {
			case EmailStrategyFeatureFlag.STDOUT:
				return new StdOutStrategy();

			case EmailStrategyFeatureFlag.PLUNK:
				return new PlunkStrategy();

			default:
				throw new Error(`Unknown email strategy feature flag: ${featureFlag}`);
		}
	}
}
