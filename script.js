// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

let mouseX = 0, mouseY = 0;
let blurX = 0, blurY = 0;
let initialized = false;

// Only apply custom cursor on non-touch devices
if (window.innerWidth > 768) {
    document.body.classList.add("custom-cursor-active");
}

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!initialized && window.innerWidth > 768) {
        blurX = mouseX;
        blurY = mouseY;
        initialized = true;
    }
});

// Smooth trailing animation for the cursor blur using requestAnimationFrame
function animateCursor() {
    if (window.innerWidth > 768 && document.body.classList.contains("custom-cursor-active")) {
        // Linear interpolation (lerp) for smooth lag effect
        const lerpFactorBlur = 0.08;
        blurX += (mouseX - blurX) * lerpFactorBlur;
        blurY += (mouseY - blurY) * lerpFactorBlur;
        
        cursorBlur.style.left = blurX + "px";
        cursorBlur.style.top = blurY + "px";

        // Sync main cursor immediately
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    }
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

// Hide/Show custom cursor when mouse leaves/enters the viewport
document.addEventListener("mouseleave", () => {
    document.body.classList.add("cursor-hidden");
});

document.addEventListener("mouseenter", () => {
    document.body.classList.remove("cursor-hidden");
});

// Cursor hover effects on links and buttons (Using Event Delegation)
document.addEventListener("mouseover", (e) => {
    if (window.innerWidth > 768 && document.body.classList.contains("custom-cursor-active")) {
        const target = e.target.closest("a, .btn, .hamburger, .lang-btn, .lang-option, .color-btn, .color-toggle-btn");
        if (target) {
            cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
            cursor.style.backgroundColor = "transparent";
            cursor.style.border = "2px solid var(--primary)";
        }
    }
});

document.addEventListener("mouseout", (e) => {
    if (window.innerWidth > 768 && document.body.classList.contains("custom-cursor-active")) {
        const target = e.target.closest("a, .btn, .hamburger, .lang-btn, .lang-option, .color-btn, .color-toggle-btn");
        if (target && (!e.relatedTarget || !target.contains(e.relatedTarget))) {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            cursor.style.backgroundColor = "var(--primary)";
            cursor.style.border = "none";
        }
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(7, 10, 19, 0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
    } else {
        navbar.style.background = "rgba(7, 10, 19, 0.8)";
        navbar.style.boxShadow = "none";
    }
});

// Fetch GitHub Projects
const githubUsername = "khiraniayoub";
const projectsContainer = document.getElementById("github-projects");

const excludedRepos = ["mi-portfolio", "portfolio"];

// Ruta del video por proyecto (opcional). Si no está aquí, se usa videos/<nombre-repo>.mp4
const projectVideos = {
    edfix: "videos/edfix.mp4",
    AvisosMedicos: "videos/AvisosMedicos.mp4",
};

// Ruta de la imagen por proyecto (opcional).
const projectImages = {
    wback: "wback.png",
};

// Enlaces a proyectos desplegados en vivo (Vercel, etc.)
const projectLiveUrls = {
    "interdoc-web": "https://visita-domicilio.vercel.app/",
    "medical-tourisme": "https://medical-tourism-one.vercel.app/"
};

// Tecnologías detalladas por proyecto (para mostrar múltiples etiquetas en la tarjeta)
const projectTechTags = {
    wback: ["Python", "Django REST Framework", "Swagger"],
    edfix: ["React", "JavaScript", "HTML5", "CSS3"],
    avisosmedicos: ["Python", "PyQt", "PostgreSQL", "MS Teams API"],
    "interdoc-web": ["TypeScript", "Next.js", "React"],
    "medical-tourisme": ["TypeScript", "React"]
};

const projectDescriptions = {
    es: {
        edfix: 'EVC - <a href="https://edfix.es" target="_blank" rel="noopener noreferrer" class="project-desc-link">EDfix.es</a> es una landing one-page en React para un taller de reparación de dispositivos en Málaga, ligado al canal de YouTube EVCanal. Concentra en un solo sitio la captación de clientes (formulario de presupuesto con EmailJS), la información del negocio (servicios, precios, reseñas, galería de trabajos, ubicación y contacto) y contenido tech (vídeo del canal, noticias vía GNews y productos recomendados). Está pensada para convertir visitas en solicitudes de presupuesto.',
        wback: 'Wback — Backend API para Mensajería en Tiempo Real. API REST robusta, escalable y contenerizada diseñada como el motor para aplicaciones de chat y mensajería. Desarrollada con Python (Django REST Framework), implementa autenticación JWT segura, gestión de perfiles de usuario y documentación automática bajo OpenAPI 3.0.',
        avisosmedicos: 'Desarrollé una aplicación de escritorio multiusuario orientada al sector sanitario-turístico, pensada para equipos que gestionan avisos médicos en hoteles de la Costa del Sol. La herramienta centraliza todo el ciclo de un caso: desde la solicitud inicial (paciente, hotel, habitación, motivo de urgencia, seguro y touroperador) hasta el cierre con diagnóstico, traslado en ambulancia e ingreso hospitalario. Se realiza el envío de alertas a canales de Microsoft Teams mediante webhooks y tarjetas adaptativas. Los datos se persisten en PostgreSQL con respaldo en CSV, lo que permite trabajo en red entre varios puestos.',
        "interdoc-web": '<a href="https://visita-domicilio.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">Interdocs</a> es un servicio médico privado disponible 24/7 para turistas en la Costa del Sol. Ofrece visitas médicas rápidas a hoteles y domicilios en Málaga y Marbella. Trata emergencias comunes (intoxicaciones, quemaduras, infecciones) y proporciona informes médicos para los principales seguros de viaje europeos.',
        "medical-tourisme": '<a href="https://medical-tourism-one.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">MedBridge SPAIN</a> es una agencia de turismo médico de lujo que conecta a pacientes internacionales con la mejor medicina europea. Ofrece gestión integral: cirugías en hospitales premium (Vithas, Quirónsalud), traslados privados, alojamiento 5 estrellas y asesor personal 24/7 en idioma árabe e inglés.'
    },
    en: {
        edfix: 'EVC - <a href="https://edfix.es" target="_blank" rel="noopener noreferrer" class="project-desc-link">EDfix.es</a> is a React one-page landing for a device repair shop in Malaga, linked to the EVCanal YouTube channel. It concentrates customer acquisition (quote form with EmailJS), business info (services, prices, reviews, work gallery, location, and contact), and tech content (channel video, news via GNews, and recommended products) in a single site. It is designed to convert visits into quote requests.',
        wback: 'Wback — Backend API for Real-Time Messaging. Robust, scalable, and containerized REST API designed as the engine for chat and messaging applications. Developed with Python (Django REST Framework), it implements secure JWT authentication, user profile management, and automatic documentation under OpenAPI 3.0.',
        avisosmedicos: 'I developed a multi-user desktop application oriented to the healthcare-tourism sector, designed for teams managing medical alerts in hotels on the Costa del Sol. The tool centralizes the entire lifecycle of a case: from the initial request (patient, hotel, room, reason for emergency, insurance, and tour operator) to closure with diagnosis, ambulance transfer, and hospital admission. It sends alerts to Microsoft Teams channels via webhooks and adaptive cards. Data is persisted in PostgreSQL with CSV backup, enabling networked work among multiple stations.',
        "interdoc-web": '<a href="https://visita-domicilio.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">Interdocs</a> is a private medical service available 24/7 for tourists across the Costa del Sol. It offers fast hotel and home visits in Málaga and Marbella, treating common emergencies and providing medical reports for major travel insurances.',
        "medical-tourisme": '<a href="https://medical-tourism-one.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">MedBridge SPAIN</a> is a luxury medical tourism agency connecting international patients with top European medicine. It offers comprehensive management: surgeries in premium hospitals, private transfers, 5-star accommodation, and a 24/7 personal advisor in Arabic and English.'
    },
    fr: {
        edfix: 'EVC - <a href="https://edfix.es" target="_blank" rel="noopener noreferrer" class="project-desc-link">EDfix.es</a> est une landing page React pour un atelier de réparation d\'appareils à Malaga, lié à la chaîne YouTube EVCanal. Elle concentre sur un seul site l\'acquisition de clients (formulaire de devis avec EmailJS), les informations de l\'entreprise (services, prix, avis, galerie de travaux, localisation et contact) et le contenu tech (vidéo de la chaîne, actualités via GNews et produits recommandés). Elle est conçue pour convertir les visites en demandes de devis.',
        wback: 'Wback — API Backend pour la Messagerie en Temps Réel. API REST robuste, évolutive et conteneurisée conçue comme moteur pour les applications de chat et de messagerie. Développée avec Python (Django REST Framework), elle implémente une authentification JWT sécurisée, la gestion des profils d\'utilisateurs et une documentation automatique sous OpenAPI 3.0.',
        avisosmedicos: 'J\'ai développé une application de bureau multi-utilisateur orientée vers le secteur de la santé et du tourisme, conçue pour les équipes gérant les alertes médicales dans les hôtels de la Costa del Sol. L\'outil centralise tout le cycle d\'un cas : de la demande initiale (patient, hôtel, chambre, motif d\'urgence, assurance et voyagiste) jusqu\'à la clôture avec diagnostic, transfert en ambulance et hospitalisation. Elle envoie des alertes aux canaux Microsoft Teams via des webhooks et des cartes adaptatives. Les données sont persistées dans PostgreSQL avec sauvegarde CSV, permettant le travail en réseau entre plusieurs postes.',
        "interdoc-web": '<a href="https://visita-domicilio.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">Interdocs</a> est un service médical privé disponible 24/7 pour les touristes sur la Costa del Sol. Il propose des visites rapides à l\'hôtel et à domicile à Málaga et Marbella, traite les urgences courantes et fournit des rapports médicaux pour les principales assurances.',
        "medical-tourisme": '<a href="https://medical-tourism-one.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">MedBridge SPAIN</a> est une agence de tourisme médical de luxe reliant les patients internationaux à la meilleure médecine européenne. Gestion complète : chirurgies, transferts privés, hébergement 5 étoiles et conseiller personnel 24/7 en arabe et anglais.'
    },
    ar: {
        edfix: 'EVC - <a href="https://edfix.es" target="_blank" rel="noopener noreferrer" class="project-desc-link">EDfix.es</a> هي صفحة هبوط ذات صفحة واحدة مبنية بـ React لورشة إصلاح أجهزة في مالقة، مرتبطة بقناة EVCanal على يوتيوب. تجمع في مكان واحد جذب العملاء (نموذج طلب عروض أسعار باستخدام EmailJS)، ومعلومات الأعمال (الخدمات، الأسعار، المراجعات، معرض الأعمال، الموقع، والاتصال) ومحتوى تقني (فيديو القناة، أخبار عبر GNews ومنتجات موصى بها). تم تصميمها لتحويل الزيارات إلى طلبات عروض أسعار.',
        wback: 'Wback — واجهة برمجة تطبيقات خلفية (Backend API) للمراسلة في الوقت الفعلي. واجهة برمجة تطبيقات REST قوية وقابلة للتطوير ومحواة (Containerized) مصممة كمحرك لتطبيقات الدردشة والمراسلة. تم تطويرها باستخدام بايثون (Django REST Framework)، وتوفر مصادقة JWT آمنة، وإدارة ملفات تعريف المستخدمين، وتوثيق تلقائي تحت مواصفات OpenAPI 3.0.',
        avisosmedicos: 'قمت بتطوير تطبيق سطح مكتب متعدد المستخدمين موجه لقطاع السياحة الصحية، مصمم للفرق التي تدير التنبيهات الطبية في فنادق كوستا ديل سول. تعمل الأداة على مركزية دورة الحالة بأكملها: من الطلب الأولي (المريض، الفندق، الغرفة، سبب الطوارئ، التأمين، ووكيل السفر) إلى الإغلاق بالتشخيص، ونقل سيارة الإسعاف، ودخول المستشفى. يقوم بإرسال تنبيهات إلى قنوات Microsoft Teams عبر الويب هوكس (webhooks) والبطاقات التكيفية. يتم حفظ البيانات في قاعدة بيانات PostgreSQL مع نسخ احتياطي بتنسيق CSV، مما يتيح العمل الشبكي بين محطات عمل متعددة.',
        "interdoc-web": '<a href="https://visita-domicilio.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">إنتردوكس</a> هي خدمة طبية خاصة متاحة على مدار الساعة للسياح في كوستا ديل سول. تقدم زيارات سريعة للفنادق والمنازل في مالقة وماربيا، وتعالج الحالات الطارئة وتوفر تقارير لشركات تأمين السفر.',
        "medical-tourisme": '<a href="https://medical-tourism-one.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-desc-link">ميدبريدج إسبانيا</a> هي وكالة سياحة طبية فاخرة تربط المرضى الدوليين بأفضل الخدمات الطبية. تقدم إدارة شاملة: عمليات جراحية، نقل خاص، إقامة 5 نجوم، ومستشار شخصي يتحدث العربية 24/7.'
    }
};

const translations = {
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre Mí",
        nav_projects: "Proyectos",
        nav_contact: "Contacto",
        nav_cv: "CV",
        hero_subtitle: "HOLA, SOY",
        hero_name: "Ayoub Khirani",
        hero_role: "Desarrollador Full Stack",
        hero_desc: "Apasionado por la tecnología, construyendo soluciones web funcionales y elegantes. Especializado en Python, Django y React. Siempre aprendiendo y mejorando mis habilidades en el desarrollo de software.",
        btn_projects: "Ver Proyectos",
        about_title: "Sobre Mí",
        about_p1: "<strong>Desarrollador Full Stack</strong> con una base sólida en programación y un interés enorme en crear herramientas digitales. Me considero una persona curiosa, proactiva y que disfruta trabajando en equipo para resolver problemas complejos.",
        about_p2: "Actualmente me enfoco en desarrollar aplicaciones usando tecnologías como <strong>JavaScript, Python y Java</strong>. ¡Estoy buscando mi próxima oportunidad para crecer profesionalmente y aportar valor en un entorno real!",
        projects_title: "Mis Proyectos",
        contact_title: "¿Trabajamos juntos?",
        contact_desc: "Estoy disponible para nuevas oportunidades y proyectos. Si tienes alguna pregunta o simplemente quieres saludar, ¡no dudes en escribirme!",
        contact_btn: "Contactar Ahora",
        download_cv: "Ver CV",
        footer_text: "&copy; 2026 Ayoub Khirani. Todos los derechos reservados.",
        project_default_desc: "Proyecto desarrollado por Ayoub. Visita el repositorio para más detalles.",
        video_fallback_instructions: "Añade un video corto en<br><code>videos/{name}.mp4</code>",
        no_projects_found: "No se encontraron proyectos públicos.",
        color_panel_title: "Color de Acento",
        modal_title: "Enviar Mensaje",
        form_name: "Nombre",
        form_email: "Email",
        form_subject: "Asunto",
        form_message: "Mensaje",
        form_send_btn: "Enviar Mensaje",
        form_placeholder_name: "Tu nombre",
        form_placeholder_email: "tu@email.com",
        form_placeholder_subject: "Asunto del mensaje",
        form_placeholder_message: "Escribe tu mensaje aquí..."
    },
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_contact: "Contact",
        nav_cv: "CV",
        hero_subtitle: "HELLO, I AM",
        hero_name: "Ayoub Khirani",
        hero_role: "Full Stack Developer",
        hero_desc: "Passionate about technology, building functional and elegant web solutions. Specialized in Python, Django, and React. Always learning and improving my software development skills.",
        btn_projects: "View Projects",
        about_title: "About Me",
        about_p1: "<strong>Full Stack Developer</strong> with a solid foundation in programming and a huge interest in creating digital tools. I consider myself a curious, proactive person who enjoys working in a team to solve complex problems.",
        about_p2: "Currently, I focus on developing applications using technologies like <strong>JavaScript, Python, and Java</strong>. I am looking for my next opportunity to grow professionally and add value in a real-world environment!",
        projects_title: "My Projects",
        contact_title: "Let's work together!",
        contact_desc: "I am available for new opportunities and projects. If you have any questions or just want to say hello, don't hesitate to write to me!",
        contact_btn: "Contact Now",
        download_cv: "View CV",
        footer_text: "&copy; 2026 Ayoub Khirani. All rights reserved.",
        project_default_desc: "Project developed by Ayoub. Visit the repository for more details.",
        video_fallback_instructions: "Add a short video at<br><code>videos/{name}.mp4</code>",
        no_projects_found: "No public projects found.",
        color_panel_title: "Accent Color",
        modal_title: "Send Message",
        form_name: "Name",
        form_email: "Email",
        form_subject: "Subject",
        form_message: "Message",
        form_send_btn: "Send Message",
        form_placeholder_name: "Your name",
        form_placeholder_email: "you@email.com",
        form_placeholder_subject: "Message subject",
        form_placeholder_message: "Write your message here..."
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_projects: "Projets",
        nav_contact: "Contact",
        nav_cv: "CV",
        hero_subtitle: "BONJOUR, JE SUIS",
        hero_name: "Ayoub Khirani",
        hero_role: "Développeur Full Stack",
        hero_desc: "Passionné par la technologie, je construis des solutions web fonctionnelles et élégantes. Spécialisé en Python, Django et React. Toujours en train d'apprendre et d'améliorer mes compétences en développement logiciel.",
        btn_projects: "Voir les Projets",
        about_title: "À Propos de Moi",
        about_p1: "<strong>Développeur Full Stack</strong> avec des bases solides en programmation et un grand intérêt pour la création d'outils numériques. Je me considère comme une personne curieuse, proactive et qui aime travailler en équipe pour résoudre des problèmes complexes.",
        about_p2: "Actuellement, je me concentre sur le développement d'applications utilisant des technologies comme <strong>JavaScript, Python et Java</strong>. Je recherche ma prochaine opportunité pour grandir professionnellement et apporter de la valeur dans un environnement réel !",
        projects_title: "Mes Projets",
        contact_title: "Travaillons ensemble !",
        contact_desc: "Je suis disponible pour de nouvelles opportunités et de nouveaux projets. Si vous avez des questions ou si vous voulez simplement dire bonjour, n'hésitez pas à m'écrire !",
        contact_btn: "Contacter Maintenant",
        download_cv: "Voir le CV",
        footer_text: "&copy; 2026 Ayoub Khirani. Tous droits réservés.",
        project_default_desc: "Projet développé par Ayoub. Visitez le dépôt pour plus de détails.",
        video_fallback_instructions: "Ajoutez une courte vidéo dans<br><code>videos/{name}.mp4</code>",
        no_projects_found: "Aucun projet public trouvé.",
        color_panel_title: "Couleur d'Accent",
        modal_title: "Envoyer un Message",
        form_name: "Nom",
        form_email: "E-mail",
        form_subject: "Sujet",
        form_message: "Message",
        form_send_btn: "Envoyer le Message",
        form_placeholder_name: "Votre nom",
        form_placeholder_email: "vous@email.com",
        form_placeholder_subject: "Sujet du message",
        form_placeholder_message: "Écrivez votre message ici..."
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "من أنا",
        nav_projects: "مشاريعي",
        nav_contact: "اتصل بي",
        nav_cv: "السيرة الذاتية",
        hero_subtitle: "مرحباً، أنا",
        hero_name: "أيوب خيراني",
        hero_role: "مطور ويب متكامل",
        hero_desc: "شغوف بالتكنولوجيا، أقوم ببناء حلول ويب عملية وأنيقة. متخصص في بايثون، ديجانغو، ورياكت. دائم التعلم وتحسين مهاراتي في تطوير البرمجيات.",
        btn_projects: "عرض المشاريع",
        about_title: "من أنا",
        about_p1: "<strong>مطور Full Stack</strong> بأساس قوي في البرمجة واهتمام كبير بإنشاء أدوات رقمية. أعتبر نفسي شخصًا فضوليًا واستباقيًا يستمتع بالعمل في فريق لحل المشكلات المعقدة.",
        about_p2: "أركز حالياً على تطوير التطبيقات باستخدام تقنيات مثل <strong>جافا سكريبت، بايثون، وجافا</strong>. أبحث عن فرصتي القادمة للنمو مهنياً وتقديم الإضافة في بيئة عمل حقيقية!",
        projects_title: "مشاريعي",
        contact_title: "هل نعمل معاً؟",
        contact_desc: "أنا متاح للفرص والمشاريع الجديدة. إذا كان لديك أي أسئلة أو تريد فقط إلقاء التحية، فلا تتردد في مراسلتي!",
        contact_btn: "اتصل الآن",
        download_cv: "عرض السيرة الذاتية",
        footer_text: "&copy; 2026 أيوب خيراني. جميع الحقوق محفوظة.",
        project_default_desc: "مشروع من تطوير أيوب. قم بزيارة المستودع لمزيد من التفاصيل.",
        video_fallback_instructions: "أضف مقطع فيديو قصير في<br><code>videos/{name}.mp4</code>",
        no_projects_found: "لم يتم العثور على مشاريع عامة.",
        color_panel_title: "لون المظهر",
        modal_title: "إرسال رسالة",
        form_name: "الاسم",
        form_email: "البريد الإلكتروني",
        form_subject: "الموضوع",
        form_message: "الرسالة",
        form_send_btn: "إرسال الرسالة",
        form_placeholder_name: "اسمك",
        form_placeholder_email: "بريدك@الإلكتروني.com",
        form_placeholder_subject: "موضوع الرسالة",
        form_placeholder_message: "اكتب رسالتك هنا..."
    }
};

