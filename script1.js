

let currentSlide = 0;
    const totalSlides = document.querySelectorAll("#carousel > div").length;

    function showSlide() {
      const carousel = document.getElementById('carousel');
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function next() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide();
    }

    function prev() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide();
    }
    function logout() {
      localStorage.removeItem('loggedIn');
      window.location.href = 'login.html';
    }
    
    document.addEventListener('DOMContentLoaded', function () {
      if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
      }
    
      const navbar = document.getElementById('navbar');
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'Logout';
      logoutBtn.className = 'hover:text-green-600';
      logoutBtn.onclick = logout;
      navbar.appendChild(logoutBtn);
    
      const mobileLogout = document.getElementById('mobileLogout');
      if (mobileLogout) {
        mobileLogout.classList.remove('hidden');
        mobileLogout.onclick = logout;
      }
    });
      
