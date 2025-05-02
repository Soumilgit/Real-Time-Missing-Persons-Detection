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

// Form validation functions (unchanged)
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
  
  if (input.value && !/^9[0-9]{9}$/.test(input.value)) {
    errorElement.classList.remove('hidden');
    return false;
  } else {
    errorElement.classList.add('hidden');
    return true;
  }
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

function validateForm() {
  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isLocationValid = validateLocation();
  const isDateValid = validateDate();
  
  // Only validate email if it's not empty
  const emailInput = document.getElementById('reporterEmail');
  const isEmailValid = emailInput.value.trim() === '' || validateEmail();
  
  return isNameValid && isEmailValid && isPhoneValid && 
         isLocationValid && isDateValid;
}
// Event listeners for real-time validation
document.getElementById('reporterName').addEventListener('input', validateName);
document.getElementById('reporterEmail').addEventListener('input', function() {
  const input = document.getElementById('reporterEmail');
  const errorElement = document.getElementById('emailError');
  
  // Clear error if field is empty
  if (input.value.trim() === '') {
    errorElement.classList.add('hidden');
    return;
  }
  
  // Otherwise validate normally
  validateEmail();
});
document.getElementById('reporterPhone').addEventListener('input', validatePhone);
document.getElementById('location').addEventListener('input', validateLocation);
document.getElementById('dateSeen').addEventListener('change', validateDate);

// Form submission handler - modified to not include file upload
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

// Image preview and analysis functions (unchanged)
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
  
  if (!validateImage()) {
    resultDiv.innerHTML = '<p class="text-red-500 bg-red-100 p-2 rounded">Please upload a valid image first.</p>';
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