let currentRepos = [];

function getLanguageIcon(language) {
    const langLower = (language || "").toLowerCase();
    if (langLower === "javascript") return "fa-brands fa-js";
    if (langLower === "python") return "fa-brands fa-python";
    if (langLower === "java") return "fa-brands fa-java";
    if (langLower === "html") return "fa-brands fa-html5";
    if (langLower === "css") return "fa-brands fa-css3-alt";
    return "fa-solid fa-code";
}

function getVideoSrc(repoName) {
    return projectVideos[repoName] || `videos/${repoName}.mp4`;
}

function setupProjectVideo(video, fallback) {
    const showVideo = () => {
        video.classList.remove("is-hidden");
        fallback.classList.remove("is-visible");
        video.play().catch(err => console.log("Autoplay prevented:", err));
    };

    const showFallback = () => {
        video.classList.add("is-hidden");
        fallback.classList.add("is-visible");
    };

    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("canplay", showVideo);
    video.addEventListener("error", showFallback);

    if (video.readyState >= 2) {
        showVideo();
    } else if (video.error) {
        showFallback();
    }
}

function createProjectCard({ name, description, language, repoUrl, liveUrl, descriptionIsHtml = false, videoInstruction }) {
    const primaryLang = Array.isArray(language) ? language[0] : language;
    const iconClass = getLanguageIcon(primaryLang);
    const videoSrc = getVideoSrc(name);
    const imageSrc = projectImages[name.toLowerCase()];
    const hasImage = Boolean(imageSrc);

    const card = document.createElement("article");
    card.className = "project-card";

    const mediaHTML = hasImage
        ? `<img class="project-image" src="${imageSrc}" alt="Captura de ${name}">`
        : `
            <video class="project-video" autoplay loop muted playsinline preload="auto" aria-label="Demo de ${name}">
                <source src="${videoSrc}" type="video/mp4">
            </video>
            <div class="project-video-fallback">
                <i class="fa-solid fa-circle-play" aria-hidden="true"></i>
                <p>${videoInstruction}</p>
            </div>
        `;

    const tagsArray = Array.isArray(language) ? language : [language];
    const techHTML = tagsArray.map(tech => `<span class="project-tech">${tech}</span>`).join(" ");

    card.innerHTML = `
        <div class="project-body">
            <div class="project-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3 class="project-title">${name}</h3>
            <p class="project-desc"></p>
            <div class="project-meta">
                <div class="project-tech-group">
                    ${techHTML}
                </div>
                <div class="project-links" style="display: flex; gap: 12px; align-items: center;">
                    ${liveUrl ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Visitar sitio web"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                    <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver código en GitHub"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
        <div class="project-media">
            ${mediaHTML}
        </div>
    `;

    const descEl = card.querySelector(".project-desc");
    if (descriptionIsHtml) {
        descEl.innerHTML = description;
    } else {
        descEl.textContent = description;
    }

    if (!hasImage) {
        setupProjectVideo(card.querySelector(".project-video"), card.querySelector(".project-video-fallback"));
    }

    return card;
}

