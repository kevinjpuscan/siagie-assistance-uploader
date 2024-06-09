import { AUTH_TOKEN } from "@/core/config";
import { API, BEARER } from "@/core/config";
import qs from "qs";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const getAuthUser = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  const query = {
    populate: {
      institution: {
        select: ["id", "name"],
      },
    },
  };
  const queryString = qs.stringify(query, { encode: false });
  const response = await fetch(`${API}/users/me?${queryString}`, {
    headers: { Authorization: `${BEARER} ${token}` },
  });
  if (response.status !== 200) {
    removeToken();
    return null;
  }
  const data = await response.json();
  return data;
};
