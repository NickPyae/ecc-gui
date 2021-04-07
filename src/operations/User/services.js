const HZN_EXCHANGE_API_ENDPOINT = process.env.REACT_APP_EXCHANGE_API_ENDPOINT;
const HZN_ORGANIZATION = process.env.REACT_APP_ORGANIZATION;
const HZN_EXCHANGE_API_USER_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/users`;

export function loginUser({ username = '', password = '' }) {
  const token = btoa(`${HZN_ORGANIZATION}/${username}:${password}`);
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return fetch(`${HZN_EXCHANGE_API_USER_ENDPOINT}/${username}/confirm`, options)
    .then(response => {
      if (response.status !== 201 || response.statusText !== 'Created') {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(() => token)
    .catch(error => {
      throw error;
    });
}

export function logoutUser() {
  sessionStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
  window.location.reload();
}

export function getToken() {
  const tokenString = sessionStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
  const token = JSON.parse(tokenString);
  return token;
}

export function setToken(token) {
  sessionStorage.setItem(process.env.REACT_APP_TOKEN_KEY, JSON.stringify(token));
}
