// script-responsive.js
document.addEventListener('DOMContentLoaded', function() {
  // Configuração do Swipe
  const carouselTrack = document.querySelector('.carousel-track');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!carouselTrack || portfolioItems.length === 0) return;

  let startX = 0;
  let currentX = 0;
  let currentIndex = 0;
  const itemWidth = portfolioItems[0].offsetWidth;
  const threshold = itemWidth / 3; // Sensibilidade adaptável

  // Controles Touch
  carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
  carouselTrack.addEventListener('touchmove', handleTouchMove, { passive: true });
  carouselTrack.addEventListener('touchend', handleTouchEnd);

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    currentX = startX;
    carouselTrack.style.transition = 'none'; // Remove transição durante o arrasto
  }

  function handleTouchMove(e) {
    if (!startX) return;
    const x = e.touches[0].clientX;
    const diff = x - currentX;
    currentX = x;
    carouselTrack.style.transform = `translateX(calc(-${currentIndex * itemWidth}px + ${x - startX}px))`;
  }

  function handleTouchEnd() {
    if (!startX) return;
    
    const diff = currentX - startX;
    const absDiff = Math.abs(diff);
    
    if (absDiff > threshold) {
      if (diff > 0 && currentIndex > 0) {
        currentIndex--; // Swipe para direita (voltar)
      } else if (diff < 0 && currentIndex < portfolioItems.length - 1) {
        currentIndex++; // Swipe para esquerda (avançar)
      }
    }
    
    updateCarousel();
    startX = 0;
  }

  function updateCarousel() {
    carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
});