import qs from "qs";
import { API } from "@/core/config";
import { getToken } from "@/core/helpers/auth";

const fetchApi = {
  get: async (endpoint: string, query: any) => {
    const token = getToken();
    const queryString = qs.stringify(query, { encode: false });
    const response = await fetch(`${API}/${endpoint}?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  post: async (endpoint: string, body: any) => {
    const token = getToken();
    const response = await fetch(`${API}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  put: async (endpoint: string, body: any) => {
    const token = getToken();
    const response = await fetch(`${API}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  delete: async (endpoint: string) => {
    const token = getToken();
    const response = await fetch(`${API}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
};

export default fetchApi;
