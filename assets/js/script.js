$(document).ready(function () {

    // Initialize EmailJS safely
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        } catch (e) {
            console.warn("EmailJS init warning:", e);
        }
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // Helper function to submit contact form data to Gmail & Firestore
    async function handleFormSubmit(formEl, modalEl) {
        const nameVal = $(formEl).find('[name="name"]').val() || '';
        const emailVal = $(formEl).find('[name="email"]').val() || '';
        const phoneVal = $(formEl).find('[name="phone"]').val() || '';
        const messageVal = $(formEl).find('[name="message"]').val() || '';

        const submitBtn = $(formEl).find('button[type="submit"]');
        const origBtnHtml = submitBtn.html();
        submitBtn.prop('disabled', true).html('إرسال... <i class="fas fa-spinner fa-spin"></i>');

        // 1. Cloud Save Backup to Firebase Firestore & LocalStorage
        if (typeof db !== 'undefined' && db) {
            db.collection("messages").add({
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                message: messageVal,
                createdAt: new Date().toISOString()
            }).catch(e => console.warn("Firestore message save warning:", e));
        }

        try {
            const existing = JSON.parse(localStorage.getItem("omnia_portfolio_messages") || "[]");
            existing.unshift({
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                message: messageVal,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem("omnia_portfolio_messages", JSON.stringify(existing.slice(0, 50)));
        } catch(e) {}

        // 2. Direct Email Delivery to oa741536@gmail.com via FormSubmit AJAX
        try {
            await fetch("https://formsubmit.co/ajax/oa741536@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    phone: phoneVal || 'N/A',
                    message: messageVal,
                    _subject: `📩 New Portfolio Message from ${nameVal}`,
                    _template: "table"
                })
            });
        } catch (err) {
            console.warn("FormSubmit send error:", err);
        }

        submitBtn.prop('disabled', false).html(origBtnHtml);
        formEl.reset();
        if (modalEl) modalEl.classList.remove("active");
        alert("شكراً لك! تم إرسال رسالتك بنجاح إلى البريد الإلكتروني ✨\nThank you! Your message has been sent successfully.");
    }

    // Main Contact Form
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        handleFormSubmit(this, null);
    });

    // Floating Contact Modal Logic
    const modal = document.getElementById("contactModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    if (openBtn) {
        openBtn.onclick = function () {
            modal.classList.add("active");
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.classList.remove("active");
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove("active");
        }
    }

    // Floating contact form submission
    $("#floating-contact-form").submit(function (event) {
        event.preventDefault();
        handleFormSubmit(this, modal);
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Welcome Back! 👋 | Omnia Ali Abdelmotleb";
        $("#favicon").attr("href", "./assets/images/hero.png");
        setTimeout(function () {
            document.title = "Portfolio | Omnia Ali Abdelmotleb";
        }, 3000);
    } else {
        document.title = "Come Back To Portfolio ✨";
        $("#favicon").attr("href", "./assets/images/favhand1.png");
    }
});


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Analysis", "Business Intelligence", "Machine Learning", "AI Development", "Data Visualization"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// Default Fallback Data Objects
const DEFAULT_INFO = {
    name: "Omnia Ali Abdelmotleb",
    title: "Data Analyst & Software Engineer",
    bio: "I am a dual-skilled professional specializing in Data Analysis and Software Engineering. Currently studying at the Faculty of AI & Data Science, Beni Suef National University. I am passionate about transforming complex data into actionable insights and supporting data-driven decision-making. With expertise in Power BI, SQL, Python, and AI/ML frameworks, combined with mobile and web development skills, I don't just analyze data—I build the tools to visualize and leverage it.",
    degree: "Bachelor's in AI & Data Science",
    phone: "+20 11 11394981",
    email: "oa741536@gmail.com",
    location: "Cairo, Egypt",
    resume: "#",
    social: {
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/",
        whatsapp: "https://wa.me/201111394981",
        telegram: "https://t.me/+201111394981"
    }
};

const DEFAULT_EXPERIENCE = [];

const DEFAULT_EDUCATION = [];

