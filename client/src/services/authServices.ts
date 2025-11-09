import axios from "axios";

export type UserLoginProps = {
  email: string | undefined;
  password: string | undefined;
};

export const fetchLogin = async (
  data: UserLoginProps
): Promise<UserLoginProps> => {
  const response = await axios.post<UserLoginProps>("Route", data, {
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
