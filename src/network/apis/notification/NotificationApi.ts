import HostConfig from 'network/HostConfig';

class NotificationApi {
  registerNotification = <T>(tokens: string[]) => {
    return fetch(
      `${
        HostConfig.BASE_URL + HostConfig.PREFIX
      }/firebase/messaging/verifyTokens`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tokens}),
      },
    ).then(res => res.json());
  };
}

export default new NotificationApi();
