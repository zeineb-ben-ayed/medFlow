export interface LoginResponse {
  login: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

export interface LoginVariables {
  username: string;
  password: string;
}