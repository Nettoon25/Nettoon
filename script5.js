

// ======================= THEME TOGGLE =======================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const lightImg = document.getElementById("theme-toggle-light");
    const darkImg = document.getElementById("theme-toggle-dark");
  
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
  
    // Initialize from storage or system
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  
    themeToggle.addEventListener("change", toggleAndSave);
  
    // Fallback if icons fail
    function fallbackImage(imgEl, faClass) {
      if (!imgEl) return;
      imgEl.addEventListener("error", () => {
        const i = document.createElement("i");
        i.className = faClass;
        i.style.width = imgEl.style.width || "20px";
        i.style.height = imgEl.style.height || "20px";
        imgEl.replaceWith(i);
      });
      if (imgEl.complete && imgEl.naturalWidth === 0) {
        imgEl.dispatchEvent(new Event("error"));
      }
    }
    fallbackImage(lightImg, "fa-solid fa-sun");
    fallbackImage(darkImg, "fa-solid fa-moon");
  });
  
  
document.querySelector(".account-dropdown").onclick = function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    var dropdown = document.getElementById("accountDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.account-dropdown') && !event.target.closest('.account-dropdown')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
    }
};

function previewMovieVideo(event) {
    const file = event.target.files[0];
    if (file) {
        const videoUrl = URL.createObjectURL(file);

        // Show the preview container
        document.getElementById('previewContainer').style.display = 'flex';

        // Add video preview
        document.getElementById('previewContainer').innerHTML = `
            <video width="250" height="150" controls>
                <source src="${videoUrl}" type="${file.type}">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

function previewMovieThumbnail(event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);

        // Show the preview container
        document.getElementById('previewContainer').style.display = 'flex';

        // Append image preview without removing existing previews
        document.getElementById('previewContainer').innerHTML += `
            <img src="${imageUrl}" width="150" height="150" style="border-radius: 5px;">
        `;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const tagInput = document.getElementById("tagInput");
    const tagsContainer = document.getElementById("tags-container");
    let tags = []; // Store tags

    tagInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let tagText = tagInput.value.trim();
            
            if (tagText !== "" && !tags.includes(tagText)) {
                addTag(tagText);
            }
            
            tagInput.value = ""; // Clear input after adding
        }
    });

    function addTag(tagText) {
        if (tags.length >= 10) {
            alert("You can add a maximum of 10 tags.");
            return;
        }

        tags.push(tagText);
        
        let tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.innerHTML = `${tagText} <span class="remove-tag">&times;</span>`;
        
        tagElement.querySelector(".remove-tag").addEventListener("click", function() {
            removeTag(tagText, tagElement);
        });

        tagsContainer.insertBefore(tagElement, tagInput);
    }

    function removeTag(tagText, tagElement) {
        tags = tags.filter(tag => tag !== tagText);
        tagElement.remove();
    }
});


// Define country-language mapping
const countryLanguages = {
    "Kenya": ["English", "Swahili"],
    "Åland Islands": ["Swedish"],
    "Albania": ["Albanian"],
    "Algeria": ["Arabic"],
    "American Samoa": ["English", "Samoan"],
    "Andorra": ["Catalan"],
    "Angola": ["Portuguese"],
    "Argentina": ["Spanish"],
    "Armenia": ["Armenian"],
    "Australia": ["English"],
    "Austria": ["German"],
    "Azerbaijan": ["Azerbaijani"],
    "Bahamas": ["English"],
    "Bahrain": ["Arabic"],
    "Bangladesh": ["Bengali"],
    "Barbados": ["English"],
    "Belarus": ["Belarusian", "Russian"],
    "Belgium": ["Dutch", "French", "German"],
    "Belize": ["English"],
    "Benin": ["French"],
    "Bhutan": ["Dzongkha"],
    "Bolivia": ["Spanish", "Quechua", "Aymara"],
    "Botswana": ["English", "Setswana"],
    "Brazil": ["Portuguese"],
    "Brunei Darussalam": ["Malay"],
    "Bulgaria": ["Bulgarian"],
    "Burkina Faso": ["French"],
    "Burundi": ["Kirundi", "French"],
    "Cambodia": ["Khmer"],
    "Cameroon": ["English", "French"],
    "Canada": ["English", "French"],
    "Chile": ["Spanish"],
    "China": ["Mandarin"],
    "Colombia": ["Spanish"],
    "Congo": ["French"],
    "Croatia": ["Croatian"],
    "Cuba": ["Spanish"],
    "Cyprus": ["Greek", "Turkish"],
    "Czech Republic": ["Czech"],
    "Denmark": ["Danish"],
    "Djibouti": ["French", "Arabic"],
    "Dominican Republic": ["Spanish"],
    "Ecuador": ["Spanish"],
    "Egypt": ["Arabic"],
    "El Salvador": ["Spanish"],
    "Estonia": ["Estonian"],
    "Ethiopia": ["Amharic"],
    "Fiji": ["English", "Fijian", "Hindi"],
    "Finland": ["Finnish", "Swedish"],
    "France": ["French"],
    "Gabon": ["French"],
    "Gambia": ["English"],
    "Germany": ["German"],
    "Ghana": ["English"],
    "Greece": ["Greek"],
    "Guatemala": ["Spanish"],
    "Guinea": ["French"],
    "Haiti": ["French", "Haitian Creole"],
    "Honduras": ["Spanish"],
    "Hungary": ["Hungarian"],
    "Iceland": ["Icelandic"],
    "India": ["Hindi", "English"],
    "Indonesia": ["Indonesian"],
    "Iran": ["Persian"],
    "Iraq": ["Arabic", "Kurdish"],
    "Ireland": ["English", "Irish"],
    "Israel": ["Hebrew"],
    "Italy": ["Italian"],
    "Jamaica": ["English"],
    "Japan": ["Japanese"],
    "Jordan": ["Arabic"],
    "Kazakhstan": ["Kazakh", "Russian"],
    "Kuwait": ["Arabic"],
    "Lebanon": ["Arabic"],
    "Lesotho": ["English", "Sesotho"],
    "Liberia": ["English"],
    "Libya": ["Arabic"],
    "Luxembourg": ["Luxembourgish", "French", "German"],
    "Madagascar": ["Malagasy", "French"],
    "Malawi": ["English", "Chichewa"],
    "Malaysia": ["Malay"],
    "Malta": ["Maltese", "English"],
    "Mexico": ["Spanish"],
    "Mongolia": ["Mongolian"],
    "Morocco": ["Arabic", "Berber"],
    "Mozambique": ["Portuguese"],
    "Myanmar": ["Burmese"],
    "Namibia": ["English"],
    "Nepal": ["Nepali"],
    "Netherlands": ["Dutch"],
    "New Zealand": ["English", "Māori"],
    "Nicaragua": ["Spanish"],
    "Niger": ["French"],
    "Nigeria": ["English"],
    "North Korea": ["Korean"],
    "Norway": ["Norwegian"],
    "Oman": ["Arabic"],
    "Pakistan": ["Urdu", "English"],
    "Palestine": ["Arabic"],
    "Panama": ["Spanish"],
    "Papua New Guinea": ["English", "Tok Pisin", "Hiri Motu"],
    "Paraguay": ["Spanish", "Guarani"],
    "Peru": ["Spanish", "Quechua", "Aymara"],
    "Philippines": ["Filipino", "English"],
    "Poland": ["Polish"],
    "Portugal": ["Portuguese"],
    "Qatar": ["Arabic"],
    "Romania": ["Romanian"],
    "Russia": ["Russian"],
    "Rwanda": ["Kinyarwanda", "French", "English"],
    "Saudi Arabia": ["Arabic"],
    "Senegal": ["French"],
    "Serbia": ["Serbian"],
    "Sierra Leone": ["English"],
    "Singapore": ["English", "Malay", "Mandarin", "Tamil"],
    "Slovakia": ["Slovak"],
    "Slovenia": ["Slovenian"],
    "South Africa": ["Afrikaans", "English", "Zulu", "Xhosa", "Sesotho"],
    "South Korea": ["Korean"],
    "Spain": ["Spanish"],
    "Sri Lanka": ["Sinhala", "Tamil"],
    "Sudan": ["Arabic", "English"],
    "Sweden": ["Swedish"],
    "Switzerland": ["German", "French", "Italian", "Romansh"],
    "Syria": ["Arabic"],
    "Tanzania": ["Swahili", "English"],
    "Thailand": ["Thai"],
    "Tunisia": ["Arabic"],
    "Turkey": ["Turkish"],
    "Uganda": ["English", "Swahili"],
    "Ukraine": ["Ukrainian"],
    "United Arab Emirates": ["Arabic"],
    "United Kingdom": ["English"],
    "United States": ["English"],
    "Uruguay": ["Spanish"],
    "Venezuela": ["Spanish"],
    "Vietnam": ["Vietnamese"],
    "Yemen": ["Arabic"],
    "Zambia": ["English"],
    "Zimbabwe": ["English", "Shona", "Sindebele"]
};

// Function to update the language dropdown
function updateLanguages() {
    const countrySelect = document.getElementById("country");
    const languageSelect = document.getElementById("languages");

    // Get selected country
    const selectedCountry = countrySelect.value;

    // Get languages for the selected country
    const languages = countryLanguages[selectedCountry] || ["Unknown"];

    // Clear existing options
    languageSelect.innerHTML = "";

    // Populate new options
    languages.forEach(lang => {
        let option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        languageSelect.appendChild(option);
    });
}

// Attach event listener
document.getElementById("country").addEventListener("change", updateLanguages);

// Run once on page load
updateLanguages();


document.addEventListener("DOMContentLoaded", function () {
    const regionMode = document.getElementById("regionMode");
    const regionSelection = document.getElementById("regionSelection");
    const regionInput = document.getElementById("regions");
    const suggestionsList = document.getElementById("suggestions");
    const regionWarning = document.getElementById("regionWarning");
    const saveButton = document.querySelector("button");
    const resultMessage = document.getElementById("resultMessage");

    const countries = [
        "Kenya", "United States", "United Kingdom", "Canada", "India", "Germany", 
        "France", "Japan", "Australia", "China", "South Africa", "Brazil"
    ]; // Extend this list

    let selectedCountries = [];

    // Show/hide country selection based on mode
    regionMode.addEventListener("change", function () {
        if (this.value === "prioritize" || this.value === "block") {
            regionSelection.classList.remove("hidden");
            regionInput.value = "";
            selectedCountries = [];
            updateSelectedCountries();
        } else {
            regionSelection.classList.add("hidden");
            suggestionsList.classList.add("hidden");
        }
    });

    // Show country suggestions when typing
    regionInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        suggestionsList.innerHTML = "";

        if (!searchTerm) {
            suggestionsList.classList.add("hidden");
            return;
        }

        const filteredCountries = countries.filter(country => 
            country.toLowerCase().includes(searchTerm) && !selectedCountries.includes(country)
        );

        if (filteredCountries.length === 0) {
            suggestionsList.classList.add("hidden");
            return;
        }

        filteredCountries.forEach(country => {
            const li = document.createElement("li");
            li.textContent = country;
            li.addEventListener("click", function () {
                if (regionMode.value === "block" && selectedCountries.length >= 3) {
                    regionWarning.classList.remove("hidden");
                    return;
                }

                selectedCountries.push(country);
                updateSelectedCountries();
                regionInput.value = "";
                suggestionsList.classList.add("hidden");
            });
            suggestionsList.appendChild(li);
        });

        suggestionsList.classList.remove("hidden");
    });

    // Update selected countries inside input field
    function updateSelectedCountries() {
        regionInput.value = selectedCountries.join(", "); // Show inside input field
        regionWarning.classList.toggle("hidden", selectedCountries.length < 3);
    }

    // Save Preferences
    saveButton.addEventListener("click", function () {
        if (selectedCountries.length === 0) {
            resultMessage.textContent = "Please select at least one country.";
            resultMessage.style.color = "red";
        } else {
            resultMessage.textContent = `Preferences saved: ${selectedCountries.join(", ")}`;
            resultMessage.style.color = "green";
        }
    });
});


document.getElementById("createPlaylistBtn").addEventListener("click", function () {
    let playlistName = document.getElementById("newPlaylistName").value.trim();
    
    if (playlistName === "") {
        alert("Please enter a playlist name.");
        return;
    }

    let playlistsContainer = document.getElementById("playlists-container");

    // Create new playlist item
    let newPlaylist = document.createElement("div");
    newPlaylist.classList.add("playlist-item");

    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.classList.add("playlist-checkbox");
    newCheckbox.id = playlistName.toLowerCase().replace(/\s+/g, "-");

    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", newCheckbox.id);
    newLabel.textContent = playlistName;

    // Append new elements
    newPlaylist.appendChild(newCheckbox);
    newPlaylist.appendChild(newLabel);
    playlistsContainer.appendChild(newPlaylist);

    // Clear input field
    document.getElementById("newPlaylistName").value = "";
});




document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationContainer = document.getElementById("notification-container");
  
    notificationIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents click from propagating to document
      notificationContainer.classList.toggle("active");
    });
  
    // Close the notification when clicking outside
    document.addEventListener("click", function (event) {
      if (!notificationContainer.contains(event.target) && !notificationIcon.contains(event.target)) {
        notificationContainer.classList.remove("active");
      }
    });
  });
  
  


  function toggleRegionSelection() {
    let mode = document.getElementById("regionMode").value;
    let regionSelection = document.getElementById("regionSelection");

    if (mode === "prioritize" || mode === "block") {
        regionSelection.classList.remove("hidden");
    } else {
        regionSelection.classList.add("hidden");
    }
}

function showSuggestions() {
    let suggestions = document.getElementById("suggestions");
    let input = document.getElementById("regions").value.toLowerCase();
    let countryList = ["Kenya", "Nigeria", "South Africa", "USA", "UK", "India", "Brazil", "China", "Japan", "Germany"];
    
    suggestions.innerHTML = ""; // Clear previous suggestions

    countryList.forEach(country => {
        if (country.toLowerCase().includes(input) && input.length > 0) {
            let li = document.createElement("li");
            li.textContent = country;
            li.onclick = function () {
                document.getElementById("regions").value = country;
                suggestions.classList.add("hidden"); // Hide dropdown after selection
            };
            suggestions.appendChild(li);
        }
    });

    if (input.length > 0) {
        suggestions.classList.remove("hidden");
    } else {
        suggestions.classList.add("hidden");
    }
}