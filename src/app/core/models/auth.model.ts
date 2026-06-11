export interface SignInData {
  email: string;
  password: string;
}

export interface RegistrationData {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface UpdateProfileData {
  nickname?: string;
  email?: string;
  password?: string;
}
