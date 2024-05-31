import React, { useState } from "react";
import { useAuthContext } from "@/core/contexts/popup/context/auth-context";
import { API } from "@/core/config";
import { setToken } from "@/core/helpers/auth";
import { AuthResponse } from "@/core/types";

export function Login() {
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const loginInfo = new FormData(event.currentTarget);
      const email = loginInfo.get("email");
      const password = loginInfo.get("password");
      console.log({ email, password });
      const value = {
        identifier: email,
        password: password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center">
      <div className="w-full">
        {!!error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email:
        </label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800"
          id="email"
          placeholder="email@emailcorp.com"
          name="email"
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Password:
        </label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800"
          id="password"
          name="password"
          type="password"
        />
        <button
          className="w-full py-2 px-8 bg-main text-white text-lg rounded-md"
          type="submit"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
