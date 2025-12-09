import axios from "axios";

const GAUTHN_API = import.meta.env.VITE_API_GAUTHN;

const GIT_HUB_AUTH_API = import.meta.env.VITE_API_GHUBAUTHN;

export type SocialAuthUrlResponse = {
  url: string;
};

export const getGoogleAuth = async (): Promise<SocialAuthUrlResponse> => {
  const response = await axios.get<SocialAuthUrlResponse>(GAUTHN_API, {
    withCredentials: true,
  });
  return response.data;
};

export const getGithubAuth = async (): Promise<SocialAuthUrlResponse> => {
  const response = await axios.get<SocialAuthUrlResponse>(GIT_HUB_AUTH_API, {
    withCredentials: true,
  });
  return response.data;
};
