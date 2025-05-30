// Email validation regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface SignupCredentials {
  email: string;  // This will be validated against EmailStr pattern
  password: string;
}

export interface AuthResponse {
    message: string;
    token?: string;
    user?: {
      id: string;
      email: string;
    };
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user_id: number;
  is_admin: number;
  is_staff: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Type guard to validate email format
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
} 