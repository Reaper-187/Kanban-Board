import axios from "axios";

const LOGIN_API = import.meta.env.VITE_API_LOGIN;
const LOGOUT_API = import.meta.env.VITE_API_LOGOUT;
const AUTHCHECK_API = import.meta.env.VITE_API_USERAUTHCHECK;

export type UserLoginProps = {
  email: string | undefined;
  password: string | undefined;
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
  console.log("session Check", response.data);

  return response.data;
};

export const fetchLogin = async (
  data: UserLoginProps
): Promise<UserLoginProps> => {
  const response = await axios.post<UserLoginProps>(LOGIN_API, data, {
    withCredentials: true,
  });
  console.log(response);

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
