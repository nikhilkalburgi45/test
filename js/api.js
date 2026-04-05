import { API_URL, AUTH_CREDENTIALS } from "./config.js";

export async function fetchPatients() {
  const encodedCredentials = btoa(AUTH_CREDENTIALS);

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return response.json();
}
