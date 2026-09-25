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

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Welcome Back! 👋 | Projects - Omnia Ali";
        $("#favicon").attr("href", "../assets/images/hero.png");
        setTimeout(function () {
            document.title = "Projects | Portfolio Omnia Ali Abdelmotleb";
        }, 3000);
    } else {
        document.title = "Come Back To Portfolio ✨";
        $("#favicon").attr("href", "../assets/images/favhand1.png");
    }
});


// fetch projects start
function sanitizeProjects(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(p => p && p.name && !p.name.includes("TAQA GAS") && !p.name.includes("Customer Churn"));
}

async function getProjects() {
    if (typeof syncFromCloud === 'function') {
        let cloudData = await syncFromCloud("projects");
        if (cloudData !== null && Array.isArray(cloudData)) {
            const clean = sanitizeProjects(cloudData);
            if (clean.length !== cloudData.length && typeof syncToCloud === 'function') {
                syncToCloud("projects", clean);
            }
            localStorage.setItem("omnia_portfolio_projects", JSON.stringify(clean));
            return clean;
        }
    }
    const localProjects = localStorage.getItem("omnia_portfolio_projects");
    if (localProjects !== null) {
        try {
            const parsed = JSON.parse(localProjects);
            const clean = sanitizeProjects(parsed);
            if (clean.length !== parsed.length) {
                localStorage.setItem("omnia_portfolio_projects", JSON.stringify(clean));
                if (typeof syncToCloud === 'function') syncToCloud("projects", clean);
            }
            return clean;
        } catch (e) {
            console.error("Error parsing local projects:", e);
        }
    }
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            const clean = sanitizeProjects(data);
            localStorage.setItem("omnia_portfolio_projects", JSON.stringify(clean));
            return clean;
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    if (!projectsContainer) return;
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 1.5rem; width: 100%;">No projects added yet. Add projects from the Admin panel! ✨</div>`;
        return;
    }
    let projectsHTML = "";
    
    // Dynamic Filter buttons population if categories exist
    const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
    const filterGroup = document.getElementById("filters");
    if (filterGroup && categories.length > 0) {
        let filterHTML = `<button class="btn is-checked" data-filter="*">All Projects</button>`;
        categories.forEach(cat => {
            const catClass = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            filterHTML += `<button class="btn" data-filter=".${catClass}">${cat}</button>`;
        });
        filterGroup.innerHTML = filterHTML;
    }

    projects.forEach(project => {
        let catClass = project.category ? project.category.toLowerCase().replace(/[^a-z0-9]/g, '-') : '';
        let imgSrc = project.image.startsWith("http") || project.image.startsWith("data:")
            ? project.image
            : `../assets/images/projects/${project.image}.png`;

        projectsHTML += `
        <div class="grid-item ${catClass}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="${imgSrc}" alt="project" style="width: 100%; height: 210px; object-fit: cover; border-radius: 8px;" />
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
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
});
// fetch projects end