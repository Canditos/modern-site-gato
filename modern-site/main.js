import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  
  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navContainer = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navContainer.classList.toggle('mobile-active');
      document.body.style.overflow = navContainer.classList.contains('mobile-active') ? 'hidden' : '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navContainer.classList.remove('mobile-active');
      document.body.style.overflow = '';
    });
  });

  // Instagram Feed Logic
  const instaGrid = document.getElementById('insta-feed');
  if (instaGrid) {
    fetch('https://feeds.behold.so/qp0v4rwzcjNHNy0krpGQ')
      .then(response => response.json())
      .then(data => {
        instaGrid.innerHTML = ''; // Clear loader
        // Take last 4 posts
        const posts = data.posts.slice(0, 4);
        
        posts.forEach(post => {
          const postElement = document.createElement('a');
          postElement.href = post.permalink;
          postElement.target = '_blank';
          postElement.className = 'insta-item';
          
          // Fix for videos/reels: use thumbnailUrl if available, else mediaUrl
          const imgUrl = (post.mediaType === 'VIDEO' || post.isReel) ? post.thumbnailUrl : post.mediaUrl;
          
          const isVideo = post.mediaType === 'VIDEO' || post.isReel;
          
          postElement.innerHTML = `
            <img src="${imgUrl}" alt="Instagram post" loading="lazy">
            <div class="insta-overlay">
              <span class="insta-icon">${isVideo ? '▶️' : '📸'}</span>
              <span>Ver no Instagram</span>
            </div>
            ${isVideo ? '<div class="video-tag">Reel</div>' : ''}
          `;
          instaGrid.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('Error fetching Instagram feed:', error);
        instaGrid.innerHTML = '<p class="insta-loader">Não foi possível carregar o feed de Instagram de momento.</p>';
      });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
      navbar.style.background = 'var(--glass-bg)';
      navbar.style.boxShadow = 'none';
    }
    
    // Highlight active section
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
    });
  });

  // --- State & Translations ---
  let currentLang = 'pt';
  const translations = {
    pt: {
      "nav-home": "Início", "nav-services": "Serviços", "nav-space": "O Espaço", "nav-team": "Equipa", "nav-contacts": "Contactos",
      "book-btn": "📞 Marcar Consulta", "hero-title": "Cuidamos do seu Gato com Amor e Especialização",
      "hero-desc": "Bem vindos à nossa clínica em Palmela, onde pode encontrar o médico de família do seu animal.",
      "hero-call": "📞 Ligar Agora (963 349 053)", "hero-view": "Ver Serviços", "services-title": "Os Nossos Serviços",
      "team-title": "A Nossa Equipa", "modal-book-main": "Marcar Consulta", "modal-book-choice": "Como prefere contactar-nos?",
      "modal-book-call": "Ligar", "modal-book-wa": "WhatsApp", "modal-book-back": "← Voltar", "view-more": "Ver Mais", "read-more": "Saber mais",
      "svc-rec-title": "Receção & Petshop", "svc-rec-desc": "A entrada da nossa casa. É no balcão da receção que pode falar com as nossas auxiliares para colocar as suas dúvidas, fazer a marcação de consultas ou adquirir produtos de venda livre para a saúde do seu animal (tais como alimentação húmida ou seca, brinquedos e nutracêuticos não sujeitos a receita médica veterinária). Logo neste balcão começa o melhor aconselhamento para a saúde do seu animal.",
      "svc-rec-short": "Alimentação, brinquedos e nutracêuticos com aconselhamento especializado.",
      "svc-prev-title": "Medicina Preventiva", "svc-prev-desc": "Nada como prevenir a doença para trazer vidas longas e felizes para os nossos pacientes. Em consultas de Medicina Preventiva são realizados serviços como a vacinação, a colocação e registo de microchip, emissão do boletim sanitário e de passaporte, desparasitação interna e externa. Nestas consultas é sempre realizado um exame físico cuidado de forma a garantir que o seu animal está em perfeita saúde! Aproveite estas consultas para colocar todas as suas questões ao Médico Veterinário.",
      "svc-prev-short": "Vacinação, microchip, desparasitação e emissão de boletins.",
      "svc-gen-title": "Clínica Geral", "svc-gen-desc": "Quando nota alguma alteração de saúde no seu animal, deve trazê-lo o quanto antes para ser observado por um Médico Veterinário. É no momento de consulta que temos a oportunidade de fazer um exame físico completo, falar pessoalmente com os tutores e seguir com planos de diagnóstico e tratamento personalizados. Todos os pacientes são diferentes e cada caso é um caso. Temos ao vosso dispor uma equipa de clínicos multidisciplinar que trabalha sempre com o objetivo de prestar os melhores cuidados.",
      "svc-gen-short": "Exame físico completo, diagnósticos e tratamentos personalizados.",
      "svc-ana-title": "Análises Clínicas", "svc-ana-desc": "Temos ao nosso dispor tecnologia que permite avançar na hora com análises sanguíneas variadas como Hemograma, Bioquímicas séricas e análises Hormonais. Dependendo da situação, o Médico Veterinário pode propor avançar com uma colheita de sangue do paciente para procura de respostas importantes para diagnóstico, plano de tratamento e seguimento de doenças crónicas.",
      "svc-ana-short": "Hemogramas e Bioquímicas realizadas na hora para diagnósticos rápidos.",
      "svc-lab-title": "Laboratório", "svc-lab-desc": "No nosso laboratório, para além das análises sanguíneas, também temos a possibilidade de realizar Análises de Urina de Tipo II, DTM (cultura fúngica) e Citologia. Principalmente aplicadas em situações de distúrbios urinários, alterações cutâneas e otites, estas análises são importantes para identificação de estruturas celulares, bacterianas e fúngicas essenciais para prescrição do tratamento mais indicado.",
      "svc-lab-short": "Análises de Urina, Cultura Fúngica e Citologia especializada.",
      "svc-cir-title": "Cirurgia", "svc-cir-desc": "Com uma sala de cirurgia equipada com anestesia volátil, concentrador de oxigénio e autoclave, conseguimos oferecer um amplo serviço de cirurgia no nosso espaço. Desde as habituais esterilizações e castrações até outras cirurgias de tecidos moles mais complexas, ortopedia e odontologia. Guiados por protocolos anestésicos sempre atualizados, conseguimos oferecer um serviço de anestesia o mais seguro possível e adaptado a diferentes idades e condições de saúde. Mediante avaliação prévia, o Médico Veterinário pode optar pela cirurgia para tratamento de diferentes doenças.",
      "svc-cir-short": "Esterilizações e tecidos moles com anestesia segura e monitorização.",
      "svc-int-title": "Internamento", "svc-int-desc": "Para situações mais críticas em que seja necessário fluidoterapia e medicação endovenosa, pode ser necessário o paciente ficar em regime de internamento diurno. Na nossa clínica dispomos de boxes de tamanhos diferentes para gatos e cães. Tendo em conta o temperamento específico dos felinos, o nosso internamento segue as guidelines \"catfriendly\" de forma a oferecer a estadia mais tranquila possível aos nossos pacientes.",
      "svc-int-short": "Boxes 'catfriendly' com fluidoterapia e medicação em regime diurno.",
      "svc-eco-title": "Ecografia Abdominal", "svc-eco-desc": "Para situações de emergência e diagnóstico de algumas doenças do foro da cavidade abdominal, dispomos de um ecografo e pessoal em formação contínua nesta área. Em certas situações como infeções uterinas, deteção de massas ou diagnóstico de gestação, a ecografia abdominal é o exame complementar de diagnóstico mais indicado.",
      "svc-eco-short": "Emergências, gestação, infeções uterinas e deteção de massas.",
      "svc-ecg-title": "Eletrocardiograma & Medição Pressão Arterial", "svc-ecg-desc": "Para auxílio de diagnóstico de doença cardíaca e avaliação pré-anestésica, dispomos do serviço de eletrocardiografia. Complementado com medição de pressão arterial, conseguimos fazer a monitorização de alterações da tensão em caso de doença crónica cardíaca e/ou renal, tanto em cães como em gatos.",
      "svc-ecg-short": "Avaliação cardíaca e monitorização de tensão arterial.",
      "svc-ort-title": "Ortopedia", "svc-ort-desc": "No nosso espaço dispomos do serviço externo da especialidade de Ortopedia. Tendo em conta a casuística e a exigência necessária para oferecer os melhores cuidados aos nossos pacientes, damos a possibilidade de consulta e cirurgia ortopédica em ambulatório com um Médico Veterinário especialista na área. Sempre que o clínico entender que é o ideal para o caso, será feita a recomendação e posterior marcação da visita do colega especialista ao nosso espaço.",
      "svc-ort-short": "Consultas e cirurgias ortopédicas com especialistas externos.",
      "svc-odo-title": "Odontologia", "svc-odo-desc": "A Odontologia é um mundo dentro da Medicina Veterinária. Quando o caso clínico é mais complexo e exigir a necessidade de recorrer a raio-x dentário, extração dentária extensa ou remoção de nódulos orais complicados, é feita a recomendação de marcação de cirurgia com Médica Veterinária especialista em regime de ambulatório. Desta forma podemos realizar a avaliação, cirurgia e monitorização pós-cirurgica no nosso espaço.",
      "svc-odo-short": "Destartarização e cuidados de saúde oral especializados.",
      "svc-exo-title": "Animais Exóticos", "svc-exo-desc": "Para situações de caráter não urgente, seja a nível de consulta ou cirurgia, temos a oportunidade de ter uma Médica Veterinária especialista em animais exóticos a prestar esses serviços em regime de ambulatório. São consultas que prestamos sempre mediante marcação prévia.",
      "svc-exo-short": "Consultas especializadas para companheiros não-tradicionais.",
      "svc-ban-title": "Banhos e Tosquias", "svc-ban-desc": "Serviço de banhos e tosquias focado no conforto do animal, utilizando produtos adequados para cada tipo de pelo e pele.",
      "svc-ban-short": "Higiene, banhos terapêuticos e tosquias estéticas ou de saúde.",
      // Team Bio PT
      "team-raquel-role": "Fundadora & Médica Veterinária",
      "team-raquel-bio": "Formada em Medicina Veterinária na faculdade FMV-UL em 2011 e fundadora da Clínica Gato Escondido em 2016. Tem como áreas de maior interesse a citologia, cirurgia e gestão.",
      "team-marco-role": "Fundador & Sócio Gerente",
      "team-marco-bio": "Formado em Engenharia de Automação e Controlo Industrial. Fundador da Clínica Gato Escondido em 2016. Papel fundamental na gestão empresarial e apoio na área de informática e manutenção geral.",
      "team-carla-role": "Diretora Clínica",
      "team-carla-bio": "Formada em Medicina Veterinária na FMV-UL in 2013. Incluiu o corpo clínico da Clínica Veterinária Gato Escondido desde a sua fundação em 2016. Em 2023 assumiu o cargo da Direção Clínica.",
      "team-claudia-role": "Médica Veterinária",
      "team-claudia-bio": "Formada em Medicina Veterinária na faculdade FMV-UL em 2020. Desde 2021 que faz parte do corpo clínico do Gato Escondido.",
      "team-rita-role": "Médica Veterinária",
      "team-rita-bio": "Formada em Medicina Veterinária na FMV-UL em 2015. Faz parte do corpo clínico do Gato Escondido desde 2022. Especialista em Cirurgia de Tecidos Moles.",
      "team-joao-role": "Médico Veterinário",
      "team-joao-bio": "Formado em Medicina Veterinária na Faculdade da Lusófona em 2022. Desde 2023 que faz parte da equipa da Clínica Gato Escondido.",
      "team-catarina-role": "Auxiliar Medicina Veterinária",
      "team-catarina-bio": "Faz parte da equipa do Gato Escondido desde 2020. É a principal figura da receção e quem recebe o cliente sempre que este telefona ou entra no nosso espaço.",
      "team-ana-role": "Auxiliar Medicina Veterinária",
      "team-ana-bio": "Em Maio de 2024 terminou o Curso de Auxiliar de Medicina Veterinária. Realizou o estágio connosco e agora faz parte integrante da equipa.",
      // Sections PT
      "space-title": "O Nosso Espaço",
      "space-desc": "Um espaço moderno, acolhedor e totalmente equipado para o bem-estar do seu animal de companhia.",
      "insta-subtitle": "Clínica Veterinária em Palmela",
      "insta-follow": "Seguir",
      "insta-loading": "A carregar momentos...",
      "contact-title": "Onde Estamos",
      "contact-address-label": "Morada",
      "contact-directions": "Obter Direções",
      "contact-label": "Contactos",
      "contact-hours-label": "Horário",
      "contact-closed": "Encerrados Domingos e Feriados",
      "contact-follow-label": "Siga-nos",
      "footer-copy": "© 2026 Clínica Veterinária Gato Escondido. Todos os direitos reservados.",
      "reviews-title": "O que dizem os nossos clientes",
      "reviews-count": "Baseado em 39 avaliações",
      "reviews-cta": "⭐ Deixe a sua avaliação"
    },
    en: {
      "nav-home": "Home", "nav-services": "Services", "nav-space": "The Space", "nav-team": "Team", "nav-contacts": "Contacts",
      "book-btn": "📞 Book Appointment", "hero-title": "Expert Feline Care with Love",
      "hero-desc": "Welcome to our clinic in Palmela, where you'll find your pet's family doctor.",
      "hero-call": "📞 Call Now (963 349 053)", "hero-view": "View Services", "services-title": "Our Services",
      "team-title": "Our Team", "modal-book-main": "Book Appointment", "modal-book-choice": "How would you like to contact us?",
      "modal-book-call": "Call", "modal-book-wa": "WhatsApp", "modal-book-back": "← Back", "view-more": "See More", "read-more": "Read More",
      "svc-rec-title": "Reception & Petshop", "svc-rec-desc": "Our reception is where you can talk to our assistants, book appointments, or purchase over-the-counter health products.",
      "svc-rec-short": "Food, toys and nutraceuticals with specialized advice.",
      "svc-prev-title": "Preventive Medicine", "svc-prev-desc": "Prevention is key to a long and happy life. We provide vaccinations, microchipping, passports, and physical exams.",
      "svc-prev-short": "Vaccination, microchip, deworming and health bulletins.",
      "svc-gen-title": "General Practice", "svc-gen-desc": "A multidisciplinary team dedicated to providing the best care through personalized diagnostic plans.",
      "svc-gen-short": "Full physical exam, diagnosis and personalized treatments.",
      "svc-ana-title": "Clinical Analysis", "svc-ana-desc": "In-house technology for immediate blood work, essential for chronic disease monitoring and urgent diagnostics.",
      "svc-ana-short": "Blood tests and biochemistry performed on site for fast diagnosis.",
      "svc-lab-title": "Laboratory", "svc-lab-desc": "We perform urinalysis, fungal cultures (DTM), and cytology to identify bacteria and fungi for precise treatment.",
      "svc-lab-short": "Urinalysis, Fungal Culture and specialized Cytology.",
      "svc-cir-title": "Surgery", "svc-cir-desc": "Equipped for volatile anesthesia. We handle everything from sterilizations to complex soft tissue surgeries.",
      "svc-cir-short": "Sterilizations and soft tissue with safe anesthesia and monitoring.",
      "svc-int-title": "Hospitalization", "svc-int-desc": "Cat-friendly hospitalization boxes designed to offer the most peaceful stay possible during recovery.",
      "svc-int-short": "'Catfriendly' boxes with fluid therapy and medication during day care.",
      "svc-eco-title": "Abdominal Ultrasound", "svc-eco-desc": "A vital diagnostic tool for emergencies, mass detection, or pregnancy diagnosis.",
      "svc-eco-short": "Emergencies, pregnancy, uterine infections and mass detection.",
      "svc-ecg-title": "Electrocardiogram", "svc-ecg-desc": "Aids in diagnosing heart disease and pre-anesthetic evaluation, complemented by blood pressure monitoring.",
      "svc-ecg-short": "Cardiac evaluation and blood pressure monitoring.",
      "svc-ort-title": "Orthopedics", "svc-ort-desc": "External orthopedic service for consultations and complex surgeries with specialized veterinarians.",
      "svc-ort-short": "Orthopedic consultations and surgeries with external specialists.",
      "svc-odo-title": "Dentistry", "svc-odo-desc": "Scaling and oral health procedures to prevent periodontal disease and ensure feline well-being.",
      "svc-odo-short": "Scaling and specialized oral health care.",
      "svc-exo-title": "Exotic Animals", "svc-exo-desc": "Specialized consultations for non-traditional companions, ensuring they receive the expert care they need.",
      "svc-exo-short": "Specialized consultations for non-traditional companions.",
      "svc-ban-title": "Baths and Grooming", "svc-ban-desc": "Bathing and grooming services focused on your companion's comfort, using products suited to each coat and skin type.",
      "svc-ban-short": "Hygiene, therapeutic baths, and grooming for appearance or health.",
      // Team Bio EN
      "team-raquel-role": "Founder & Veterinarian",
      "team-raquel-bio": "Graduated in Veterinary Medicine from FMV-UL in 2011 and founded Clínica Gato Escondido in 2016. Her main interests include cytology, surgery, and management.",
      "team-marco-role": "Founder & Managing Partner",
      "team-marco-bio": "Graduated in Industrial Automation and Control Engineering. Co-founder of Clínica Gato Escondido. Key role in business management, IT support, and general maintenance.",
      "team-carla-role": "Clinical Director",
      "team-carla-bio": "Graduated in Veterinary Medicine from FMV-UL in 2013. Has been part of the clinical team since its foundation in 2016. In 2023, she assumed the role of Clinical Director.",
      "team-claudia-role": "Veterinarian",
      "team-claudia-bio": "Graduated in Veterinary Medicine from FMV-UL in 2020. Has been part of the Gato Escondido clinical team since 2021.",
      "team-rita-role": "Veterinarian",
      "team-rita-bio": "Graduated in Veterinary Medicine from FMV-UL in 2015. Joined the clinical team in 2022. Expert in Soft tissue Surgery.",
      "team-joao-role": "Veterinarian",
      "team-joao-bio": "Graduated in Veterinary Medicine from Lusófona University in 2022. Joined the Gato Escondido team in 2023.",
      "team-catarina-role": "Veterinary Assistant",
      "team-catarina-bio": "Part of the Gato Escondido team since 2020. She is the main face of our reception, welcoming clients both in person and over the phone.",
      "team-ana-role": "Veterinary Assistant",
      "team-ana-bio": "Completed her Veterinary Assistant course in May 2024. After an internship with us, she is now a full member of the Gato Escondido team.",
      // Sections EN
      "space-title": "Our Space",
      "space-desc": "A modern, cozy, and fully equipped space for the well-being of your pet.",
      "insta-subtitle": "Veterinary Clinic in Palmela",
      "insta-follow": "Follow",
      "insta-loading": "Loading moments...",
      "contact-title": "Where We Are",
      "contact-address-label": "Address",
      "contact-directions": "Get Directions",
      "contact-label": "Contacts",
      "contact-hours-label": "Opening Hours",
      "contact-closed": "Closed on Sundays and Holidays",
      "contact-follow-label": "Follow Us",
      "footer-copy": "© 2026 Clínica Veterinária Gato Escondido. All rights reserved.",
      "reviews-title": "What our clients say",
      "reviews-count": "Based on 39 reviews",
      "reviews-cta": "⭐ Leave your review"
    }
  };

  // --- Modal Elements ---
  const teamModal = document.getElementById('teamModal');
  const serviceModal = document.getElementById('serviceModal');
  const bookingMainContent = document.getElementById('bookingMainContent');
  const bookingOptions = document.getElementById('bookingOptions');

  const showBookingOptions = () => {
    bookingMainContent?.classList.add('hidden');
    bookingOptions?.classList.remove('hidden');
  };

  const showServiceModal = (btn) => {
    const i18nKey = btn.parentElement.querySelector('[data-i18n]')?.getAttribute('data-i18n')?.replace('-title', '');
    let title = btn.getAttribute('data-title');
    let desc = btn.getAttribute('data-desc');
    const image = btn.getAttribute('data-image');

    if (i18nKey && translations[currentLang][`${i18nKey}-title`]) {
      title = translations[currentLang][`${i18nKey}-title`];
      desc = translations[currentLang][`${i18nKey}-desc`];
    }

    document.getElementById('serviceModalTitle').textContent = title;
    document.getElementById('serviceModalDesc').textContent = desc;
    document.getElementById('serviceModalImg').src = image;
    
    // Reset modal state
    bookingMainContent?.classList.remove('hidden');
    bookingOptions?.classList.add('hidden');
    
    serviceModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const showTeamModal = (btn) => {
    const i18nKey = btn.getAttribute('data-i18n-key');
    let name = btn.getAttribute('data-name');
    let role = btn.getAttribute('data-role');
    let bio = btn.getAttribute('data-bio');
    let hobbies = btn.getAttribute('data-hobbies');
    const image = btn.getAttribute('data-image');

    if (i18nKey && translations[currentLang][`team-${i18nKey}-bio`]) {
      role = translations[currentLang][`team-${i18nKey}-role`];
      bio = translations[currentLang][`team-${i18nKey}-bio`];
    }

    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalBio').textContent = bio;
    document.getElementById('modalHobbies').textContent = hobbies;
    document.getElementById('modalImg').src = image;
    teamModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  // Event Delegation
  document.addEventListener('click', (e) => {
    const serviceBtn = e.target.closest('.view-service-btn');
    if (serviceBtn) { showServiceModal(serviceBtn); return; }

    const teamBtn = e.target.closest('.view-more-btn');
    if (teamBtn) { showTeamModal(teamBtn); return; }

    if (e.target.id === 'navBookBtn') {
      document.getElementById('serviceModalTitle').textContent = translations[currentLang]["modal-book-main"];
      document.getElementById('serviceModalDesc').textContent = translations[currentLang]["modal-book-choice"];
      document.getElementById('serviceModalImg').src = "/images/booking_illustration.png";
      showBookingOptions();
      serviceModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      return;
    }

    if (e.target.classList.contains('close-service-modal') || e.target === serviceModal) {
      serviceModal.classList.remove('show');
      document.body.style.overflow = '';
    }
    if (e.target.classList.contains('close-modal') || e.target === teamModal) {
      teamModal.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (e.target.id === 'bookServiceMain') {
      showBookingOptions();
    }
    if (e.target.id === 'backToBook') {
      bookingMainContent.classList.remove('hidden');
      bookingOptions.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (serviceModal?.classList.contains('show')) {
      serviceModal.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (teamModal?.classList.contains('show')) {
      teamModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  const switchLang = (lang) => {
    if (!translations[lang]) return;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Update team roles on cards
    document.querySelectorAll('.team-card').forEach(card => {
        const btn = card.querySelector('.view-more-btn');
        const key = btn?.getAttribute('data-i18n-key');
        if (key && translations[lang][`team-${key}-role`]) {
            card.querySelector('.role').textContent = translations[lang][`team-${key}-role`];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en-US';
  };

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => switchLang(btn.getAttribute('data-lang'))));

  // --- Slider Logic ---
  const slides = document.querySelectorAll('.slide');
  const thumbs = document.querySelectorAll('.thumb');
  let currentSlide = 0;
  let slideInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    thumbs[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    thumbs[currentSlide].classList.add('active');
  };

  const startSlider = () => {
    if(slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  };

  if (slides.length > 0) {
    document.querySelector('.next-btn')?.addEventListener('click', () => { goToSlide(currentSlide + 1); startSlider(); });
    document.querySelector('.prev-btn')?.addEventListener('click', () => { goToSlide(currentSlide - 1); startSlider(); });
    thumbs.forEach((t, i) => t.addEventListener('click', () => { goToSlide(i); startSlider(); }));
    startSlider();
  }

  // --- Lightbox Logic ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightboxModal) {
    document.querySelectorAll('.lightbox-trigger').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });
    const hideLightbox = () => {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = '';
    };
    document.querySelector('.close-lightbox')?.addEventListener('click', hideLightbox);
    lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) hideLightbox(); });
  }

  // --- Reviews Slider Logic ---
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewsDots = document.getElementById('reviewsDots');
  let currentReview = 0;
  let reviewInterval;

  if (reviewCards.length > 0 && reviewsDots) {
    // Create dots
    reviewCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'review-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Review ${i + 1}`);
      dot.addEventListener('click', () => goToReview(i));
      reviewsDots.appendChild(dot);
    });

    const goToReview = (index) => {
      reviewCards[currentReview].classList.remove('active');
      reviewsDots.children[currentReview].classList.remove('active');
      currentReview = (index + reviewCards.length) % reviewCards.length;
      reviewCards[currentReview].classList.add('active');
      reviewsDots.children[currentReview].classList.add('active');
    };

    const startReviewSlider = () => {
      if (reviewInterval) clearInterval(reviewInterval);
      reviewInterval = setInterval(() => goToReview(currentReview + 1), 5000);
    };

    document.querySelector('.prev-review')?.addEventListener('click', () => { goToReview(currentReview - 1); startReviewSlider(); });
    document.querySelector('.next-review')?.addEventListener('click', () => { goToReview(currentReview + 1); startReviewSlider(); });
    startReviewSlider();
  }

  // Reveal Animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