async function fetchData(type = "skills") {
    if (type === "skills") {
        let skillsData = null;
        if (typeof syncFromCloud === 'function') {
            skillsData = await syncFromCloud("skills");
        }
        if (!skillsData) {
            const localSkills = localStorage.getItem("omnia_portfolio_skills");
            if (localSkills !== null) {
                try {
                    skillsData = JSON.parse(localSkills);
                } catch (e) {
                    console.error("Error parsing local skills:", e);
                }
            }
        }
        if (!skillsData) {
            try {
                const response = await fetch("skills.json");
                skillsData = await response.json();
            } catch (e) {
                skillsData = [];
            }
        }
        return skillsData || [];
    }

    // Try to sync latest data from Firebase Firestore
    if (typeof syncFromCloud === 'function') {
        let cloudData = await syncFromCloud(type);
        if (cloudData !== null) {
            if (type === "projects") {
                const clean = sanitizeProjects(cloudData);
                if (clean.length !== cloudData.length) {
                    cloudData = clean;
                    if (typeof syncToCloud === 'function') syncToCloud("projects", clean);
                }
            } else if (type === "experience") {
                const clean = sanitizeExperience(cloudData);
                if (clean.length !== cloudData.length) {
                    cloudData = clean;
                    if (typeof syncToCloud === 'function') syncToCloud("experience", clean);
                }
            }
            localStorage.setItem(`omnia_portfolio_${type}`, JSON.stringify(cloudData));
            return cloudData;
        }
    }

    if (type === "info") {
        const localInfo = localStorage.getItem("omnia_portfolio_info");
        return localInfo !== null ? JSON.parse(localInfo) : DEFAULT_INFO;
    } else if (type === "experience") {
        const localExp = localStorage.getItem("omnia_portfolio_experience");
        let parsed = localExp !== null ? JSON.parse(localExp) : DEFAULT_EXPERIENCE;
        return sanitizeExperience(parsed);
    } else if (type === "education") {
        const localEdu = localStorage.getItem("omnia_portfolio_education");
        return localEdu !== null ? JSON.parse(localEdu) : DEFAULT_EDUCATION;
    } else {
        const localProjects = localStorage.getItem("omnia_portfolio_projects");
        if (localProjects !== null) {
            const parsed = JSON.parse(localProjects);
            const clean = sanitizeProjects(parsed);
            if (clean.length !== parsed.length) {
                localStorage.setItem("omnia_portfolio_projects", JSON.stringify(clean));
                if (typeof syncToCloud === 'function') syncToCloud("projects", clean);
            }
            return clean;
        }
        const response = await fetch("./projects/projects.json");
        return await response.json();
    }
}

function sanitizeProjects(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(p => p && p.name && !p.name.includes("TAQA GAS") && !p.name.includes("Customer Churn"));
}

function sanitizeExperience(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(e => e && e.company && e.company !== "TAQA Gas" && e.company !== "INSTANT" && !e.company.includes("Zewail"));
}

function showInfo(info) {
    if (!info) return;

    // Hero Name & Title
    const heroNameElem = document.querySelector(".home .content h2");
    if (heroNameElem && info.name) {
        const parts = info.name.trim().split(" ");
        const firstName = parts[0] || "";
        const lastName = parts.slice(1).join(" ") || "";
        heroNameElem.innerHTML = `Hi There,<br /> I'm ${firstName} ${lastName ? `<span>${lastName}</span>` : ''}`;
    }

    // Name & Title
    const aboutTitleElem = document.querySelector(".about .content h3");
    if (aboutTitleElem && info.name) aboutTitleElem.textContent = `I'm ${info.name}`;

    const aboutTagElem = document.querySelector(".about .content .tag");
    if (aboutTagElem && info.title) aboutTagElem.textContent = info.title;

    // Bio
    const bioElem = document.querySelector(".about .content p");
    if (bioElem && info.bio) bioElem.textContent = info.bio;

    // Contact Details in Box Container
    const degreeElem = document.getElementById("info-degree");
    if (degreeElem && info.degree) degreeElem.textContent = info.degree;

    const phoneElem = document.getElementById("info-phone");
    if (phoneElem && info.phone) phoneElem.textContent = info.phone;

    const emailElem = document.getElementById("info-email");
    if (emailElem && info.email) emailElem.textContent = info.email;

    const placeElem = document.getElementById("info-location");
    if (placeElem && info.location) placeElem.textContent = info.location;

    // Footer Contact Info
    const footerPhone = document.getElementById("footer-phone");
    if (footerPhone && info.phone) footerPhone.textContent = info.phone;

    const footerEmail = document.getElementById("footer-email");
    if (footerEmail && info.email) footerEmail.textContent = info.email;

    const footerLocation = document.getElementById("footer-location");
    if (footerLocation && info.location) footerLocation.textContent = info.location;

    // Resume Button
    const resumeBtn = document.querySelector(".resumebtn a");
    if (resumeBtn && info.resume) resumeBtn.href = info.resume;

    // Social Links
    if (info.social) {
        document.querySelectorAll(".social-icons .linkedin, .share .fa-linkedin").forEach(el => el.href = info.social.linkedin || "#");
        document.querySelectorAll(".social-icons .github, .share .fa-github").forEach(el => el.href = info.social.github || "#");
        document.querySelectorAll(".social-icons .whatsapp, .share .fa-whatsapp").forEach(el => el.href = info.social.whatsapp || "https://wa.me/201111394981");
        document.querySelectorAll(".social-icons .telegram, .share .fa-telegram-plane").forEach(el => el.href = info.social.telegram || "https://t.me/+201111394981");
        document.querySelectorAll(".share .fa-envelope").forEach(el => el.href = `mailto:${info.email}`);
    }
}