function renderProjects(repos) {
    projectsContainer.innerHTML = "";
    const activeLang = localStorage.getItem("portfolio-lang") || "es";
    
    if (repos.length === 0) {
        const noProjText = translations[activeLang]?.no_projects_found || "No se encontraron proyectos públicos.";
        projectsContainer.innerHTML = `<p>${noProjText}</p>`;
        return;
    }

    repos.forEach((repo) => {
        const repoName = repo.name;
        const repoKey = repoName?.toLowerCase();
        const customDescription = projectDescriptions[activeLang]?.[repoKey];
        const defaultDesc = translations[activeLang]?.project_default_desc || "Proyecto desarrollado por Ayoub. Visita el repositorio para más detalles.";
        const description = customDescription || repo.description || repo.desc || defaultDesc;

        const instrTemplate = translations[activeLang]?.video_fallback_instructions || "Añade un video corto en<br><code>videos/{name}.mp4</code>";
        const videoInstruction = instrTemplate.replace("{name}", repoName);

        const customTags = projectTechTags[repoKey];
        const tags = customTags || (repo.language ? [repo.language] : (repo.lang ? [repo.lang] : ["Code"]));

        const liveUrl = typeof projectLiveUrls !== 'undefined' ? projectLiveUrls[repoKey] : null;

        projectsContainer.appendChild(
            createProjectCard({
                name: repoName,
                description,
                descriptionIsHtml: Boolean(customDescription),
                language: tags,
                repoUrl: repo.html_url || `https://github.com/${githubUsername}/${repoName}`,
                liveUrl: liveUrl,
                videoInstruction,
            })
        );
    });
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const repos = await response.json();
        const validRepos = repos.filter(
            (repo) =>
                !repo.fork &&
                repo.name !== githubUsername &&
                !excludedRepos.includes(repo.name.toLowerCase())
        );

        // Forzar orden específico de proyectos destacados
        validRepos.sort((a, b) => {
            const priority = { "interdoc-web": -3, "medical-tourisme": -2, "avisosmedicos": -1 };
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aPrio = priority[aName] || 0;
            const bPrio = priority[bName] || 0;
            
            if (aPrio !== bPrio) {
                return aPrio - bPrio;
            }
            
            // Si tienen la misma prioridad (0), ordenar por actualización reciente (comportamiento por defecto)
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        currentRepos = validRepos;
        renderProjects(currentRepos);
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);

        const manualRepos = [
            { name: "interdoc-web", lang: "TypeScript", desc: "Interdoc Web (Desplegado en Vercel)" },
            { name: "medical-tourisme", lang: "TypeScript", desc: "Medical Tourisme (Desplegado en Vercel)" },
            { name: "AvisosMedicos", lang: "Python", desc: "Proyecto AvisosMedicos" },
            { name: "edfix", lang: "JavaScript", desc: "Proyecto EVC-EDfix Website" },
            { name: "proyecto", lang: "Java", desc: "Proyecto en Java" },
            { name: "umafactorial", lang: "Java", desc: "Proyecto Umafactorial" },
            { name: "wback", lang: "Python", desc: "Backend wback" },
        ];

        currentRepos = manualRepos;
        renderProjects(currentRepos);
    }
}

