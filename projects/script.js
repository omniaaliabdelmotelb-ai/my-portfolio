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

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Welcome Back! 👋 | Projects - Omnia Ali";
        $("#favicon").attr("href", "../assets/images/favicon.png");
        setTimeout(function () {
            document.title = "Projects | Portfolio Omnia Ali Abdelmotleb";
        }, 3000);
    } else {
        document.title = "Come Back To Portfolio ✨";
        $("#favicon").attr("href", "../assets/images/favhand1.png");
    }
});


// fetch projects start
async function getProjects() {
    if (typeof syncFromCloud === 'function') {
        const cloudData = await syncFromCloud("projects");
        if (cloudData) {
            localStorage.setItem("omnia_portfolio_projects", JSON.stringify(cloudData));
            return cloudData;
        }
    }
    const localProjects = localStorage.getItem("omnia_portfolio_projects");
    if (localProjects) {
        try {
            return JSON.parse(localProjects);
        } catch (e) {
            console.error("Error parsing local projects:", e);
        }
    }
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
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