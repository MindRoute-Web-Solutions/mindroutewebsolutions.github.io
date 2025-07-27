// script.js
// ===== FUNÇÕES PRINCIPAIS =====

// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
  // Suave scroll para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Observador para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animação de elementos
        entry.target.classList.add('animate');
        
        // Contadores na seção de stats
        if (entry.target.id === 'stats') {
          const counters = document.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elementos para observar
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Carrossel do portfólio
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.portfolio-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (carouselTrack && carouselItems.length > 0) {
    let currentIndex = 0;
    const itemWidth = carouselItems[0].offsetWidth + 
      parseInt(getComputedStyle(carouselItems[0]).marginRight);
    
    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  // Formulário de contato
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulação de envio
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Envia o formulário de verdade
      fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
      })
      .then(response => {
        if (response.ok) {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
          }, 1500);
        } else {
          throw new Error('Erro no envio');
        }
      })
      .catch(error => {
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
        }, 1500);
      });
    });
  }

  // Navbar scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Fecha outros itens
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Abre/fecha o item atual
        item.classList.toggle('active');
        
        // Acessibilidade
        const isExpanded = item.classList.contains('active');
        question.setAttribute('aria-expanded', isExpanded);
      });
      
      // Acessibilidade - teclado
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // Função para animar contadores
  function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
});