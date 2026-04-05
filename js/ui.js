const patientListElement = document.getElementById("patientsList");
const diagnosticListBody = document.getElementById("diagnosticListBody");
const labResultsList = document.getElementById("labResultsList");
const patientItemTemplate = document.getElementById("patientItemTemplate");

function showLoadingState() {
  patientListElement.innerHTML = '<div class="loading-state">Loading patient...</div>';
  diagnosticListBody.innerHTML = '<tr><td colspan="3" class="loading-state">Loading diagnostic list...</td></tr>';
  labResultsList.innerHTML = '<div class="loading-state">Loading lab results...</div>';
}

function showErrorState(error) {
  const message = error.message || "Something went wrong while loading the dashboard.";

  patientListElement.innerHTML = `<div class="error-state">${message}</div>`;
  diagnosticListBody.innerHTML = `<tr><td colspan="3" class="error-state">${message}</td></tr>`;
  labResultsList.innerHTML = `<div class="error-state">${message}</div>`;
}

function renderDashboard(patient) {
  renderPatientList(patient);
  renderProfile(patient);
  renderDiagnosisHistory(patient.diagnosis_history || []);
  renderDiagnosticTable(patient.diagnostic_list || []);
  renderLabResults(patient.lab_results || []);
}

function renderPatientList(patient) {
  patientListElement.innerHTML = "";

  const patientNode = patientItemTemplate.content.firstElementChild.cloneNode(true);
  const image = patientNode.querySelector(".patient-item__image");
  const name = patientNode.querySelector("strong");
  const details = patientNode.querySelector("span");

  image.src = patient.profile_picture;
  image.alt = `${patient.name} profile picture`;
  name.textContent = patient.name;
  details.textContent = `${patient.gender}, ${patient.age}`;

  patientNode.classList.add("active");
  patientListElement.appendChild(patientNode);
}

function renderProfile(patient) {
  setText("patientName", patient.name);
  setText("birthDate", formatDate(patient.date_of_birth));
  setText("gender", patient.gender);
  setText("phoneNumber", patient.phone_number);
  setText("emergencyContact", patient.emergency_contact);
  setText("insuranceType", patient.insurance_type);

  const profilePicture = document.getElementById("profilePicture");
  profilePicture.src = patient.profile_picture;
  profilePicture.alt = `${patient.name} profile picture`;
}

function renderDiagnosisHistory(history) {
  const latestSixMonths = history.slice(0, 6);
  const chartHistory = [...latestSixMonths].reverse();
  const latestRecord = latestSixMonths[0];

  if (!latestRecord) {
    return;
  }

  setText("systolicValue", latestRecord.blood_pressure?.systolic?.value ?? "--");
  setStatusText("systolicStatus", latestRecord.blood_pressure?.systolic?.levels ?? "--");
  setText("diastolicValue", latestRecord.blood_pressure?.diastolic?.value ?? "--");
  setStatusText("diastolicStatus", latestRecord.blood_pressure?.diastolic?.levels ?? "--");

  setText("respiratoryRateValue", `${latestRecord.respiratory_rate?.value ?? "--"} bpm`);
  setStatusText("respiratoryRateStatus", latestRecord.respiratory_rate?.levels ?? "--");

  setText("temperatureValue", `${latestRecord.temperature?.value ?? "--"}${String.fromCharCode(176)}F`);
  setStatusText("temperatureStatus", latestRecord.temperature?.levels ?? "--");

  setText("heartRateValue", `${latestRecord.heart_rate?.value ?? "--"} bpm`);
  setStatusText("heartRateStatus", latestRecord.heart_rate?.levels ?? "--");

  drawBloodPressureChart(chartHistory);
}

function renderDiagnosticTable(items) {
  diagnosticListBody.innerHTML = "";

  if (!items.length) {
    diagnosticListBody.innerHTML = '<tr><td colspan="3">No diagnostic records available.</td></tr>';
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.description}</td>
      <td>${item.status}</td>
    `;

    diagnosticListBody.appendChild(row);
  });
}

function renderLabResults(items) {
  labResultsList.innerHTML = "";

  if (!items.length) {
    labResultsList.innerHTML = '<p class="loading-state">No lab results available.</p>';
    return;
  }

  items.forEach((item) => {
    const labRow = document.createElement("div");
    labRow.className = "lab-item";
    labRow.innerHTML = `
      <span class="lab-name">${item}</span>
      <img src="assets/download_icon.svg" alt="" class="lab-download">
    `;

    labResultsList.appendChild(labRow);
  });
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function setStatusText(id, value) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  element.classList.remove("status-up", "status-down", "status-neutral");

  const normalizedValue = String(value).toLowerCase();
  let arrowIcon = "";

  if (normalizedValue.includes("higher")) {
    element.classList.add("status-up");
    arrowIcon = '<img src="assets/ArrowUp.svg" alt="" class="trend-arrow">';
  } else if (normalizedValue.includes("lower")) {
    element.classList.add("status-down");
    arrowIcon = '<img src="assets/ArrowDown.svg" alt="" class="trend-arrow">';
  } else {
    element.classList.add("status-neutral");
  }

  element.innerHTML = `${arrowIcon}<span>${value}</span>`;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

window.showLoadingState = showLoadingState;
window.showErrorState = showErrorState;
window.renderDashboard = renderDashboard;
