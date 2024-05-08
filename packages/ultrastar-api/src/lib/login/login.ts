import config from "@/config.json";
import { mergeHeaders } from "./mergeHeaders";

const loginUrl = `${config.apiUrl}/index.php?link=login`;

const loginFormBody = new FormData();
loginFormBody.set("user", Bun.env["USERNAME"]);
loginFormBody.set("pass", Bun.env["PASSWORD"]);
loginFormBody.set("login", "Login");

let loginCookie = "";

export const refreshLoginCookie = async () => {
  const response = await fetch(loginUrl, {
    method: "POST",
    body: loginFormBody,
  });

  loginCookie = response.headers.get("set-cookie")?.split(";")[0]!;
};

export const getLoginCookie = () => loginCookie;

export const loggedFetcher: typeof fetch = (url, init) => {
  const defaultHeaders = { cookie: getLoginCookie() };
  const headers = mergeHeaders(defaultHeaders, init?.headers);

  return fetch(url, { ...init, headers });
};
