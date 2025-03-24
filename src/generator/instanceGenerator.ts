export function generateInstance(): string {
	return `import type { AxiosInstance } from 'axios';

let apiClient: AxiosInstance;

export function setApiClient(instance: AxiosInstance): void {
	apiClient = instance;
}

export function getApiClient(): AxiosInstance {
	if (!apiClient) {
		throw new Error('API client not configured. Call setApiClient with an axios instance first.');
	}
	return apiClient;
}

export { apiClient };`;
}
