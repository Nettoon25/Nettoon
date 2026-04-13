// ======================= SIDEBAR NAVIGATION =======================
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active state
      menuItems.forEach(i => i.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      // Add active state
      item.classList.add("active");
      const target = document.getElementById(item.dataset.target);
      if (target) target.classList.add("active");
    });
  });
});

// ======================= THEME TOGGLE =======================
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  function setTheme(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      themeToggle.checked = true;
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      themeToggle.checked = false;
    }
  }

  function toggleAndSave() {
    const newMode = themeToggle.checked ? "dark" : "light";
    setTheme(newMode);
    localStorage.setItem("theme", newMode);
  }

  // ====== ALWAYS DEFAULT TO LIGHT MODE ======
  const stored = localStorage.getItem("theme");
  if (stored) {
    // Apply the saved preference
    setTheme(stored);
  } else {
    // First time visitor → ALWAYS LIGHT MODE
    setTheme("light");
  }

  themeToggle.addEventListener("change", toggleAndSave);
});


// ======================= ACCOUNT DROPDOWN =======================
document.querySelector(".account-dropdown").onclick = function(event) {
  event.preventDefault();
  var dropdown = document.getElementById("accountDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
};
window.onclick = function(event) {
  if (!event.target.matches(".account-dropdown") && !event.target.closest(".account-dropdown")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) dropdowns[i].style.display = "none";
  }
};


// ======================= NOTIFICATIONS PANEL =======================
document.addEventListener("DOMContentLoaded", () => {
  const notificationIcon = document.getElementById("notification-icon");
  const notificationContainer = document.getElementById("notification-container");

  notificationIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    notificationContainer.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!notificationContainer.contains(event.target) && !notificationIcon.contains(event.target)) {
      notificationContainer.classList.remove("active");
    }
  });
});


document.querySelectorAll('.optionnn').forEach(option => {
  const trigger = option.querySelector('.optionTrigger');
  const menu = option.querySelector('.popup-options');

  trigger.addEventListener('click', e => {
    e.stopPropagation();

    // 🔥 Close all other open popups first
    document.querySelectorAll('.popup-options.show').forEach(openMenu => {
      if (openMenu !== menu) {
        openMenu.classList.remove('show');
      }
    });

    // Toggle current menu
    menu.classList.toggle('show');
  });

  // Prevent clicks inside menu from closing it
  menu.addEventListener('click', e => {
    e.stopPropagation();
  });
});

// Close when clicking anywhere else
document.addEventListener('click', () => {
  document.querySelectorAll('.popup-options').forEach(menu => {
    menu.classList.remove('show');
  });
});





// ================= PROFILE PICTURE =================
const profilePicInput = document.getElementById("profilePic");
const profilePicPreview = document.getElementById("profilePicPreview");
const resetPic = document.getElementById("resetPic");

const defaultProfilePic = "14.png";

resetPic.hidden = true;

// Open file picker when image OR icon is clicked
profilePicPreview.addEventListener("click", () => profilePicInput.click());

profilePicInput.addEventListener("change", () => {
  const file = profilePicInput.files[0];
  if (!file) return;

  profilePicPreview.src = URL.createObjectURL(file);
  profilePicPreview.classList.remove("placeholder");
  resetPic.hidden = false;
});

// Reset
resetPic.addEventListener("click", () => {
  profilePicPreview.src = defaultProfilePic;
  profilePicPreview.classList.add("placeholder");
  profilePicInput.value = ""; // allows re-upload of same file
  resetPic.hidden = true;
});





// ================= BANNER =================
const bannerInput = document.getElementById("profileBanner");
const bannerPreview = document.getElementById("bannerPreview");
const resetBanner = document.getElementById("resetBanner");

const defaultBanner =
  "WhatsApp Image 2025-10-11 at 09.56.10_ccb1dc99.jpg";

resetBanner.hidden = true;

// Click image OR icon
bannerPreview.addEventListener("click", () => bannerInput.click());

bannerInput.addEventListener("change", () => {
  const file = bannerInput.files[0];
  if (!file) return;

  bannerPreview.src = URL.createObjectURL(file);
  bannerPreview.classList.remove("placeholder");
  resetBanner.hidden = false;
});

// Reset banner
resetBanner.addEventListener("click", () => {
  bannerPreview.src = defaultBanner;
  bannerPreview.classList.add("placeholder");
  bannerInput.value = "";
  resetBanner.hidden = true;
});



// ======================= ACCOUNT SETTINGS =======================// ======================= PASSWORD MATCH CHECK =======================
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const passwordMatchMessage = document.getElementById("passwordMatchMessage");

