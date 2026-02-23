// ECOESTRUTURA - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero-stats');
    let statsAnimated = false;

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-advance testimonials
    setInterval(() => {
        if (testimonialCards.length > 0) {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }
    }, 5000);

    // Sustainability Calculator
    const calcForm = document.getElementById('sustainabilityCalc');
    const calcResults = document.getElementById('calcResults');

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const projectType = document.getElementById('projectType').value;
            const area = parseFloat(document.getElementById('projectArea').value) || 0;
            const certification = document.getElementById('certification').value;

            if (!projectType || !area) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Calculate estimates based on project type and area
            let co2Factor = 0.5;
            let waterFactor = 0.3;
            let energyFactor = 0.1;

            switch(projectType) {
                case 'residencial':
                    co2Factor = 0.4;
                    waterFactor = 0.25;
                    energyFactor = 0.08;
                    break;
                case 'comercial':
                    co2Factor = 0.6;
                    waterFactor = 0.35;
                    energyFactor = 0.12;
                    break;
                case 'industrial':
                    co2Factor = 0.8;
                    waterFactor = 0.5;
                    energyFactor = 0.15;
                    break;
                case 'infraestrutura':
                    co2Factor = 0.3;
                    waterFactor = 0.2;
                    energyFactor = 0.05;
                    break;
            }

            // Certification bonus
            let certMultiplier = 1;
            if (certification === 'leed') certMultiplier = 1.3;
            else if (certification === 'gbcs') certMultiplier = 1.2;
            else if (certification === 'iso') certMultiplier = 1.1;

            const co2 = Math.round(area * co2Factor * certMultiplier);
            const water = Math.round(area * waterFactor * certMultiplier);
            const energy = Math.round((area * energyFactor * certMultiplier) * 10) / 10;

            // Animate results
            document.getElementById('co2Result').textContent = co2.toLocaleString();
            document.getElementById('waterResult').textContent = water.toLocaleString();
            document.getElementById('energyResult').textContent = energy;

            calcResults.style.display = 'block';
            calcResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado por assinar nossa newsletter!');
            newsletterForm.reset();
        });
    }

    // Chat widget
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle && chatBox) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });

        chatClose.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'message';
                userMsg.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(userMsg);

                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Simulate bot response
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'message bot';
                    botMsg.innerHTML = '<p>Obrigado pelo contato! Um de nossos engenheiros responderá em breve. Para orçamentos urgentes, ligue (11) 3456-7890.</p>';
                    chatMessages.appendChild(botMsg);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .blog-card, .impact-card').forEach(el => {
        observer.observe(el);
    });
});
