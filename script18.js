// =========================
// AUTO SAVE SOCIAL HANDLES
// =========================

const socialInputs = document.querySelectorAll("#socialMediaForm input");
const savedContainer = document.getElementById("savedSocialContainer");
const savedList = document.getElementById("savedSocialList");

// Load existing saved data
window.addEventListener("DOMContentLoaded", () => {
  socialInputs.forEach(input => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      input.value = savedValue;
    }
  });
  updateSavedHandles();
});

// Auto-save on input
socialInputs.forEach(input => {
  input.addEventListener("input", () => {
    localStorage.setItem(input.id, input.value);
    updateSavedHandles();
  });
});

function updateSavedHandles() {
  savedList.innerHTML = "";

  socialInputs.forEach(input => {
    const value = localStorage.getItem(input.id);

    if (value && value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${input.previousElementSibling ? input.previousElementSibling.textContent : input.id}: ${value}`;
      savedList.appendChild(li);
    }
  });

  const hasData = [...socialInputs].some(input => localStorage.getItem(input.id)?.trim());
  
  if (hasData) {
    savedContainer.classList.add("show");
    savedContainer.classList.remove("hidden");
  } else {
    savedContainer.classList.remove("show");
  }
}