function checkPasswordMatch() {
  if (newPassword.value && confirmNewPassword.value) {
    if (newPassword.value === confirmNewPassword.value) {
      passwordMatchMessage.textContent = "✅ Passwords match";
      passwordMatchMessage.style.color = "green";
    } else {
      passwordMatchMessage.textContent = "❌ Passwords do not match";
      passwordMatchMessage.style.color = "red";
    }
  } else {
    passwordMatchMessage.textContent = "";
  }
}

newPassword.addEventListener("input", checkPasswordMatch);
confirmNewPassword.addEventListener("input", checkPasswordMatch);

// ======================= PASSWORD VISIBILITY TOGGLE =======================
document.querySelectorAll(".toggle-password").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);
    const icon = button.querySelector("i");

    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});

// ======================= FORM SUBMIT =======================
document.getElementById("accountForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Account settings saved!");
});



// ======================= NOTIFICATION SETTINGS =======================
document.getElementById("notificationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const settings = {
    emailEpisodes: document.getElementById("emailEpisodes").checked,
    emailComments: document.getElementById("emailComments").checked,
    pushTrending: document.getElementById("pushTrending").checked,
    pushRecommendations: document.getElementById("pushRecommendations").checked,
    systemAlerts: document.getElementById("systemAlerts").checked,
    specialOffers: document.getElementById("specialOffers").checked,
  };
  localStorage.setItem("notificationSettings", JSON.stringify(settings));
  alert("✅ Notification preferences saved!");
});
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("notificationSettings"));
  if (saved) {
    document.getElementById("emailEpisodes").checked = saved.emailEpisodes;
    document.getElementById("emailComments").checked = saved.emailComments;
    document.getElementById("pushTrending").checked = saved.pushTrending;
    document.getElementById("pushRecommendations").checked = saved.pushRecommendations;
    document.getElementById("systemAlerts").checked = saved.systemAlerts;
    document.getElementById("specialOffers").checked = saved.specialOffers;
  }
});


// ======================= PRIVACY SETTINGS =======================
document.getElementById("privacyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const settings = {
    profileVisibility: document.getElementById("profileVisibility").value,
    searchVisibility: document.getElementById("searchVisibility").checked,
    shareActivity: document.getElementById("shareActivity").checked,
    personalizedAds: document.getElementById("personalizedAds").checked,
    blockedUsers: Array.from(document.querySelectorAll("#blockedUsersList li span"))
      .map(li => li.textContent)
  };
  localStorage.setItem("privacySettings", JSON.stringify(settings));
  alert("🔒 Privacy preferences updated!");
});

// Block/Unblock
const blockedUsersList = document.getElementById("blockedUsersList");
document.getElementById("blockUserBtn").addEventListener("click", () => {
  const username = document.getElementById("blockUserInput").value.trim();
  if (username) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${username}</span> <button onclick="unblockUser(this)">Unblock</button>`;
    blockedUsersList.appendChild(li);
    document.getElementById("blockUserInput").value = "";
  }
});
function unblockUser(btn) { btn.parentElement.remove(); }

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("privacySettings"));
  if (saved) {
    document.getElementById("profileVisibility").value = saved.profileVisibility;
    document.getElementById("searchVisibility").checked = saved.searchVisibility;
    document.getElementById("shareActivity").checked = saved.shareActivity;
    document.getElementById("personalizedAds").checked = saved.personalizedAds;
    saved.blockedUsers.forEach(username => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${username}</span> <button onclick="unblockUser(this)">Unblock</button>`;
      blockedUsersList.appendChild(li);
    });
  }
});


// Elements
const paymentMethodsList = document.getElementById("paymentMethodsList");
const transactionsBody = document.getElementById("transactionsBody");
const addPaymentModal = document.getElementById("addPaymentModal");
const addPaymentBtn = document.getElementById("addPaymentBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveCardBtn = document.getElementById("saveCardBtn");

// Open modal
addPaymentBtn.addEventListener("click", () => {
  addPaymentModal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  addPaymentModal.classList.add("hidden");
});

// Save card
saveCardBtn.addEventListener("click", () => {
  const cardNumber = document.getElementById("cardNumber").value;
  const cardHolder = document.getElementById("cardHolder").value;

  if (cardNumber && cardHolder) {
    const masked = "•••• •••• •••• " + cardNumber.slice(-4);
    const li = document.createElement("li");
    li.innerHTML = `<span>${masked} - ${cardHolder}</span> 
      <button onclick="removeCard(this)">Remove</button>`;
    paymentMethodsList.appendChild(li);

    addPaymentModal.classList.add("hidden");
    document.getElementById("cardNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("cvv").value = "";
    document.getElementById("cardHolder").value = "";
  }
});

// Remove card
function removeCard(btn) {
  btn.parentElement.remove();
}

// Load transactions (dummy data)
const transactions = [
  { date: "2025-09-01", plan: "Premium", amount: "$9.99", status: "Paid" },
  { date: "2025-08-01", plan: "Premium", amount: "$9.99", status: "Paid" },
  { date: "2025-07-01", plan: "Premium", amount: "$9.99", status: "Paid" }
];

transactions.forEach(tx => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${tx.date}</td>
    <td>${tx.plan}</td>
    <td>${tx.amount}</td>
    <td>${tx.status}</td>
  `;
  transactionsBody.appendChild(tr);
});

// Save billing info + methods
document.getElementById("paymentsForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const billingAddress = document.getElementById("billingAddress").value;
  const paymentMethods = Array.from(document.querySelectorAll("#paymentMethodsList li span"))
    .map(li => li.textContent);

  const settings = {
    billingAddress,
    paymentMethods
  };

  console.log("Saved Payments Settings:", settings);
  localStorage.setItem("paymentsSettings", JSON.stringify(settings));

  alert("💳 Payment preferences updated!");
});

// Load saved preferences
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("paymentsSettings"));
  if (saved) {
    document.getElementById("billingAddress").value = saved.billingAddress;
    saved.paymentMethods.forEach(method => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${method}</span> 
        <button onclick="removeCard(this)">Remove</button>`;
      paymentMethodsList.appendChild(li);
    });
  }
});


