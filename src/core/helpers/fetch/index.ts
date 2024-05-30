import qs from "qs";
const API_URL = "http://localhost:1337/api/";

const fetchApi = {
  get: async (endpoint: string, query: any) => {
    const queryString = qs.stringify(query, { encode: false });
    const response = await fetch(`${API_URL}${endpoint}?${queryString}`);
    const data = await response.json();
    return data;
  },
  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  put: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  },
};

export default fetchApi;
