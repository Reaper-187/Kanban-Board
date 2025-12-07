import axios from "axios";

const GAUTHN_API = import.meta.env.VITE_API_GAUTHN;

// const GHUBAUTHN_API = import.meta.env.VITE_API_GHUBAUTHN;

export type GoogleAuthUrlResponse = {
  url: string;
};

export const getGoogleAuth = async (): Promise<GoogleAuthUrlResponse> => {
  const response = await axios.get<GoogleAuthUrlResponse>(GAUTHN_API, {
    withCredentials: true,
  });
  return response.data;
};
