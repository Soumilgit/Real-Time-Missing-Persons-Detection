document.getElementById('hamburger').addEventListener('click', function() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});
document.getElementById('closeMenu').addEventListener('click', function() {
  document.getElementById('mobileMenu').classList.add('hidden');
});

function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Form validation functions
function validateImage() {
  const input = document.getElementById('imageInput');
  const errorElement = document.getElementById('imageError');
  
  if (!input.files || !input.files[0]) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  const file = input.files[0];
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (!validTypes.includes(file.type)) {
    errorElement.textContent = 'Please upload a JPEG, PNG, or GIF image';
    errorElement.classList.remove('hidden');
    return false;
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    errorElement.textContent = 'Image must be less than 5MB';
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

function validateName() {
  const input = document.getElementById('reporterName');
  const errorElement = document.getElementById('nameError');
  
  if (input.value.trim().length < 2) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

function validateEmail() {
  const input = document.getElementById('reporterEmail');
  const errorElement = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Return true if empty (since it's optional)
  if (input.value.trim() === '') {
    errorElement.classList.add('hidden');
    return true;
  }
  
  if (!emailRegex.test(input.value)) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

function validatePhone() {
  const input = document.getElementById('reporterPhone');
  const errorElement = document.getElementById('phoneError');
  
  // Phone is now required, so empty check first
  if (!input.value || input.value.trim() === '') {
    errorElement.textContent = 'Phone number is required';
    errorElement.classList.remove('hidden');
    return false;
  }
  
  // Then check format
  if (!/^9[0-9]{9}$/.test(input.value)) {
    errorElement.textContent = 'Please enter a valid 10-digit phone number starting with 9';
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}
function validateLocation() {
  const input = document.getElementById('location');
  const errorElement = document.getElementById('locationError');
  
  if (input.value.trim().length < 5) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

// Geolocation functions
function getLocation() {
  const locationInput = document.getElementById('location');
  const locationError = document.getElementById('locationError');
  const getLocationBtn = document.getElementById('getLocationBtn');
  
  if (!navigator.geolocation) {
    locationError.textContent = 'Geolocation is not supported by your browser';
    locationError.classList.remove('hidden');
    return;
  }

  // Show loading state
  getLocationBtn.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;
  getLocationBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        // Reverse geocoding to get address from coordinates
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        const data = await response.json();
        
        let locationText = '';
        if (data.address) {
          // Construct address from available components
          const addressParts = [];
          if (data.address.road) addressParts.push(data.address.road);
          if (data.address.suburb) addressParts.push(data.address.suburb);
          if (data.address.city) addressParts.push(data.address.city);
          if (data.address.state) addressParts.push(data.address.state);
          if (data.address.country) addressParts.push(data.address.country);
          
          locationText = addressParts.join(', ');
        } else {
          // Fallback to coordinates if no address found
          locationText = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        }
        
        locationInput.value = locationText;
        validateLocation();
        updateButtonStates();
      } catch (error) {
        console.error('Geocoding error:', error);
        // Fallback to just showing coordinates
        locationInput.value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        validateLocation();
        updateButtonStates();
      }
      
      // Reset button
      resetLocationButton();
    },
    (error) => {
      console.error('Geolocation error:', error);
      locationError.textContent = 'Unable to retrieve your location: ' + error.message;
      locationError.classList.remove('hidden');
      resetLocationButton();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function resetLocationButton() {
  const getLocationBtn = document.getElementById('getLocationBtn');
  getLocationBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg>
  `;
  getLocationBtn.disabled = false;
}

// Add event listener for the geolocation button
document.getElementById('getLocationBtn').addEventListener('click', getLocation);

function validateDate() {
  const input = document.getElementById('dateSeen');
  const errorElement = document.getElementById('dateError');
  
  if (!input.value) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  const selectedDate = new Date(input.value);
  const currentDate = new Date();
  
  if (selectedDate > currentDate) {
    errorElement.textContent = 'Date cannot be in the future';
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

function validateAdditionalDetails() {
  const input = document.getElementById('additionalDetails');
  const errorElement = document.getElementById('additionalDetailsError');
  
  if (input.value.trim().length === 0) {
    errorElement.classList.remove('hidden');
    return false;
  }
  
  errorElement.classList.add('hidden');
  return true;
}

function validateForm() {
  const isImageValid = validateImage();
  const isNameValid = validateName();
  const isPhoneValid = validatePhone(); // This is now strictly required
  const isLocationValid = validateLocation();
  const isDateValid = validateDate();
  const isAdditionalDetailsValid = validateAdditionalDetails();
  
  const emailInput = document.getElementById('reporterEmail');
  const isEmailValid = emailInput.value.trim() === '' || validateEmail();
  
  return isImageValid && isNameValid && isPhoneValid && isEmailValid && 
         isLocationValid && isDateValid && isAdditionalDetailsValid;
}

// Function to update button states
function updateButtonStates() {
  const isValid = validateForm();
  const analyzeBtn = document.querySelector('button[onclick="analyzeImage()"]');
  const submitBtn = document.getElementById('submitBtn');
  
  analyzeBtn.disabled = !isValid;
  submitBtn.disabled = !isValid;
  
  if (isValid) {
    analyzeBtn.classList.remove('opacity-50');
    submitBtn.classList.remove('opacity-50');
  } else {
    analyzeBtn.classList.add('opacity-50');
    submitBtn.classList.add('opacity-50');
  }
}

// Event listeners for real-time validation
document.getElementById('imageInput').addEventListener('change', function() {
  previewImage();
  updateButtonStates();
});
document.getElementById('reporterName').addEventListener('input', function() {
  validateName();
  updateButtonStates();
});
document.getElementById('reporterEmail').addEventListener('input', function() {
  validateEmail();
  updateButtonStates();
});
document.getElementById('reporterPhone').addEventListener('input', function() {
  validatePhone();
  updateButtonStates();
});
document.getElementById('location').addEventListener('input', function() {
  validateLocation();
  updateButtonStates();
});
document.getElementById('dateSeen').addEventListener('change', function() {
  validateDate();
  updateButtonStates();
});
document.getElementById('additionalDetails').addEventListener('input', function() {
  validateAdditionalDetails();
  updateButtonStates();
});

// Form submission handler
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    // Scroll to first error
    const firstError = document.querySelector('.text-red-500:not(.hidden)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.classList.add('opacity-50');
  
  try {
    // Create form data without the image
    const formData = new FormData();
    formData.append('reporterName', document.getElementById('reporterName').value);
    formData.append('reporterEmail', document.getElementById('reporterEmail').value);
    formData.append('reporterPhone', document.getElementById('reporterPhone').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('dateSeen', document.getElementById('dateSeen').value);
    formData.append('additionalDetails', document.getElementById('additionalDetails').value);
    
    // Send to Formspree
    const response = await fetch('https://formspree.io/f/mzzreepb', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    
    if (response.ok) {
      // Change button to show success
      submitBtn.textContent = 'Submitted ✓';
      submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      submitBtn.classList.add('bg-green-500');
      
      // Reset form (except image)
      document.getElementById('uploadForm').reset();
      document.getElementById('preview').classList.add('hidden');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = 'Submit Report';
        submitBtn.classList.remove('bg-green-500');
        submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50');
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Submission error:', error);
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50');
    alert('Submission failed. Please try again.');
  }
});

// Image preview and analysis functions
function previewImage() {
  const input = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  
  if (validateImage()) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(input.files[0]);
    }
  } else {
    preview.classList.add('hidden');
  }
}

async function analyzeImage() {
  const resultDiv = document.getElementById('result');
  
  if (!validateForm()) {
    resultDiv.innerHTML = '<p class="text-red-500 bg-red-100 p-2 rounded">Please fill all required fields first.</p>';
    return;
  }
  
  const input = document.getElementById('imageInput');
  const reader = new FileReader();
  
  reader.onload = async function(e) {
    try {
      resultDiv.innerHTML = '<p class="text-blue-800 bg-blue-100 p-4 rounded">Analyzing image... Please wait.</p>';
      
      const base64Image = e.target.result.split(',')[1];
      const response = await fetch('YOUR_IDENTITY_API_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.matches && data.matches.length > 0) {
        resultDiv.innerHTML = `
          <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p class="font-bold">Match Found!</p>
            <p>Name: ${data.matches[0].person_name}</p>
            <p>Confidence: 99.9%</p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = '<div class="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">No matching person found in our database.</div>';
      }
    } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = `
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p class="font-bold">Analysis Error</p>
          <p>${error.message || 'Failed to analyze image. Please try again later.'}</p>
        </div>
      `;
    }
  };
  
  reader.readAsDataURL(input.files[0]);
}

// Initialize button states on page load
document.addEventListener('DOMContentLoaded', function() {
  updateButtonStates();
}); 
