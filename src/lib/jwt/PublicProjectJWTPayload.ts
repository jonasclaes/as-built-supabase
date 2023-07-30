import type { JWTPayload } from 'jose';

export interface PublicProjectJWTPayload extends JWTPayload {
	organization?: string;
	project?: string;
}
