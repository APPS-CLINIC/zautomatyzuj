export interface ContactFormData {
  name?: string;
  email: string;
  company?: string;
}

export interface UserTokenData {
  token: string;
  createdAt: string;
  lastUsed: string;
  isNewUser: boolean;
}

export interface N8nWebhookPayload {
  userToken: string;
  message: string;
  userData?: ContactFormData;
  timestamp: string;
  isFirstMessage: boolean;
}

export interface N8nWebhookResponse {
  message: string;
  isReturningUser?: boolean;
  metadata?: Record<string, any>;
}
