export const fetchJSON = (endpoint, options) => fetch(endpoint, options)
  .then(response => {
    if (response.status.toString().startsWith('4') || response.status.toString().startsWith('5')) {
      throw Error(response.statusText);
    }

    return response.json();
  })
  .catch(error => {
    throw error;
  });
