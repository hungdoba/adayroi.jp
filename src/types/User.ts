export interface SignInUser {
  username: string;
  password: string;
}

export interface SignUpUser extends SignInUser {
  email: string;
}
