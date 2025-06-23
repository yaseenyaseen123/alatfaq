// تفعيل القائمة المتجاوبة
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // تبديل القائمة عند النقر على الهامبرغر
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // تأثير شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // تعديل للشريط الثابت
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تأثير الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // مراقبة العناصر للتأثيرات
    const elementsToObserve = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });

    // تأثير العداد للإحصائيات
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // تنسيق الرقم
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('/')) {
                element.textContent = element.textContent; // للحفاظ على النص الأصلي مثل "24/7"
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    // تفعيل العداد عند ظهور القسم
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('100+')) {
                            animateCounter(stat, 100);
                        } else if (text.includes('50+')) {
                            animateCounter(stat, 50);
                        } else if (text.includes('5+')) {
                            animateCounter(stat, 5);
                        }
                        // "24/7" يبقى كما هو
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // معالجة نموذج التواصل
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;

            // التحقق من صحة البيانات
            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // محاكاة إرسال النموذج
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;

            // محاكاة تأخير الإرسال
            setTimeout(() => {
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // تأثير التحويم على البطاقات
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // تأثير المعرض
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // يمكن إضافة نافذة منبثقة لعرض تفاصيل المشروع
            const title = this.querySelector('h3').textContent;
            alert(`عرض تفاصيل: ${title}`);
        });
    });

    // تحسين الأداء - تأخير تحميل الصور
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // إضافة تأثيرات صوتية (اختيارية)
    function addClickSound() {
        // يمكن إضافة أصوات للنقرات إذا رغبت
        const buttons = document.querySelectorAll('.btn, .nav-link');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                // تأثير بصري بسيط
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    addClickSound();

    // تحديث السنة في التذييل
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // إضافة مؤشر التحميل
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // إخفاء مؤشر التحميل إذا كان موجوداً
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // تحسين تجربة المستخدم على الأجهزة اللمسية
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // تحسين التفاعل مع البطاقات على الأجهزة اللمسية
        const cards = document.querySelectorAll('.service-card, .portfolio-item');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }

    console.log('🚀 موقع الشركة جاهز للعمل!');
});

// دالة لإضافة تأثيرات إضافية
function initAdvancedEffects() {
    // تأثير الجسيمات في الخلفية (اختياري)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // تفعيل التأثيرات المتقدمة
    // createParticles();
}

// تشغيل التأثيرات المتقدمة
// initAdvancedEffects();

