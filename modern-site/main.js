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
        const headerHeight = navbar?.offsetHeight || 80;
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(targetTop - headerHeight - 24, 0),
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Touch-friendly team cards: avoid sticky mobile hover states.
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.view-more-btn')) return;
      if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
      document.querySelectorAll('.team-card.hover').forEach(openCard => {
        if (openCard !== card) openCard.classList.remove('hover');
      });
      card.classList.toggle('hover');
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.team-card')) return;
    document.querySelectorAll('.team-card.hover').forEach(card => card.classList.remove('hover'));
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
      "book-btn": "📞 Marcar Consulta", "hero-title-line-1": "Clínica Veterinária", "hero-title-line-2": "Gato Escondido",
      "hero-desc": "Bem vindos à nossa clínica em Palmela, onde pode encontrar o médico de família do seu animal.",
      "hero-call": "📞 Ligar Agora", "hero-view": "Ver Serviços", "services-title": "Os Nossos Serviços",
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
      "svc-ecg-title": "ECG & Pressão Arterial", "svc-ecg-desc": "Para auxílio de diagnóstico de doença cardíaca e avaliação pré-anestésica, dispomos do serviço de eletrocardiografia. Complementado com medição de pressão arterial, conseguimos fazer a monitorização de alterações da tensão em caso de doença crónica cardíaca e/ou renal, tanto em cães como em gatos.",
      "svc-ecg-short": "Avaliação cardíaca e monitorização de tensão arterial.",
      "svc-ort-title": "Ortopedia", "svc-ort-desc": "No nosso espaço dispomos do serviço externo da especialidade de Ortopedia. Tendo em conta a casuística e a exigência necessária para oferecer os melhores cuidados aos nossos pacientes, damos a possibilidade de consulta e cirurgia ortopédica em ambulatório com um Médico Veterinário especialista na área. Sempre que o clínico entender que é o ideal para o caso, será feita a recomendação e posterior marcação da visita do colega especialista ao nosso espaço.",
      "svc-ort-short": "Consultas e cirurgias ortopédicas com especialistas externos.",
      "svc-odo-title": "Odontologia", "svc-odo-desc": "A Odontologia é um mundo dentro da Medicina Veterinária. Quando o caso clínico é mais complexo e exigir a necessidade de recorrer a raio-x dentário, extração dentária extensa ou remoção de nódulos orais complicados, é feita a recomendação de marcação de cirurgia com Médica Veterinária especialista em regime de ambulatório. Desta forma podemos realizar a avaliação, cirurgia e monitorização pós-cirurgica no nosso espaço.",
      "svc-odo-short": "Destartarização e cuidados de saúde oral especializados.",
      "svc-exo-title": "Animais Exóticos", "svc-exo-desc": "Para situações de caráter não urgente, seja a nível de consulta ou cirurgia, temos a oportunidade de ter uma Médica Veterinária especialista em animais exóticos a prestar esses serviços em regime de ambulatório. São consultas que prestamos sempre mediante marcação prévia.",
      "svc-exo-short": "Consultas especializadas para companheiros não-tradicionais.",
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
      "reviews-title": "O Que Dizem Sobre Nós",
      "reviews-subtitle": "Críticas reais de clientes que confiam a saúde dos seus animais ao Gato Escondido.",
      "reviews-source": "Fonte: críticas públicas online",
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
      "footer-copy": "© 2026 Clínica Veterinária Gato Escondido. Todos os direitos reservados."
    },
    en: {
      "nav-home": "Home", "nav-services": "Services", "nav-space": "The Space", "nav-team": "Team", "nav-contacts": "Contacts",
      "book-btn": "📞 Book Appointment", "hero-title-line-1": "Veterinary Clinic", "hero-title-line-2": "Gato Escondido",
      "hero-desc": "Welcome to our clinic in Palmela, where you'll find your pet's family doctor.",
      "hero-call": "📞 Call Now", "hero-view": "View Services", "services-title": "Our Services",
      "team-title": "Our Team", "modal-book-main": "Book Appointment", "modal-book-choice": "How would you like to contact us?",
      "modal-book-call": "Call", "modal-book-wa": "WhatsApp", "modal-book-back": "← Back", "view-more": "See More", "read-more": "Read More",
      "svc-rec-title": "Reception & Petshop", "svc-rec-desc": "The entrance to our home. At the reception desk you can speak with our assistants to ask questions, book appointments, or purchase over-the-counter products for your animal's health, such as wet or dry food, toys, and nutraceuticals that do not require a veterinary prescription. The best advice for your animal's health starts right at this counter.",
      "svc-rec-short": "Food, toys and nutraceuticals with specialized advice.",
      "svc-prev-title": "Preventive Medicine", "svc-prev-desc": "There is nothing like preventing disease to give our patients long and happy lives. Preventive Medicine appointments include services such as vaccination, microchip placement and registration, issuing health booklets and passports, and internal and external deworming. These appointments always include a careful physical examination to make sure your animal is in perfect health. Take the opportunity to ask the Veterinarian all your questions.",
      "svc-prev-short": "Vaccination, microchip, deworming and health bulletins.",
      "svc-gen-title": "General Practice", "svc-gen-desc": "When you notice any change in your animal's health, you should bring them in as soon as possible to be seen by a Veterinarian. The consultation is when we can perform a complete physical examination, speak personally with guardians, and follow personalized diagnostic and treatment plans. Every patient is different and every case is unique. We have a multidisciplinary clinical team available, always working to provide the best care.",
      "svc-gen-short": "Full physical exam, diagnosis and personalized treatments.",
      "svc-ana-title": "Clinical Analysis", "svc-ana-desc": "We have technology that allows us to perform a variety of blood tests on the spot, including blood counts, serum biochemistry, and hormonal tests. Depending on the situation, the Veterinarian may recommend collecting a blood sample from the patient to look for important answers for diagnosis, treatment planning, and monitoring chronic diseases.",
      "svc-ana-short": "Blood tests and biochemistry performed on site for fast diagnosis.",
      "svc-lab-title": "Laboratory", "svc-lab-desc": "In our laboratory, in addition to blood tests, we can also perform Type II urinalysis, DTM fungal culture, and cytology. Mainly used in cases of urinary disorders, skin changes, and otitis, these tests are important for identifying cellular, bacterial, and fungal structures that are essential for prescribing the most appropriate treatment.",
      "svc-lab-short": "Urinalysis, Fungal Culture and specialized Cytology.",
      "svc-cir-title": "Surgery", "svc-cir-desc": "With a surgery room equipped with volatile anesthesia, an oxygen concentrator, and an autoclave, we can offer a broad surgical service in our clinic. This ranges from routine spays and neuters to more complex soft tissue surgeries, orthopedics, and dentistry. Guided by constantly updated anesthetic protocols, we aim to provide anesthesia that is as safe as possible and adapted to different ages and health conditions. After prior assessment, the Veterinarian may choose surgery to treat different diseases.",
      "svc-cir-short": "Sterilizations and soft tissue with safe anesthesia and monitoring.",
      "svc-int-title": "Hospitalization", "svc-int-desc": "In more critical situations where fluid therapy and intravenous medication are needed, the patient may need to stay in daytime hospitalization. Our clinic has boxes of different sizes for cats and dogs. Taking into account the specific temperament of felines, our hospitalization follows cat-friendly guidelines to offer our patients the calmest possible stay.",
      "svc-int-short": "'Catfriendly' boxes with fluid therapy and medication during day care.",
      "svc-eco-title": "Abdominal Ultrasound", "svc-eco-desc": "For emergency situations and the diagnosis of some diseases of the abdominal cavity, we have an ultrasound machine and staff in continuous training in this area. In certain situations such as uterine infections, mass detection, or pregnancy diagnosis, abdominal ultrasound is the most appropriate complementary diagnostic exam.",
      "svc-eco-short": "Emergencies, pregnancy, uterine infections and mass detection.",
      "svc-ecg-title": "ECG & Blood Pressure", "svc-ecg-desc": "To assist in the diagnosis of heart disease and pre-anesthetic assessment, we provide an electrocardiography service. Complemented by blood pressure measurement, we can monitor blood pressure changes in cases of chronic cardiac and/or kidney disease, both in dogs and cats.",
      "svc-ecg-short": "Cardiac evaluation and blood pressure monitoring.",
      "svc-ort-title": "Orthopedics", "svc-ort-desc": "At our clinic we provide an external Orthopedics specialty service. Considering the case load and the level of expertise required to offer the best care to our patients, we make outpatient orthopedic consultations and surgery available with a Veterinarian specialized in the area. Whenever the clinician considers it ideal for the case, the recommendation will be made and the specialist colleague's visit to our clinic will then be scheduled.",
      "svc-ort-short": "Orthopedic consultations and surgeries with external specialists.",
      "svc-odo-title": "Dentistry", "svc-odo-desc": "Dentistry is a world within Veterinary Medicine. When the clinical case is more complex and requires dental X-rays, extensive tooth extraction, or removal of complicated oral nodules, we recommend scheduling surgery with a specialist Veterinarian on an outpatient basis. This allows us to perform the assessment, surgery, and post-surgical monitoring in our clinic.",
      "svc-odo-short": "Scaling and specialized oral health care.",
      "svc-exo-title": "Exotic Animals", "svc-exo-desc": "For non-urgent situations, whether consultations or surgery, we have the opportunity to work with a Veterinarian specialized in exotic animals who provides these services on an outpatient basis. These consultations are always provided by prior appointment.",
      "svc-exo-short": "Specialized consultations for non-traditional companions.",
      // Team Bio EN
      "team-raquel-role": "Founder & Veterinarian",
      "team-raquel-bio": "Graduated in Veterinary Medicine from FMV-UL in 2011 and founded Clínica Gato Escondido in 2016. Her main interests include cytology, surgery, and management.",
      "team-raquel-hobbies": "Family adventures, gardening, travelling.",
      "team-marco-role": "Founder & Managing Partner",
      "team-marco-bio": "Graduated in Industrial Automation and Control Engineering. Co-founder of Clínica Gato Escondido. Key role in business management, IT support, and general maintenance.",
      "team-marco-hobbies": "Family adventures, sports and technology.",
      "team-carla-role": "Clinical Director",
      "team-carla-bio": "Graduated in Veterinary Medicine from FMV-UL in 2013. Has been part of the clinical team since its foundation in 2016. In 2023, she assumed the role of Clinical Director.",
      "team-carla-hobbies": "Gardening, board games and reading.",
      "team-claudia-role": "Veterinarian",
      "team-claudia-bio": "Graduated in Veterinary Medicine from FMV-UL in 2020. Has been part of the Gato Escondido clinical team since 2021.",
      "team-claudia-hobbies": "Reading, travelling, painting and music.",
      "team-rita-role": "Veterinarian",
      "team-rita-bio": "Graduated in Veterinary Medicine from FMV-UL in 2015. Joined the clinical team in 2022. Expert in Soft tissue Surgery.",
      "team-rita-hobbies": "Creative writing, reading and cinema.",
      "team-joao-role": "Veterinarian",
      "team-joao-bio": "Graduated in Veterinary Medicine from Lusófona University in 2022. Joined the Gato Escondido team in 2023.",
      "team-joao-hobbies": "Cinema, video games and walks.",
      "team-catarina-role": "Veterinary Assistant",
      "team-catarina-bio": "Part of the Gato Escondido team since 2020. She is the main face of our reception, welcoming clients both in person and over the phone.",
      "team-catarina-hobbies": "Family time, walks and discovering new places.",
      "team-ana-role": "Veterinary Assistant",
      "team-ana-bio": "Completed her Veterinary Assistant course in May 2024. After an internship with us, she is now a full member of the Gato Escondido team.",
      "team-ana-hobbies": "Family time and leisure outdoors.",
      // Sections EN
      "space-title": "Our Space",
      "space-desc": "A modern, cozy, and fully equipped space for the well-being of your pet.",
      "reviews-title": "What Clients Say",
      "reviews-subtitle": "Public reviews from clients who trust Gato Escondido with their animals' care.",
      "reviews-source": "Source: public online reviews",
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
      "footer-copy": "© 2026 Clínica Veterinária Gato Escondido. All rights reserved."
    }
  };

  // --- Modal Elements ---
  const teamModal = document.getElementById('teamModal');
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalImageContainer = serviceModal?.querySelector('.modal-image-container');
  const bookingMainContent = document.getElementById('bookingMainContent');
  const bookingOptions = document.getElementById('bookingOptions');
  let serviceGalleryTimer;

  const serviceGalleries = {
    RE: ['RE01.avif', 'RE02.avif', 'RE03.avif', 'RE04.avif', 'RE05.avif'],
    MP: ['MP01.avif', 'MP02.avif', 'MP03.avif', 'MP04.avif', 'MP05.avif', 'MP06.avif', 'MP07.avif'],
    CG: ['CG01.avif', 'CG02.avif', 'CG03.avif', 'CG04.avif', 'CG05.avif', 'CG06.avif', 'CG07.avif', 'CG08.avif'],
    AC: ['AC01.avif', 'AC02.avif', 'AC03.avif'],
    LAB: ['LAB01.avif', 'LAB02.avif', 'LAB03.avif', 'LAB04.avif'],
    CI: ['CI01.avif', 'CI02.avif', 'CI03.avif', 'CI04.avif', 'CI05.avif', 'CI06.avif'],
    INT: ['INT01.avif', 'INT02.avif', 'INT03.avif', 'INT04.avif', 'INT05.avif'],
    ECO: ['ECO01.avif', 'ECO02.avif', 'ECO03.avif', 'ECO04.avif', 'ECO05.avif'],
    ECG: ['ECG01.avif', 'ECG02.avif', 'ECG03.avif', 'ECG04.avif'],
    ORT: ['ORT01.avif', 'ORT02.avif', 'ORT03.avif', 'ORTO04.avif'],
    DE: ['DE01.avif', 'DE02.avif', 'DE03.avif'],
    EX: ['EX01.avif', 'EX02.avif']
  };

  const stopServiceGallery = () => {
    if (serviceGalleryTimer) {
      clearInterval(serviceGalleryTimer);
      serviceGalleryTimer = null;
    }
  };

  const renderServiceImage = (src, alt = '') => {
    stopServiceGallery();
    if (!serviceModalImageContainer) return;

    serviceModalImageContainer.classList.remove('service-gallery', 'booking-image');
    serviceModalImageContainer.innerHTML = `<img id="serviceModalImg" class="modal-main-img" src="${src}" alt="${alt}">`;
  };

  const renderServiceGallery = (galleryKey, fallbackImage, alt = '') => {
    const filenames = serviceGalleries[galleryKey];
    const images = filenames?.length
      ? filenames.map(filename => `/images/Servicos/${filename}`)
      : [fallbackImage];

    stopServiceGallery();
    if (!serviceModalImageContainer) return;

    serviceModalImageContainer.classList.remove('booking-image');
    serviceModalImageContainer.classList.add('service-gallery');
    serviceModalImageContainer.innerHTML = images.map((src, index) => (
      `<img class="service-gallery-img${index === 0 ? ' active' : ''}" src="${src}" alt="${alt}" loading="${index === 0 ? 'eager' : 'lazy'}">`
    )).join('');

    if (images.length < 2) return;

    let activeIndex = 0;
    const slides = serviceModalImageContainer.querySelectorAll('.service-gallery-img');
    serviceGalleryTimer = setInterval(() => {
      slides[activeIndex]?.classList.remove('active');
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex]?.classList.add('active');
    }, 3600);
  };

  const showBookingOptions = () => {
    bookingMainContent?.classList.add('hidden');
    bookingOptions?.classList.remove('hidden');
  };

  const showServiceModal = (btn) => {
    const i18nKey = btn.parentElement.querySelector('[data-i18n]')?.getAttribute('data-i18n')?.replace('-title', '');
    let title = btn.getAttribute('data-title');
    let desc = btn.getAttribute('data-desc');
    const image = btn.getAttribute('data-image');
    const galleryKey = btn.getAttribute('data-service-gallery');

    if (i18nKey && translations[currentLang][`${i18nKey}-title`]) {
      title = translations[currentLang][`${i18nKey}-title`];
      desc = translations[currentLang][`${i18nKey}-desc`];
    }

    document.getElementById('serviceModalTitle').textContent = title;
    document.getElementById('serviceModalDesc').textContent = desc;
    renderServiceGallery(galleryKey, image, title);
    
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
      hobbies = translations[currentLang][`team-${i18nKey}-hobbies`] || hobbies;
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

    if (e.target.id === 'navBookBtn' || e.target.id === 'heroBookBtn') {
      document.getElementById('serviceModalTitle').textContent = translations[currentLang]["modal-book-main"];
      document.getElementById('serviceModalDesc').textContent = translations[currentLang]["modal-book-choice"];
      renderServiceImage('/images/booking_illustration.png', translations[currentLang]["modal-book-main"]);
      serviceModalImageContainer?.classList.add('booking-image');
      showBookingOptions();
      serviceModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      return;
    }

    if (e.target.classList.contains('close-service-modal') || e.target === serviceModal) {
      stopServiceGallery();
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

  // --- Reviews Fade Slider ---
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewDots = document.querySelector('.review-dots');
  let currentReview = 0;
  let reviewInterval;

  const renderReviewDots = () => {
    if (!reviewDots) return;
    reviewDots.innerHTML = '';
    reviewCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `review-dot${index === currentReview ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Mostrar crítica ${index + 1}`);
      dot.addEventListener('click', () => {
        goToReview(index);
        startReviews();
      });
      reviewDots.appendChild(dot);
    });
  };

  const goToReview = (index) => {
    if (!reviewCards.length) return;
    reviewCards[currentReview].classList.remove('active');
    currentReview = (index + reviewCards.length) % reviewCards.length;
    reviewCards[currentReview].classList.add('active');
    reviewDots?.querySelectorAll('.review-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentReview);
    });
  };

  const startReviews = () => {
    if (reviewInterval) clearInterval(reviewInterval);
    reviewInterval = setInterval(() => goToReview(currentReview + 1), 5500);
  };

  if (reviewCards.length > 0) {
    renderReviewDots();
    document.querySelector('.review-next')?.addEventListener('click', () => { goToReview(currentReview + 1); startReviews(); });
    document.querySelector('.review-prev')?.addEventListener('click', () => { goToReview(currentReview - 1); startReviews(); });
    startReviews();
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

  // Reveal Animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
