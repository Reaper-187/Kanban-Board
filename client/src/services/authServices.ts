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
const GUEST_ACCESS_API = import.meta.env.VITE_API_GUEST_ACCESS;

export type ApiMessage = { message: string };

export type UserProps = {
  userId: string | null;
  userRole: string | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  provider: "google" | "github" | null;
};

export const getUserInfo = async (): Promise<UserProps> => {
  const response = await axios.get<UserProps>(USER_INFO_API, {
    withCredentials: true,
  });
  console.log("response.data", response.data);

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

export const fetchLogin = async (data: UserLoginProps): Promise<ApiMessage> => {
  const response = await axios.post<ApiMessage>(LOGIN_API, data, {
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
): Promise<ApiMessage> => {
  const response = await axios.post<ApiMessage>(REGISTER_API, data, {
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
): Promise<ApiMessage> => {
  const response = await axios.post<ApiMessage>(RESET_USER_PW_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export type UserChangePwProps = {
  currentPw: string;
  newPw: string;
};

export const userChangePw = async (
  data: UserChangePwProps
): Promise<ApiMessage> => {
  const response = await axios.post<ApiMessage>(CHANGE_PW_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const guestAccess = async () => {
  const response = await axios.post(
    GUEST_ACCESS_API,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
