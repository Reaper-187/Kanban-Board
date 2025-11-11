import axios from "axios";

const LOGIN_API = import.meta.env.VITE_API_LOGIN;
const LOGOUT_API = import.meta.env.VITE_API_LOGOUT;

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

export const fetchLogout = async () => {
  const response = await axios.post(`${LOGOUT_API}`, {
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