// Elements
const planCards = document.querySelectorAll(".plan-card");
const currentPlan = document.getElementById("currentPlan");
const cancelSubscriptionBtn = document.getElementById("cancelSubscriptionBtn");
const subscriptionForm = document.getElementById("subscriptionForm");

// Select Plan
planCards.forEach(card => {
  card.querySelector(".select-plan-btn").addEventListener("click", () => {
    const plan = card.dataset.plan;
    const price = card.dataset.price;
    currentPlan.textContent = `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - $${price} / mo`;

    localStorage.setItem("currentPlan", JSON.stringify({ plan, price }));
    alert(`✅ You have selected the ${plan} plan!`);
  });
});

// Cancel Subscription
cancelSubscriptionBtn.addEventListener("click", () => {
  if (confirm("⚠ Are you sure you want to cancel your subscription?")) {
    currentPlan.textContent = "No Active Subscription";
    localStorage.removeItem("currentPlan");
    alert("Your subscription has been canceled.");
  }
});

// Save Preferences
subscriptionForm.addEventListener("submit", e => {
  e.preventDefault();

  const autoRenew = document.getElementById("autoRenew").checked;
  localStorage.setItem("autoRenew", autoRenew);

  alert("💾 Subscription settings saved!");
});

// Load Preferences
window.addEventListener("DOMContentLoaded", () => {
  const savedPlan = JSON.parse(localStorage.getItem("currentPlan"));
  const autoRenew = localStorage.getItem("autoRenew") === "true";

  if (savedPlan) {
    currentPlan.textContent = `${savedPlan.plan.charAt(0).toUpperCase() + savedPlan.plan.slice(1)} Plan - $${savedPlan.price} / mo`;
  }

  document.getElementById("autoRenew").checked = autoRenew;
});



// ======================= DELETE ACCOUNT =======================
// ... (kept as-is, already clean)


document.getElementById('themeToggle').addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
});


const deleteForm = document.getElementById("deleteForm");
const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");

deleteForm.addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  const password = document.getElementById("deletePassword").value;
  const confirmed = document.getElementById("deleteConfirm").checked;

  // Basic validation
  if (!password) {
    alert("Please enter your password.");
    return;
  }

  if (!confirmed) {
    alert("Please confirm that you understand the consequences.");
    return;
  }

  // 👉 Simulate delete success (you'll replace with backend later)
  successModal.style.display = "flex";
});

// Close modal
closeSuccessModal.addEventListener("click", () => {
  successModal.style.display = "none";

  // OPTIONAL: redirect after delete
  // window.location.href = "/goodbye.html";
});


// FONT SIZE HANDLER
document.getElementById("saveDisplay").addEventListener("click", function () {
  const fontSizeChoice = document.getElementById("fontSize").value;

  applyFontSize(fontSizeChoice);
  localStorage.setItem("fontSizeChoice", fontSizeChoice); // save choice

  alert("Font size updated across all pages!");
});

// Apply font size function
function applyFontSize(choice) {
  switch (choice) {
    case "small":
      document.documentElement.style.setProperty("--font-size-base", "0.875rem");
      document.documentElement.style.setProperty("--font-size-heading", "2rem");
      break;
    case "medium":
      document.documentElement.style.setProperty("--font-size-base", "1rem");
      document.documentElement.style.setProperty("--font-size-heading", "2.5rem");
      break;
    case "large":
      document.documentElement.style.setProperty("--font-size-base", "1.125rem");
      document.documentElement.style.setProperty("--font-size-heading", "3rem");
      break;
  }
}

// Reapply saved font size on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedFontSize = localStorage.getItem("fontSizeChoice") || "medium";
  document.getElementById("fontSize").value = savedFontSize;
  applyFontSize(savedFontSize);
});
