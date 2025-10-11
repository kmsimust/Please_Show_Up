// /* eslint-disable import/no-anonymous-default-export */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import config from "../../config";
// import { authTokenLocalStorage } from "./local-storage";

// const baseURL = `${config.apiPath}`;

// interface FetchData<T = any> {
//   data?: T;
// }

// const processFetch = (res: Response): Promise<FetchData> =>
//   Promise.all([res.ok, res.json()]).then(([ok, response]) => {
//     if (!ok) {
//       return Promise.reject(response);
//     }
//     return Promise.resolve({ data: response });
//   });

// export default {
//   get: (url: string): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
//   post: (url: string, body = {}): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body: JSON.stringify(body),
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
//   uploadImage: (url: string, body: FormData): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "POST",
//       headers: {
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body,
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
//   delete: (url: string, body = {}): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body: JSON.stringify(body),
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
//   put: (url: string, body = {}): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body: JSON.stringify(body),
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
//   patch: (url: string, body = {}): Promise<FetchData> => {
//     // eslint-disable-next-line no-console
//     // console.log(`${url} start: `, Date.now());
//     const token = authTokenLocalStorage.get();
//     return fetch(`${baseURL}${url}`, {
//       method: "PATCH",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body: JSON.stringify(body),
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       // console.log(`${url} end: `, Date.now());
//       return processFetch(res);
//     });
//   },
// };

/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { authTokenLocalStorage, refreshTokenLocalStorage } from "./local-storage";
import { RefreshTokenResponse } from "../apis/auth/api-action";

const baseURL = `${config.apiPath}`;

interface FetchData<T = any> {
  data?: T;
  error?: any;
}

const processFetch = (res: Response): Promise<FetchData> =>
  Promise.all([res.ok, res.json()]).then(([ok, response]) => {
    if (!ok) {
      return Promise.reject(response);
    }
    return Promise.resolve({ data: response });
  });

const refreshToken = async (): Promise<string> => {
  const refresh_token = refreshTokenLocalStorage.get();
  if (!refresh_token) {
    throw new Error('No refresh token available');
  }
  const token = authTokenLocalStorage.get();

  const response = await fetch(`${baseURL}/v1/auth/refresh-token`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ refresh_token }),
  });

  const data: RefreshTokenResponse = await response.json();
  if (data.success) {
    authTokenLocalStorage.set(data.access_token);
    refreshTokenLocalStorage.set(data.refresh_token);
    return data.access_token;
  } else {
    authTokenLocalStorage.remove();
    refreshTokenLocalStorage.remove();
    throw new Error('Failed to refresh token');
  }
};

const fetchWithRetry = async (url: string, options: RequestInit): Promise<FetchData> => {
  const token = authTokenLocalStorage.get();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    let response = await fetch(`${baseURL}${url}`, options);
    if (response.status === 401) {
      const newToken = await refreshToken();
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(`${baseURL}${url}`, options);
    }
    return processFetch(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get: (url: string): Promise<FetchData> => {
    return fetchWithRetry(url, {
      method: "GET",
      credentials: "include",
    });
  },
  post: (url: string, body = {}): Promise<FetchData> => {
    return fetchWithRetry(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
  },
  delete: (url: string, body = {}): Promise<FetchData> => {
    return fetchWithRetry(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
  },
  put: (url: string, body = {}): Promise<FetchData> => {
    return fetchWithRetry(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
  },
  patch: (url: string, body = {}): Promise<FetchData> => {
    return fetchWithRetry(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
  },
};
