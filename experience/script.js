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

    // Helper function to submit contact form data to Gmail & Firestore
    async function handleFormSubmit(formEl, modalEl) {
        const nameVal = $(formEl).find('[name="name"]').val() || '';
        const emailVal = $(formEl).find('[name="email"]').val() || '';
        const phoneVal = $(formEl).find('[name="phone"]').val() || '';
        const messageVal = $(formEl).find('[name="message"]').val() || '';

        const submitBtn = $(formEl).find('button[type="submit"]');
        const origBtnHtml = submitBtn.html();
        submitBtn.prop('disabled', true).html('إرسال... <i class="fas fa-spinner fa-spin"></i>');

        // 1. Cloud Save Backup to Firebase Firestore
        if (typeof db !== 'undefined' && db) {
            db.collection("messages").add({
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                message: messageVal,
                createdAt: new Date().toISOString()
            }).catch(e => console.warn("Firestore message save warning:", e));
        }

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

    // Floating contact form submission
    $("#floating-contact-form").submit(function (event) {
        event.preventDefault();
        handleFormSubmit(this, modal);
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
        document.querySelectorAll(".share .fa-whatsapp").forEach(el => el.href = info.social.whatsapp || "https://wa.me/201111394981");
        document.querySelectorAll(".share .fa-telegram-plane").forEach(el => el.href = info.social.telegram || "https://t.me/+201111394981");
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

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Welcome Back! 👋 | Experience - Omnia Ali";
        $("#favicon").attr("href", "../assets/images/hero.png");
        setTimeout(function () {
            document.title = "Experience | Portfolio Omnia Ali Abdelmotleb";
        }, 3000);
    } else {
        document.title = "Come Back To Portfolio ✨";
        $("#favicon").attr("href", "../assets/images/favhand1.png");
    }
});
