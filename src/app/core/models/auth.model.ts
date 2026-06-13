export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface UpdateData {
  nickname?: string;
  email?: string;
  password?: string;
}
