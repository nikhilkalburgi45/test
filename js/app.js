import { TARGET_PATIENT } from "./config.js";
import { fetchPatients } from "./api.js";
import { renderDashboard, showErrorState, showLoadingState } from "./ui.js";

document.addEventListener("DOMContentLoaded", initDashboard);

async function initDashboard() {
  showLoadingState();

  try {
    const patients = await fetchPatients();
    const patient = patients.find((entry) => entry.name === TARGET_PATIENT);

    if (!patient) {
      throw new Error("Jessica Taylor was not found in the API response.");
    }

    renderDashboard(patient);
  } catch (error) {
    console.error(error);
    showErrorState(error);
  }
}