// Language selector state and functions
function initLanguage() {
    const savedLang = localStorage.getItem("portfolio-lang") || "es";
    applyLanguage(savedLang);
    setupLanguageSelector();
}

function applyLanguage(lang) {
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    
    // Support RTL for Arabic
    if (lang === "ar") {
        document.documentElement.setAttribute("dir", "rtl");
    } else {
        document.documentElement.setAttribute("dir", "ltr");
    }
    
    // Update translation texts
    const translateElements = document.querySelectorAll("[data-translate]");
    translateElements.forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update translation placeholders
    const translatePlaceholders = document.querySelectorAll("[data-translate-placeholder]");
    translatePlaceholders.forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update active flag button
    const currentFlag = document.getElementById("current-lang-flag");
    if (currentFlag) {
        const flagMap = {
            en: "https://flagcdn.com/gb.svg",
            es: "https://flagcdn.com/es.svg",
            fr: "https://flagcdn.com/fr.svg",
            ar: "https://flagcdn.com/ma.svg"
        };
        currentFlag.src = flagMap[lang] || "https://flagcdn.com/es.svg";
        currentFlag.alt = lang.toUpperCase() + " Flag";
    }

    // Re-render projects if they are already loaded
    if (currentRepos && currentRepos.length > 0) {
        renderProjects(currentRepos);
    }
}