function showExperience(experienceList) {
    const timelineContainer = document.querySelector(".experience .timeline");
    if (!timelineContainer) return;
    if (!experienceList || experienceList.length === 0) {
        timelineContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 1.5rem; width: 100%;">No experience added yet. Add experience from the Admin panel! ✨</div>`;
        return;
    }
    let html = "";
    experienceList.forEach((exp, idx) => {
        const sideClass = idx % 2 === 0 ? "right" : "left";
        html += `
        <div class="container ${sideClass}">
          <div class="content">
            <div class="tag">
              <h2>${exp.company}</h2>
            </div>
            <div class="desc">
              <h3>${exp.role}</h3>
              <p>${exp.period}</p>
              ${exp.desc ? `<p style="font-size: 1.2rem; color: #555; margin-top: 0.5rem;">${exp.desc}</p>` : ''}
            </div>
          </div>
        </div>`;
    });
    timelineContainer.innerHTML = html;
}

function showEducation(educationList) {
    const eduContainer = document.querySelector(".education .box-container");
    if (!eduContainer) return;
    if (!educationList || educationList.length === 0) {
        eduContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 1.5rem; width: 100%;">No education added yet. Add education from the Admin panel! ✨</div>`;
        return;
    }
    let html = "";
    educationList.forEach(edu => {
        let imgSrc = edu.image.startsWith("http") || edu.image.startsWith("data:")
            ? edu.image
            : (edu.image.startsWith("./") ? edu.image : `./assets/images/educat/${edu.image}`);
        html += `
        <div class="box">
          <div class="image">
            <img draggable="false" src="${imgSrc}" alt="${edu.title}" onerror="this.src='./assets/images/educat/college.jpg'">
          </div>
          <div class="content">
            <h3>${edu.title}</h3>
            <p>${edu.institution}</p>
            <h4>${edu.period}</h4>
          </div>
        </div>`;
    });
    eduContainer.innerHTML = html;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    if (!skills || skills.length === 0) {
        skillsContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 1.5rem; width: 100%;">No skills added yet. Add skills from the Admin panel! ✨</div>`;
        return;
    }
    let skillHTML = "";
    skills.forEach(skill => {
        let iconSrc = skill.icon.startsWith("http") || skill.icon.startsWith("data:")
            ? skill.icon
            : skill.icon;
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${iconSrc}" alt="${skill.name}" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 1.5rem; width: 100%;">No projects added yet. Add projects from the Admin panel! ✨</div>`;
        return;
    }
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        let imgSrc = project.image.startsWith("http") || project.image.startsWith("data:")
            ? project.image
            : `./assets/images/projects/${project.image}.png`;
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="${imgSrc}" alt="${project.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view || '#'}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code || '#'}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // tilt js
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}

// Initial Fetch & Render Calls
fetchData("info").then(data => showInfo(data));
fetchData("experience").then(data => showExperience(data));
fetchData("education").then(data => showEducation(data));
fetchData("skills").then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));

// Preloader
function loader() {
    const ldr = document.querySelector('.loader-container');
    if (ldr) ldr.classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 400);
}
window.onload = fadeOut;
// pre loader end



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });