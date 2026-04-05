document.addEventListener("DOMContentLoaded", initDashboard);

async function initDashboard() {
  window.showLoadingState();

  try {
    const patients = await window.fetchPatients();
    const patient = patients.find((entry) => entry.name === window.AppConfig.TARGET_PATIENT);

    if (!patient) {
      throw new Error("Jessica Taylor was not found in the API response.");
    }

    window.renderDashboard(patient);
  } catch (error) {
    console.error(error);
    window.showErrorState(error);
  }
}