function setupLanguageSelector() {
    const langBtn = document.getElementById("lang-btn");
    const langDropdown = document.getElementById("lang-dropdown");
    const langOptions = document.querySelectorAll(".lang-option");

    if (!langBtn || !langDropdown) return;

    // Toggle dropdown
    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("active");
    });

    // Option selection
    langOptions.forEach(option => {
        option.addEventListener("click", () => {
            const lang = option.getAttribute("data-lang");
            applyLanguage(lang);
            langDropdown.classList.remove("active");
        });
    });

    // Close dropdown on click outside
    document.addEventListener("click", () => {
        langDropdown.classList.remove("active");
    });
}

// Color Switcher Logic
const colorThemes = {
    cyan: {
        primary: "#38bdf8",
        primaryHover: "#0ea5e9",
        primaryGlow: "rgba(56, 189, 248, 0.35)"
    },
    purple: {
        primary: "#a78bfa",
        primaryHover: "#8b5cf6",
        primaryGlow: "rgba(167, 139, 250, 0.35)"
    },
    emerald: {
        primary: "#2dd4bf",
        primaryHover: "#14b8a6",
        primaryGlow: "rgba(45, 212, 191, 0.35)"
    },
    orange: {
        primary: "#fb923c",
        primaryHover: "#f97316",
        primaryGlow: "rgba(251, 146, 60, 0.35)"
    },
    rose: {
        primary: "#fb7185",
        primaryHover: "#f43f5e",
        primaryGlow: "rgba(251, 113, 133, 0.35)"
    }
};

function applyAccentColor(colorName) {
    const theme = colorThemes[colorName] || colorThemes.cyan;
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--primary-hover", theme.primaryHover);
    document.documentElement.style.setProperty("--primary-glow", theme.primaryGlow);
    localStorage.setItem("portfolio-accent", colorName);
    
    // Update active class on color selector buttons
    const colorBtns = document.querySelectorAll(".color-btn");
    colorBtns.forEach(btn => {
        if (btn.getAttribute("data-color") === colorName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function initAccentColor() {
    const savedAccent = localStorage.getItem("portfolio-accent") || "cyan";
    applyAccentColor(savedAccent);
    setupColorSwitcher();
}

function setupColorSwitcher() {
    const container = document.getElementById("color-switcher-container");
    const toggleBtn = document.getElementById("color-toggle-btn");
    const colorBtns = document.querySelectorAll(".color-btn");

    if (!container || !toggleBtn) return;

    // Toggle switcher panel
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.classList.toggle("active");
    });

    // Handle color option clicks
    colorBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const colorName = btn.getAttribute("data-color");
            applyAccentColor(colorName);
            container.classList.remove("active");
        });
    });

    // Close switcher panel when clicking outside
    document.addEventListener("click", () => {
        container.classList.remove("active");
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initAccentColor();
    fetchGitHubProjects();
    setupContactModal();
});

// Contact Modal Functionality with EmailJS
// ⚠️ CONFIGURA TUS CREDENCIALES DE EMAILJS AQUÍ:
const EMAILJS_PUBLIC_KEY = "cYyKyrvoTjm42b1yM";    // Tu Public Key de EmailJS
const EMAILJS_SERVICE_ID = "service_boz3dxg";    // Tu Service ID (Gmail_edfix)
const EMAILJS_TEMPLATE_ID = "template_6tcinqb";  // Tu Template ID (ej: "template_contact")

// Inicializar EmailJS
if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Traducciones para feedback del formulario
const formFeedback = {
    es: { sending: "Enviando...", success: "¡Mensaje enviado! ✓", error: "Error al enviar. Inténtalo de nuevo." },
    en: { sending: "Sending...", success: "Message sent! ✓", error: "Failed to send. Try again." },
    fr: { sending: "Envoi en cours...", success: "Message envoyé ! ✓", error: "Échec de l'envoi. Réessayez." },
    ar: { sending: "جارٍ الإرسال...", success: "تم إرسال الرسالة! ✓", error: "فشل الإرسال. حاول مرة أخرى." }
};

function setupContactModal() {
    const modal = document.getElementById("contact-modal");
    const btnTrigger = document.getElementById("contact-btn-trigger");
    const btnClose = document.getElementById("close-modal");
    const form = document.getElementById("contact-form");

    if (!modal || !btnTrigger || !btnClose || !form) return;

    // Open modal
    btnTrigger.addEventListener("click", () => {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scrolling
    };

    btnClose.addEventListener("click", closeModal);

    // Close modal when clicking outside the content box
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Form submission via EmailJS
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector(".submit-btn");
        const submitText = submitBtn.querySelector("[data-translate]");
        const activeLang = localStorage.getItem("portfolio-lang") || "es";
        const feedback = formFeedback[activeLang] || formFeedback.es;

        // Disable button and show sending state
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        if (submitText) submitText.textContent = feedback.sending;

        const templateParams = {
            from_name: document.getElementById("form-name").value,
            from_email: document.getElementById("form-email").value,
            subject: document.getElementById("form-subject").value,
            message: document.getElementById("form-message").value,
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                // Success
                if (submitText) submitText.textContent = feedback.success;
                submitBtn.style.background = "linear-gradient(45deg, #22c55e, #16a34a)";
                submitBtn.style.opacity = "1";
                form.reset();

                // Reset button and close modal after 2 seconds
                setTimeout(() => {
                    submitBtn.style.background = "";
                    submitBtn.disabled = false;
                    const sendKey = translations[activeLang]?.form_send_btn || "Enviar Mensaje";
                    if (submitText) submitText.textContent = sendKey;
                    closeModal();
                }, 2000);
            })
            .catch((error) => {
                // Error
                console.error("EmailJS error:", error);
                if (submitText) submitText.textContent = feedback.error;
                submitBtn.style.background = "linear-gradient(45deg, #ef4444, #dc2626)";
                submitBtn.style.opacity = "1";

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.style.background = "";
                    submitBtn.disabled = false;
                    const sendKey = translations[activeLang]?.form_send_btn || "Enviar Mensaje";
                    if (submitText) submitText.textContent = sendKey;
                }, 3000);
            });
    });
}

