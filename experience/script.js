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
    });
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

const DEFAULT_EXP = [
    { company: "TAQA Gas", role: "Data Analyst & BI Trainee", period: "Corporate Training Program", desc: "Corporate Training Program focusing on Data Analysis and BI Dashboards." },
    { company: "ITI (Information Technology Institute)", role: "Mobile Application Developer | Training", period: "Flutter & Dart Development with Firebase", desc: "Flutter & Dart Development with Firebase real-time integration." },
    { company: "INSTANT", role: "AI & Machine Learning | Diploma", period: "Advanced AI Training Program", desc: "Advanced AI Training Program & Machine Learning Models." },
    { company: "Zewail City", role: "AI & Machine Learning | Diploma", period: "AI Training Program", desc: "Practical AI Training and Deep Learning." }
];

async function getExperienceData() {
    if (typeof syncFromCloud === 'function') {
        const cloudData = await syncFromCloud("experience");
        if (cloudData) {
            localStorage.setItem("omnia_portfolio_experience", JSON.stringify(cloudData));
            return cloudData;
        }
    }
    const localData = localStorage.getItem("omnia_portfolio_experience");
    return localData ? JSON.parse(localData) : DEFAULT_EXP;
}

async function showExperiencePage() {
    const timelineContainer = document.querySelector(".experience .timeline");
    if (!timelineContainer) return;
    const expList = await getExperienceData();
    let html = "";
    expList.forEach((exp, idx) => {
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

// Update Footer Contact Info from Local Storage
function updatePageInfo() {
    const localInfo = localStorage.getItem("omnia_portfolio_info");
    if (!localInfo) return;
    const info = JSON.parse(localInfo);
    if (info.email) {
        document.querySelectorAll(".footer p:contains('envelope'), .share .fa-envelope").forEach(el => {
            if (el.tagName === 'A') el.href = `mailto:${info.email}`;
        });
    }
    if (info.social) {
        document.querySelectorAll(".share .fa-linkedin").forEach(el => el.href = info.social.linkedin || "#");
        document.querySelectorAll(".share .fa-github").forEach(el => el.href = info.social.github || "#");
        document.querySelectorAll(".share .fa-kaggle").forEach(el => el.href = info.social.kaggle || "#");
        document.querySelectorAll(".share .fa-telegram-plane").forEach(el => el.href = info.social.telegram || "#");
    }
}

showExperiencePage();
updatePageInfo();

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.experience .timeline', { delay: 400 });

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Experience | Portfolio Omnia Ali Abdelmotleb";
        }
        else {
            document.title = "Come Back To Portfolio ✨";
        }
    });
