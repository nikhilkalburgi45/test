async function fetchPatients() {
  const encodedCredentials = btoa(window.AppConfig.AUTH_CREDENTIALS);

  const response = await fetch(window.AppConfig.API_URL, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return response.json();
}

window.fetchPatients = fetchPatients;
