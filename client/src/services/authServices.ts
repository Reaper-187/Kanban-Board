import axios from "axios";

const LOGIN_API = import.meta.env.VITE_API_LOGIN;
const REGISTER_API = import.meta.env.VITE_API_REGISTER;
const LOGOUT_API = import.meta.env.VITE_API_LOGOUT;
const AUTHCHECK_API = import.meta.env.VITE_API_USERAUTHCHECK;
const FORGOTPW_API = import.meta.env.VITE_API_FORGOTPW;
const VERIFYOTP_API = import.meta.env.VITE_API_VERIFYOTP;
const RESET_USER_PW_API = import.meta.env.VITE_API_RESETUPW;
const USER_INFO_API = import.meta.env.VITE_API_USERINFO;
const CHANGE_PW_API = import.meta.env.VITE_API_CHANGEPW;

export type UserProps = {
  userId: string | null;
  userRole: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

export const getUserInfo = async (): Promise<UserProps> => {
  const response = await axios.get<UserProps>(USER_INFO_API, {
    withCredentials: true,
  });
  return response.data;
};

export type UserAuthProps = {
  userId: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
};
export const checkUserAuth = async (): Promise<UserAuthProps> => {
  const response = await axios.get<UserAuthProps>(AUTHCHECK_API, {
    withCredentials: true,
  });
  return response.data;
};

export type UserLoginProps = {
  email: string | undefined;
  password: string | undefined;
};

export const fetchLogin = async (
  data: UserLoginProps
): Promise<UserLoginProps> => {
  const response = await axios.post<UserLoginProps>(LOGIN_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export type UserRegisterProps = {
  _id?: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

export const fetchRegister = async (
  data: UserRegisterProps
): Promise<UserRegisterProps> => {
  const response = await axios.post<UserRegisterProps>(REGISTER_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchLogout = async () => {
  const response = await axios.post(
    LOGOUT_API,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export type RequestTokenResponse = {
  email: string;
  token?: number;
};

export const forgotPw = async (
  data: RequestTokenResponse
): Promise<RequestTokenResponse> => {
  const response = await axios.post<RequestTokenResponse>(FORGOTPW_API, data, {
    withCredentials: true,
  });

  return response.data;
};

export type RequestOtp = {
  otpNum: string;
  token: number;
};

export const verifyUserOtp = async (data: RequestOtp): Promise<RequestOtp> => {
  const response = await axios.post<RequestOtp>(VERIFYOTP_API, data, {
    withCredentials: true,
  });

  return response.data;
};

export type RequestResetUserPw = {
  newUserPw: string;
  token: number;
};

export const resetUserPw = async (
  data: RequestResetUserPw
): Promise<RequestResetUserPw> => {
  const response = await axios.post<RequestResetUserPw>(
    RESET_USER_PW_API,
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export type UserChangePwProps = {
  currentPw: string;
  newPw: string;
};

export const userChangePw = async (
  data: UserChangePwProps
): Promise<UserChangePwProps> => {
  const response = await axios.post<UserChangePwProps>(CHANGE_PW_API, data, {
    withCredentials: true,
  });
  return response.data;
};

// interface UserLoginProps {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   veryfication: boolean;
//   veryficationToken: string;
//   createdOn: Date;
//   tokenExp: Date;
//   otpNum: number;
//   blockedAccount: boolean;
//   restCodeExp: Date;
// }
