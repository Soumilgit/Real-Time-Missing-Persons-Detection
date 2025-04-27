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