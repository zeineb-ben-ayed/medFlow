export interface LoginResponse {
  login: {
    access_token: string;
  };
}

export interface LoginVariables {
  username: string;
  password: string;
}