$(document).ready(function () {

    // Initialize EmailJS
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

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

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! " + error.text || error.message || "Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

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

    // EmailJS for floating contact form
    $("#floating-contact-form").submit(function (event) {
        emailjs.sendForm('contact_service', 'template_contact', '#floating-contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("floating-contact-form").reset();
                modal.classList.remove("active");
                alert("Message Sent Successfully!");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Message Failed to Send! " + error.text || error.message || "Please try again later.");
            });
        event.preventDefault();
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Omnia Ali Abdelmotleb";
        }
        else {
            document.title = "Come Back To Portfolio ✨";
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
    phone: "+20 1000000000",
    email: "oa741536@gmail.com",
    location: "Cairo, Egypt",
    resume: "#",
    social: {
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/",
        kaggle: "https://www.kaggle.com/",
        telegram: "https://t.me/"
    }
};

const DEFAULT_EXPERIENCE = [
    {
        company: "TAQA Gas",
        role: "Data Analyst & BI Trainee",
        period: "Corporate Training Program",
        desc: "Corporate Training Program focusing on Data Analysis and BI Dashboards."
    },
    {
        company: "ITI (Information Technology Institute)",
        role: "Mobile Application Developer | Training",
        period: "Flutter & Dart Development with Firebase",
        desc: "Flutter & Dart Development with Firebase real-time integration."
    },
    {
        company: "INSTANT",
        role: "AI & Machine Learning | Diploma",
        period: "Advanced AI Training Program",
        desc: "Advanced AI Training Program & Machine Learning Models."
    },
    {
        company: "Zewail City",
        role: "AI & Machine Learning | Diploma",
        period: "AI Training Program",
        desc: "Practical AI Training and Deep Learning."
    }
];

const DEFAULT_EDUCATION = [
    {
        title: "Bachelor's Degree in AI & Data Science",
        institution: "Faculty of AI & Data Science | Beni Suef National University",
        period: "Sept 2022 - June 2026",
        image: "./assets/images/educat/college.jpg"
    },
    {
        title: "AI & Machine Learning Diploma",
        institution: "Zewail City of Science and Technology",
        period: "Completed | AI Training",
        image: "./assets/images/educat/school.jpg"
    }
];

async function fetchData(type = "skills") {
    // Try to sync latest data from Firebase Firestore
    if (typeof syncFromCloud === 'function') {
        const cloudData = await syncFromCloud(type);
        if (cloudData) {
            localStorage.setItem(`omnia_portfolio_${type}`, JSON.stringify(cloudData));
            return cloudData;
        }
    }

    if (type === "info") {
        const localInfo = localStorage.getItem("omnia_portfolio_info");
        return localInfo ? JSON.parse(localInfo) : DEFAULT_INFO;
    } else if (type === "experience") {
        const localExp = localStorage.getItem("omnia_portfolio_experience");
        return localExp ? JSON.parse(localExp) : DEFAULT_EXPERIENCE;
    } else if (type === "education") {
        const localEdu = localStorage.getItem("omnia_portfolio_education");
        return localEdu ? JSON.parse(localEdu) : DEFAULT_EDUCATION;
    } else if (type === "skills") {
        const localSkills = localStorage.getItem("omnia_portfolio_skills");
        if (localSkills) return JSON.parse(localSkills);
        const response = await fetch("skills.json");
        return await response.json();
    } else {
        const localProjects = localStorage.getItem("omnia_portfolio_projects");
        if (localProjects) return JSON.parse(localProjects);
        const response = await fetch("./projects/projects.json");
        return await response.json();
    }
}

function showInfo(info) {
    if (!info) return;
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
        document.querySelectorAll(".social-icons .kaggle, .share .fa-kaggle").forEach(el => el.href = info.social.kaggle || "#");
        document.querySelectorAll(".social-icons .telegram, .share .fa-telegram-plane").forEach(el => el.href = info.social.telegram || "#");
        document.querySelectorAll(".share .fa-envelope").forEach(el => el.href = `mailto:${info.email}`);
    }
}

function showExperience(experienceList) {
    const timelineContainer = document.querySelector(".experience .timeline");
    if (!timelineContainer) return;
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