// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
    // Only apply custom cursor on non-touch devices
    if (window.innerWidth > 768) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Add a slight delay to the blur effect for a trailing animation
        setTimeout(() => {
            cursorBlur.style.left = e.clientX + "px";
            cursorBlur.style.top = e.clientY + "px";
        }, 50);
    }
});

// Cursor hover effects on links and buttons
const interactables = document.querySelectorAll("a, .btn, .hamburger");

interactables.forEach(item => {
    item.addEventListener("mouseenter", () => {
        if (window.innerWidth > 768) {
            cursor.style.transform = "translate(-50%, -50%) scale(2)";
            cursor.style.backgroundColor = "transparent";
            cursor.style.border = "1px solid var(--primary)";
        }
    });

    item.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            cursor.style.backgroundColor = "var(--primary)";
            cursor.style.border = "none";
        }
    });
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
        navbar.style.background = "rgba(15, 23, 42, 0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
    } else {
        navbar.style.background = "rgba(15, 23, 42, 0.8)";
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

const projectDescriptions = {
    edfix:
        'EVC - <a href="https://edfix.es" target="_blank" rel="noopener noreferrer" class="project-desc-link">EDfix.es</a> es una landing one-page en React para un taller de reparación de dispositivos en Málaga, ligado al canal de YouTube EVCanal. Concentra en un solo sitio la captación de clientes (formulario de presupuesto con EmailJS), la información del negocio (servicios, precios, reseñas, galería de trabajos, ubicación y contacto) y contenido tech (vídeo del canal, noticias vía GNews y productos recomendados). Está pensada para convertir visitas en solicitudes de presupuesto.',
    wback:
        "Wback — Backend API para Mensajería en Tiempo Real. API REST robusta, escalable y contenerizada diseñada como el motor para aplicaciones de chat y mensajería. Desarrollada con Python (Django REST Framework), implementa autenticación JWT segura, gestión de perfiles de usuario y documentación automática bajo OpenAPI 3.0.",
    avisosmedicos:
        "Desarrollé una aplicación de escritorio multiusuario orientada al sector sanitario-turístico, pensada para equipos que gestionan avisos médicos en hoteles de la Costa del Sol. La herramienta centraliza todo el ciclo de un caso: desde la solicitud inicial (paciente, hotel, habitación, motivo de urgencia, seguro y touroperador) hasta el cierre con diagnóstico, traslado en ambulancia e ingreso hospitalario. Se realiza el envío de alertas a canales de Microsoft Teams mediante webhooks y tarjetas adaptativas. Los datos se persisten en PostgreSQL con respaldo en CSV, lo que permite trabajo en red entre varios puestos.",
};

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

function createProjectCard({ name, description, language, repoUrl, descriptionIsHtml = false }) {
    const iconClass = getLanguageIcon(language);
    const videoSrc = getVideoSrc(name);
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
        <div class="project-body">
            <div class="project-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3 class="project-title">${name}</h3>
            <p class="project-desc"></p>
            <div class="project-meta">
                <span class="project-tech">${language}</span>
                <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver código en GitHub"><i class="fa-brands fa-github"></i></a>
            </div>
        </div>
        <div class="project-media">
            <video class="project-video" controls playsinline preload="metadata" aria-label="Demo de ${name}">
                <source src="${videoSrc}" type="video/mp4">
            </video>
            <div class="project-video-fallback">
                <i class="fa-solid fa-circle-play" aria-hidden="true"></i>
                <p>Añade un video corto en<br><code>videos/${name}.mp4</code></p>
            </div>
        </div>
    `;

    const descEl = card.querySelector(".project-desc");
    if (descriptionIsHtml) {
        descEl.innerHTML = description;
    } else {
        descEl.textContent = description;
    }

    setupProjectVideo(card.querySelector(".project-video"), card.querySelector(".project-video-fallback"));

    return card;
}

function renderProjects(repos) {
    projectsContainer.innerHTML = "";
    repos.forEach((repo) => {
        const repoName = repo.name;
        const repoKey = repoName?.toLowerCase();
        const customDescription = projectDescriptions[repoKey];
        const description =
            customDescription ||
            repo.description ||
            repo.desc ||
            "Proyecto desarrollado por Ayoub. Visita el repositorio para más detalles.";

        projectsContainer.appendChild(
            createProjectCard({
                name: repoName,
                description,
                descriptionIsHtml: Boolean(customDescription),
                language: repo.language || repo.lang || "Code",
                repoUrl: repo.html_url || `https://github.com/${githubUsername}/${repoName}`,
            })
        );
    });
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
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

        if (validRepos.length === 0) {
            projectsContainer.innerHTML = "<p>No se encontraron proyectos públicos.</p>";
            return;
        }

        renderProjects(validRepos);
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);

        const manualRepos = [
            { name: "edfix", lang: "JavaScript", desc: "Proyecto EVC-EDfix Website" },
            { name: "proyecto", lang: "Java", desc: "Proyecto en Java" },
            { name: "umafactorial", lang: "Java", desc: "Proyecto Umafactorial" },
            { name: "wback", lang: "Python", desc: "Backend wback" },
        ];

        renderProjects(manualRepos);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});
