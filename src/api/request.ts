import axios  from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5054/api/',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);

axiosInstance.interceptors.response.use(
  ({ data }) => {
    return data;
  },
  async (error) => {
/*    if (error.response?.status === 401) {
      if (error.response?.config?.url === ENDPOINT.auth.refresh) return Promise.reject(error);
      try {
        await AuthApi.refreshToken();
      } catch (e) {
        console.error(e);
        if (error.response?.config?.url !== ENDPOINT.auth.logout) {
          await userStore.logout().catch((error) => error && console.error(error));
        }
        return Promise.reject(error);
      }
    }
    loggingErrorResponse(error.response)*/
    return Promise.reject(error);
  },
);

/*const loggingErrorResponse = ({ data, status, config }: AxiosResponse) => {
  Sentry.withScope((scope) => {
    scope.setExtras({
      request: {
        url: (config.baseURL || '') + config.url,
        method: config.method,
        request: config.data,
      },
      response: data,
      status: status,
    });
    Sentry.captureMessage(
      `[${status}] ${config.method?.toUpperCase()} ${config.url}`,
      status === 500 ? 'warning' : 'info',
    );
  });
};*/

