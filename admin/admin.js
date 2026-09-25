// Omnia Portfolio Admin Portal Logic - Multi-Section Manager

const ADMIN_PASSCODE = "omnia123";
const KEYS = {
    PROJECTS: "omnia_portfolio_projects",
    EXPERIENCE: "omnia_portfolio_experience",
    EDUCATION: "omnia_portfolio_education",
    SKILLS: "omnia_portfolio_skills",
    INFO: "omnia_portfolio_info",
    CLOUDINARY: "omnia_cloudinary_settings"
};

// Fallback Defaults
const DEFAULTS = {
    PROJECTS: [
        {
            name: "TAQA GAS | Data Analytics",
            desc: "Data analytics project 📊\nUsing Python, SQL, and Power BI, cleaning and exploring a customer dataset to extract key actionable insights.",
            image: "Taqa1_Dashboard",
            category: "Data Analysis",
            links: { view: "#", code: "#" }
        },
        {
            name: "Customer Churn Analysis",
            desc: "Completed an end-to-end Customer Churn Analysis project using the Telco Customer Churn dataset, combining Python for data analysis and Power BI for interactive dashboards.",
            image: "churn_square_collage",
            category: "Data Analysis",
            links: { view: "#", code: "#" }
        }
    ],
    EXPERIENCE: [
        { company: "TAQA Gas", role: "Data Analyst & BI Trainee", period: "Corporate Training Program", desc: "Corporate Training Program focusing on Data Analysis and BI Dashboards." },
        { company: "ITI (Information Technology Institute)", role: "Mobile Application Developer | Training", period: "Flutter & Dart Development with Firebase", desc: "Flutter & Dart Development with Firebase real-time integration." },
        { company: "INSTANT", role: "AI & Machine Learning | Diploma", period: "Advanced AI Training Program", desc: "Advanced AI Training Program & Machine Learning Models." },
        { company: "Zewail City", role: "AI & Machine Learning | Diploma", period: "AI Training Program", desc: "Practical AI Training and Deep Learning." }
    ],
    EDUCATION: [
        { title: "Bachelor's Degree in AI & Data Science", institution: "Faculty of AI & Data Science | Beni Suef National University", period: "Sept 2022 - June 2026", image: "./assets/images/educat/college.jpg" },
        { title: "AI & Machine Learning Diploma", institution: "Zewail City of Science and Technology", period: "Completed | AI Training", image: "./assets/images/educat/school.jpg" }
    ],
    SKILLS: [
        { name: "C#", icon: "https://img.icons8.com/color/48/000000/c-sharp-logo.png" },
        { name: ".NET Core", icon: "https://img.icons8.com/color/48/000000/net-framework.png" },
        { name: "ASP.NET Core", icon: "https://img.icons8.com/color/48/000000/code.png" },
        { name: "REST API", icon: "https://img.icons8.com/color/48/000000/api.png" },
        { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
        { name: "SQL", icon: "https://img.icons8.com/color/48/000000/sql.png" },
        { name: "Power BI", icon: "https://img.icons8.com/color/48/000000/power-bi.png" },
        { name: "Excel", icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png" },
        { name: "TensorFlow", icon: "https://img.icons8.com/color/48/000000/tensorflow.png" },

        { name: "Flutter", icon: "https://img.icons8.com/color/48/000000/flutter.png" },
        { name: "Dart", icon: "https://img.icons8.com/color/48/000000/dart.png" },
        { name: "Firebase", icon: "https://img.icons8.com/color/48/000000/firebase.png" },
        { name: "C++", icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png" },
        { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "Machine Learning", icon: "https://img.icons8.com/color/48/000000/artificial-intelligence.png" },
        { name: "Deep Learning", icon: "https://img.icons8.com/?size=48&id=4dqHoNQ5CC3L&format=gif&color=f7f7f7" },
        { name: "NLP", icon: "https://img.icons8.com/?size=48&id=aHClp8f4SBQL&format=png&color=FFFFFF" },
        { name: "Computer Vision", icon: "https://img.icons8.com/?size=48&id=HmVEHUWVK3M8&format=png&color=FFFFFF" },
        { name: "Data Visualization", icon: "https://img.icons8.com/color/48/000000/combo-chart--v1.png" },
        { name: "Data Analysis", icon: "https://img.icons8.com/color/48/000000/data-configuration.png" },
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png" }
    ],
    INFO: {
        name: "Omnia Ali Abdelmotleb",
        title: "Data Analyst & Software Engineer",
        bio: "I am a dual-skilled professional specializing in Data Analysis and Software Engineering. Currently studying at the Faculty of AI & Data Science, Beni Suef National University. I am passionate about transforming complex data into actionable insights and supporting data-driven decision-making.",
        degree: "Bachelor's in AI & Data Science",
        phone: "+20 11 11394981",
        email: "oa741536@gmail.com",
        location: "Cairo, Egypt",
        resume: "#",
        social: {
            linkedin: "https://www.linkedin.com/",
            github: "https://github.com/",
            kaggle: "https://www.kaggle.com/",
            whatsapp: "https://wa.me/201111394981",
            telegram: "https://t.me/+201111394981"
        }
    },
    CLOUDINARY: {
        cloudName: "bkcdxgfn",
        apiKey: "924178639143499",
        apiSecret: "sGJ92vwsMufqojNMEs6kQtTzwRQ",
        uploadPreset: "ml_default"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    checkAuth();
    initAuthForm();
    initTabs();
    initCloudinaryUploadTriggers();
    initProjectsManager();
    initExperienceManager();
    initEducationManager();
    initSkillsManager();
    initInfoManager();
    initCloudinarySettings();
    initMessagesManager();
});

// Theme Manager (Dark / Light Mode)
function initThemeManager() {
    const savedTheme = localStorage.getItem("omnia_admin_theme") || "dark";
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const authThemeBtn = document.getElementById("auth-theme-btn");

    function toggleTheme() {
        const isLight = document.body.classList.contains("light-mode");
        const newTheme = isLight ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("omnia_admin_theme", newTheme);
        showToast(`Switched to ${newTheme === "light" ? "Light" : "Dark"} Mode ✨`);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }
    if (authThemeBtn) {
        authThemeBtn.addEventListener("click", toggleTheme);
    }
}

function applyTheme(theme) {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const authThemeBtn = document.getElementById("auth-theme-btn");

    if (theme === "light") {
        document.body.classList.add("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i> <span id="theme-text">Dark Mode</span>`;
        }
        if (authThemeBtn) {
            authThemeBtn.innerHTML = `<i class="fas fa-moon"></i>`;
        }
    } else {
        document.body.classList.remove("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i> <span id="theme-text">Light Mode</span>`;
        }
        if (authThemeBtn) {
            authThemeBtn.innerHTML = `<i class="fas fa-sun"></i>`;
        }
    }
}

// Authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem("omnia_admin_logged_in") === "true";
    document.getElementById("auth-modal").style.display = isAuthenticated ? "none" : "flex";
    document.getElementById("admin-app").style.display = isAuthenticated ? "flex" : "none";
    if (isAuthenticated) loadAllAdminData();
}

function initAuthForm() {
    document.getElementById("auth-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const pass = document.getElementById("admin-passcode").value;
        if (pass === ADMIN_PASSCODE) {
            sessionStorage.setItem("omnia_admin_logged_in", "true");
            checkAuth();
            showToast("Welcome back, Omnia! Admin unlocked.");
        } else {
            const err = document.getElementById("auth-error");
            err.textContent = "Incorrect password. Try again!";
            err.style.display = "block";
        }
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        sessionStorage.removeItem("omnia_admin_logged_in");
        checkAuth();
    });
}

// Tab Switching
function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            const targetId = btn.getAttribute("data-tab");
            document.getElementById(targetId).classList.add("active");
        });
    });
}

// Data Loaders
function loadAllAdminData() {
    renderProjects();
    renderExperience();
    renderEducation();
    renderSkills();
    renderInfo();
    loadCloudinarySettings();
    renderMessages();
}

function getData(key, fallback) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    
    // Sync to Firebase Cloud if available
    if (typeof syncToCloud === 'function') {
        const docName = key.replace("omnia_portfolio_", "");
        syncToCloud(docName, data);
    }
}

// SHA-1 helper for Cloudinary signed uploads
async function sha1Hex(str) {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-1', enc.encode(str));
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Direct File Upload to Cloudinary (Signed with API Secret or Unsigned with Preset)
async function uploadFileDirectToCloudinary(file) {
    const cld = getData(KEYS.CLOUDINARY, DEFAULTS.CLOUDINARY);
    const cloudName = cld.cloudName || "bkcdxgfn";
    const apiKey = cld.apiKey || "924178639143499";
    const apiSecret = cld.apiSecret || "sGJ92vwsMufqojNMEs6kQtTzwRQ";
    const uploadPreset = cld.uploadPreset;

    const formData = new FormData();
    formData.append("file", file);

    if (apiSecret && apiKey) {
        const timestamp = Math.floor(Date.now() / 1000);
        const toSign = `timestamp=${timestamp}${apiSecret}`;
        const signature = await sha1Hex(toSign);

        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
    } else {
        formData.append("upload_preset", uploadPreset || "ml_default");
    }

    showToast("Uploading to Cloudinary... please wait");

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    const response = await fetch(endpoint, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.secure_url) {
        return result.secure_url;
    } else {
        throw new Error(result.error ? result.error.message : "Cloudinary upload failed");
    }
}

// Cloudinary Upload Triggering
function initCloudinaryUploadTriggers() {
    // Hidden file input for direct file picking
    let fileInput = document.getElementById("hidden-cld-file-picker");
    if (!fileInput) {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.id = "hidden-cld-file-picker";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);
    }

    let activeTargetInputId = null;

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".cld-trigger");
        if (!btn) return;
        activeTargetInputId = btn.getAttribute("data-target");
        fileInput.value = "";
        fileInput.click();
    });

    fileInput.addEventListener("change", async () => {
        if (!fileInput.files || fileInput.files.length === 0 || !activeTargetInputId) return;
        const file = fileInput.files[0];
        const targetInput = document.getElementById(activeTargetInputId);

        try {
            const url = await uploadFileDirectToCloudinary(file);
            if (targetInput) {
                targetInput.value = url;
                if (activeTargetInputId === "proj-image") {
                    const prev = document.getElementById("proj-img-preview");
                    if (prev) prev.innerHTML = `<img src="${url}" alt="Preview" style="max-height:120px; border-radius:8px; margin-top:0.5rem;">`;
                }
            }
            showToast("Uploaded to Cloudinary successfully! ✨");
        } catch (err) {
            console.error("Direct upload error:", err);
            // Fallback to Cloudinary Widget
            const cld = getData(KEYS.CLOUDINARY, DEFAULTS.CLOUDINARY);
            if (typeof cloudinary !== 'undefined') {
                const widget = cloudinary.createUploadWidget({
                    cloudName: cld.cloudName || "bkcdxgfn",
                    apiKey: cld.apiKey || "924178639143499",
                    uploadPreset: cld.uploadPreset || "ml_default",
                    sources: ['local', 'url', 'camera'],
                    multiple: false
                }, (error, result) => {
                    if (!error && result && result.event === "success") {
                        if (targetInput) targetInput.value = result.info.secure_url;
                        showToast("Uploaded via Cloudinary Widget! ✨");
                    }
                });
                widget.open();
            } else {
                alert("Upload failed: " + err.message + "\nYou can also paste any image URL directly.");
            }
        }
    });
}

// 1. PROJECTS MANAGER
function renderProjects() {
    const projects = getData(KEYS.PROJECTS, DEFAULTS.PROJECTS);
    const tbody = document.getElementById("projects-table-body");
    if (!tbody) return;
    if (projects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 1.5rem;">No projects. Add one!</td></tr>`;
        return;
    }
    let html = "";
    projects.forEach((p, idx) => {
        let imgSrc = p.image.startsWith("http") || p.image.startsWith("data:") ? p.image : `../assets/images/projects/${p.image}.png`;
        html += `
        <tr>
            <td><img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/80x60'"></td>
            <td><strong>${p.name}</strong><br><span style="font-size:0.8rem; color:#94a3b8">${p.desc.substring(0, 45)}...</span></td>
            <td><span class="btn btn-sm btn-outline">${p.category}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-sm btn-primary" onclick="editProject(${idx})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject(${idx})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function initProjectsManager() {
    document.getElementById("project-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("proj-id").value;
        const projects = getData(KEYS.PROJECTS, DEFAULTS.PROJECTS);
        const item = {
            name: document.getElementById("proj-name").value.trim(),
            category: document.getElementById("proj-category").value.trim(),
            desc: document.getElementById("proj-desc").value.trim(),
            image: document.getElementById("proj-image").value.trim(),
            links: {
                view: document.getElementById("proj-link-view").value.trim() || "#",
                code: document.getElementById("proj-link-code").value.trim() || "#"
            }
        };
        if (id !== "") projects[parseInt(id)] = item;
        else projects.unshift(item);
        
        setData(KEYS.PROJECTS, projects);
        resetProjForm();
        renderProjects();
        showToast("Project saved!");
    });

    document.getElementById("proj-cancel-btn").addEventListener("click", resetProjForm);
    document.getElementById("reset-projects-btn").addEventListener("click", () => {
        if (confirm("Reset projects to default?")) {
            localStorage.removeItem(KEYS.PROJECTS);
            renderProjects();
            showToast("Projects reset to default!");
        }
    });
}

function resetProjForm() {
    document.getElementById("project-form").reset();
    document.getElementById("proj-id").value = "";
    document.getElementById("proj-form-title").innerHTML = `<i class="fas fa-plus-circle"></i> Add New Project`;
    document.getElementById("proj-cancel-btn").style.display = "none";
}

window.editProject = function(idx) {
    const projects = getData(KEYS.PROJECTS, DEFAULTS.PROJECTS);
    const p = projects[idx];
    if (!p) return;
    document.getElementById("proj-id").value = idx;
    document.getElementById("proj-name").value = p.name;
    document.getElementById("proj-category").value = p.category;
    document.getElementById("proj-desc").value = p.desc;
    document.getElementById("proj-image").value = p.image;
    document.getElementById("proj-link-view").value = p.links ? p.links.view : "";
    document.getElementById("proj-link-code").value = p.links ? p.links.code : "";
    document.getElementById("proj-form-title").innerHTML = `<i class="fas fa-edit"></i> Edit Project`;
    document.getElementById("proj-cancel-btn").style.display = "inline-flex";
};

window.deleteProject = function(idx) {
    if (confirm("Delete this project?")) {
        const projects = getData(KEYS.PROJECTS, DEFAULTS.PROJECTS);
        projects.splice(idx, 1);
        setData(KEYS.PROJECTS, projects);
        renderProjects();
        showToast("Project deleted!");
    }
};

// 2. EXPERIENCE MANAGER
function renderExperience() {
    const expList = getData(KEYS.EXPERIENCE, DEFAULTS.EXPERIENCE);
    const tbody = document.getElementById("experience-table-body");
    if (!tbody) return;
    if (expList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 1.5rem;">No experience entries.</td></tr>`;
        return;
    }
    let html = "";
    expList.forEach((e, idx) => {
        html += `
        <tr>
            <td><strong>${e.company}</strong></td>
            <td>${e.role}</td>
            <td><span class="btn btn-sm btn-outline">${e.period}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-sm btn-primary" onclick="editExperience(${idx})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExperience(${idx})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function initExperienceManager() {
    document.getElementById("experience-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("exp-id").value;
        const expList = getData(KEYS.EXPERIENCE, DEFAULTS.EXPERIENCE);
        const item = {
            company: document.getElementById("exp-company").value.trim(),
            role: document.getElementById("exp-role").value.trim(),
            period: document.getElementById("exp-period").value.trim(),
            desc: document.getElementById("exp-desc").value.trim()
        };
        if (id !== "") expList[parseInt(id)] = item;
        else expList.unshift(item);

        setData(KEYS.EXPERIENCE, expList);
        resetExpForm();
        renderExperience();
        showToast("Experience saved!");
    });

    document.getElementById("exp-cancel-btn").addEventListener("click", resetExpForm);
    document.getElementById("reset-exp-btn").addEventListener("click", () => {
        if (confirm("Reset experience to default?")) {
            localStorage.removeItem(KEYS.EXPERIENCE);
            renderExperience();
            showToast("Experience reset to default!");
        }
    });
}

function resetExpForm() {
    document.getElementById("experience-form").reset();
    document.getElementById("exp-id").value = "";
    document.getElementById("exp-form-title").innerHTML = `<i class="fas fa-plus-circle"></i> Add Experience`;
    document.getElementById("exp-cancel-btn").style.display = "none";
}

window.editExperience = function(idx) {
    const expList = getData(KEYS.EXPERIENCE, DEFAULTS.EXPERIENCE);
    const e = expList[idx];
    if (!e) return;
    document.getElementById("exp-id").value = idx;
    document.getElementById("exp-company").value = e.company;
    document.getElementById("exp-role").value = e.role;
    document.getElementById("exp-period").value = e.period;
    document.getElementById("exp-desc").value = e.desc || "";
    document.getElementById("exp-form-title").innerHTML = `<i class="fas fa-edit"></i> Edit Experience`;
    document.getElementById("exp-cancel-btn").style.display = "inline-flex";
};

window.deleteExperience = function(idx) {
    if (confirm("Delete this experience entry?")) {
        const expList = getData(KEYS.EXPERIENCE, DEFAULTS.EXPERIENCE);
        expList.splice(idx, 1);
        setData(KEYS.EXPERIENCE, expList);
        renderExperience();
        showToast("Experience deleted!");
    }
};

// 3. EDUCATION MANAGER
function renderEducation() {
    const eduList = getData(KEYS.EDUCATION, DEFAULTS.EDUCATION);
    const tbody = document.getElementById("education-table-body");
    if (!tbody) return;
    if (eduList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 1.5rem;">No education records.</td></tr>`;
        return;
    }
    let html = "";
    eduList.forEach((ed, idx) => {
        html += `
        <tr>
            <td><strong>${ed.title}</strong></td>
            <td>${ed.institution}</td>
            <td><span class="btn btn-sm btn-outline">${ed.period}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-sm btn-primary" onclick="editEducation(${idx})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEducation(${idx})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function initEducationManager() {
    document.getElementById("education-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("edu-id").value;
        const eduList = getData(KEYS.EDUCATION, DEFAULTS.EDUCATION);
        const item = {
            title: document.getElementById("edu-title").value.trim(),
            institution: document.getElementById("edu-institution").value.trim(),
            period: document.getElementById("edu-period").value.trim(),
            image: document.getElementById("edu-image").value.trim() || "./assets/images/educat/college.jpg"
        };
        if (id !== "") eduList[parseInt(id)] = item;
        else eduList.unshift(item);

        setData(KEYS.EDUCATION, eduList);
        resetEduForm();
        renderEducation();
        showToast("Education saved!");
    });

    document.getElementById("edu-cancel-btn").addEventListener("click", resetEduForm);
    document.getElementById("reset-edu-btn").addEventListener("click", () => {
        if (confirm("Reset education to default?")) {
            localStorage.removeItem(KEYS.EDUCATION);
            renderEducation();
            showToast("Education reset to default!");
        }
    });
}

function resetEduForm() {
    document.getElementById("education-form").reset();
    document.getElementById("edu-id").value = "";
    document.getElementById("edu-form-title").innerHTML = `<i class="fas fa-plus-circle"></i> Add Education`;
    document.getElementById("edu-cancel-btn").style.display = "none";
}

window.editEducation = function(idx) {
    const eduList = getData(KEYS.EDUCATION, DEFAULTS.EDUCATION);
    const ed = eduList[idx];
    if (!ed) return;
    document.getElementById("edu-id").value = idx;
    document.getElementById("edu-title").value = ed.title;
    document.getElementById("edu-institution").value = ed.institution;
    document.getElementById("edu-period").value = ed.period;
    document.getElementById("edu-image").value = ed.image || "";
    document.getElementById("edu-form-title").innerHTML = `<i class="fas fa-edit"></i> Edit Education`;
    document.getElementById("edu-cancel-btn").style.display = "inline-flex";
};

window.deleteEducation = function(idx) {
    if (confirm("Delete this education record?")) {
        const eduList = getData(KEYS.EDUCATION, DEFAULTS.EDUCATION);
        eduList.splice(idx, 1);
        setData(KEYS.EDUCATION, eduList);
        renderEducation();
        showToast("Education deleted!");
    }
};

// 4. SKILLS MANAGER
function renderSkills() {
    const skills = getData(KEYS.SKILLS, DEFAULTS.SKILLS);
    const tbody = document.getElementById("skills-table-body");
    if (!tbody) return;
    if (skills.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 1.5rem;">No skills.</td></tr>`;
        return;
    }
    let html = "";
    skills.forEach((s, idx) => {
        html += `
        <tr>
            <td><img src="${s.icon}" width="30" height="30" onerror="this.src='https://img.icons8.com/color/48/000000/code.png'"></td>
            <td><strong>${s.name}</strong></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-sm btn-primary" onclick="editSkill(${idx})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSkill(${idx})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function initSkillsManager() {
    document.getElementById("skill-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("skill-id").value;
        const skills = getData(KEYS.SKILLS, DEFAULTS.SKILLS);
        const item = {
            name: document.getElementById("skill-name").value.trim(),
            icon: document.getElementById("skill-icon").value.trim()
        };
        if (id !== "") skills[parseInt(id)] = item;
        else skills.push(item);

        setData(KEYS.SKILLS, skills);
        resetSkillForm();
        renderSkills();
        showToast("Skill saved!");
    });

    document.getElementById("skill-cancel-btn").addEventListener("click", resetSkillForm);
    document.getElementById("reset-skills-btn").addEventListener("click", () => {
        if (confirm("Reset skills to default?")) {
            localStorage.removeItem(KEYS.SKILLS);
            renderSkills();
            showToast("Skills reset to default!");
        }
    });
}

function resetSkillForm() {
    document.getElementById("skill-form").reset();
    document.getElementById("skill-id").value = "";
    document.getElementById("skill-form-title").innerHTML = `<i class="fas fa-plus-circle"></i> Add Skill`;
    document.getElementById("skill-cancel-btn").style.display = "none";
}

window.editSkill = function(idx) {
    const skills = getData(KEYS.SKILLS, DEFAULTS.SKILLS);
    const s = skills[idx];
    if (!s) return;
    document.getElementById("skill-id").value = idx;
    document.getElementById("skill-name").value = s.name;
    document.getElementById("skill-icon").value = s.icon;
    document.getElementById("skill-form-title").innerHTML = `<i class="fas fa-edit"></i> Edit Skill`;
    document.getElementById("skill-cancel-btn").style.display = "inline-flex";
};

window.deleteSkill = function(idx) {
    if (confirm("Delete this skill?")) {
        const skills = getData(KEYS.SKILLS, DEFAULTS.SKILLS);
        skills.splice(idx, 1);
        setData(KEYS.SKILLS, skills);
        renderSkills();
        showToast("Skill deleted!");
    }
};

// 5. PERSONAL INFO MANAGER
function renderInfo() {
    const info = getData(KEYS.INFO, DEFAULTS.INFO);
    document.getElementById("info-name").value = info.name || "";
    document.getElementById("info-title").value = info.title || "";
    document.getElementById("info-bio").value = info.bio || "";
    document.getElementById("info-deg").value = info.degree || "";
    document.getElementById("info-ph").value = info.phone || "";
    document.getElementById("info-em").value = info.email || "";
    document.getElementById("info-loc").value = info.location || "";
    document.getElementById("info-res").value = info.resume || "";

    if (info.social) {
        if (document.getElementById("social-linkedin")) document.getElementById("social-linkedin").value = info.social.linkedin || "";
        if (document.getElementById("social-github")) document.getElementById("social-github").value = info.social.github || "";
        if (document.getElementById("social-kaggle")) document.getElementById("social-kaggle").value = info.social.kaggle || "";
        if (document.getElementById("social-whatsapp")) document.getElementById("social-whatsapp").value = info.social.whatsapp || "https://wa.me/201111394981";
        if (document.getElementById("social-telegram")) document.getElementById("social-telegram").value = info.social.telegram || "https://t.me/+201111394981";
    }
}

function initInfoManager() {
    document.getElementById("info-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const info = {
            name: document.getElementById("info-name").value.trim(),
            title: document.getElementById("info-title").value.trim(),
            bio: document.getElementById("info-bio").value.trim(),
            degree: document.getElementById("info-deg").value.trim(),
            phone: document.getElementById("info-ph").value.trim(),
            email: document.getElementById("info-em").value.trim(),
            location: document.getElementById("info-loc").value.trim(),
            resume: document.getElementById("info-res").value.trim() || "#",
            social: {
                linkedin: document.getElementById("social-linkedin") ? document.getElementById("social-linkedin").value.trim() : "",
                github: document.getElementById("social-github") ? document.getElementById("social-github").value.trim() : "",
                kaggle: document.getElementById("social-kaggle") ? document.getElementById("social-kaggle").value.trim() : "",
                whatsapp: document.getElementById("social-whatsapp") ? document.getElementById("social-whatsapp").value.trim() : "https://wa.me/201111394981",
                telegram: document.getElementById("social-telegram") ? document.getElementById("social-telegram").value.trim() : "https://t.me/+201111394981"
            }
        };
        setData(KEYS.INFO, info);
        showToast("Personal information updated!");
    });
}

// 6. CLOUDINARY SETTINGS
function loadCloudinarySettings() {
    const cld = getData(KEYS.CLOUDINARY, DEFAULTS.CLOUDINARY);
    if (cld.cloudName) document.getElementById("cld-cloud-name").value = cld.cloudName;
    if (cld.apiKey) document.getElementById("cld-api-key").value = cld.apiKey;
    if (cld.apiSecret) document.getElementById("cld-api-secret").value = cld.apiSecret;
    if (cld.uploadPreset) document.getElementById("cld-upload-preset").value = cld.uploadPreset;
}

function initCloudinarySettings() {
    document.getElementById("cloudinary-settings-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const cloudName = document.getElementById("cld-cloud-name").value.trim() || "bkcdxgfn";
        const apiKey = document.getElementById("cld-api-key").value.trim() || "924178639143499";
        const apiSecret = document.getElementById("cld-api-secret").value.trim() || "sGJ92vwsMufqojNMEs6kQtTzwRQ";
        const uploadPreset = document.getElementById("cld-upload-preset").value.trim() || "ml_default";

        setData(KEYS.CLOUDINARY, { cloudName, apiKey, apiSecret, uploadPreset });
        showToast("Cloudinary credentials saved successfully! ✨");
    });

    const testBtn = document.getElementById("test-cld-upload-btn");
    if (testBtn) {
        testBtn.addEventListener("click", () => {
            const picker = document.getElementById("hidden-cld-file-picker");
            if (picker) {
                // Set temporary target to prompt
                picker.value = "";
                picker.onchange = async () => {
                    if (picker.files && picker.files[0]) {
                        try {
                            const url = await uploadFileDirectToCloudinary(picker.files[0]);
                            alert("Upload Successful!\nCloudinary File URL:\n" + url);
                        } catch (err) {
                            alert("Test Upload Failed:\n" + err.message);
                        }
                    }
                };
                picker.click();
            }
        });
    }
}

// Toast helper
function showToast(msg) {
    const t = document.getElementById("toast-notification");
    if (!t) return;
    t.textContent = msg;
    t.style.display = "block";
    setTimeout(() => { t.style.display = "none"; }, 3000);
}

// HTML Escaper helper
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Messages & Enquiries Manager (Real-time Cloud Sync with Firebase Firestore)
function initMessagesManager() {
    const refreshBtn = document.getElementById("refresh-msgs-btn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            renderMessages();
            showToast("Messages refreshed! 📩");
        });
    }
}

async function renderMessages() {
    const tbody = document.getElementById("messages-table-body");
    const badge = document.getElementById("msg-count-badge");
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Loading incoming messages...</td></tr>`;

    let messages = [];

    if (typeof db !== 'undefined' && db) {
        try {
            const snap = await db.collection("messages").get();
            snap.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data() });
            });
        } catch (err) {
            console.warn("Firestore fetch messages warning:", err);
        }
    }

    try {
        const localMsgs = JSON.parse(localStorage.getItem("omnia_portfolio_messages") || "[]");
        localMsgs.forEach(lm => {
            if (!messages.some(m => m.createdAt === lm.createdAt && m.email === lm.email)) {
                messages.push(lm);
            }
        });
    } catch (e) {}

    // Sort client-side by date descending
    messages.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    if (badge) badge.textContent = messages.length;

    if (messages.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2.5rem;">
                    <p style="margin-bottom: 0.8rem;">No contact messages received yet. All new messages submitted from website visitors will appear here! ✨</p>
                    <button onclick="addTestAdminMessage()" class="btn btn-sm btn-outline" style="color: var(--cyan); border-color: rgba(0,242,254,0.3);"><i class="fas fa-plus-circle"></i> Add Demo Test Message</button>
                </td>
            </tr>`;
        return;
    }

    tbody.innerHTML = messages.map(m => {
        const dateStr = m.createdAt ? new Date(m.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
        const name = escapeHtml(m.name || 'Anonymous');
        const email = escapeHtml(m.email || 'N/A');
        const phone = escapeHtml(m.phone || 'N/A');
        const msg = escapeHtml(m.message || '');
        const id = m.id || '';

        return `
            <tr>
                <td style="white-space: nowrap; font-size: 0.85rem; color: var(--text-dim);">${dateStr}</td>
                <td><strong>${name}</strong></td>
                <td><a href="mailto:${email}" style="color: var(--cyan); text-decoration: none;"><i class="fas fa-envelope"></i> ${email}</a></td>
                <td style="white-space: nowrap;">${phone}</td>
                <td style="max-width: 300px; word-wrap: break-word; line-height: 1.4;">${msg}</td>
                <td style="white-space: nowrap;">
                    <a href="mailto:${email}?subject=Re: Portfolio Contact Message&body=Hi ${encodeURIComponent(name)},\n\nThank you for reaching out!" class="btn btn-sm btn-outline" style="color: var(--cyan); border-color: rgba(0,242,254,0.3); margin-right: 4px;" title="Reply to ${name}">
                        <i class="fas fa-reply"></i> Reply
                    </a>
                    <button onclick="deleteMessage('${id}', '${m.createdAt}')" class="btn btn-sm btn-danger" title="Delete Message"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function addTestAdminMessage() {
    const demo = {
        name: "Omnia Ali (Test Visitor)",
        email: "oa741536@gmail.com",
        phone: "+20 1000000000",
        message: "Hello! This is a test message to verify the Admin Messages table layout.",
        createdAt: new Date().toISOString()
    };
    try {
        const existing = JSON.parse(localStorage.getItem("omnia_portfolio_messages") || "[]");
        existing.unshift(demo);
        localStorage.setItem("omnia_portfolio_messages", JSON.stringify(existing));
    } catch(e) {}

    if (typeof db !== 'undefined' && db) {
        db.collection("messages").add(demo).catch(e => console.warn(e));
    }

    renderMessages();
    showToast("Demo message added! ✨");
}

async function deleteMessage(id, createdAt) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    // Remove from localStorage
    try {
        let localMsgs = JSON.parse(localStorage.getItem("omnia_portfolio_messages") || "[]");
        localMsgs = localMsgs.filter(m => m.createdAt !== createdAt);
        localStorage.setItem("omnia_portfolio_messages", JSON.stringify(localMsgs));
    } catch(e) {}

    // Remove from Firestore
    if (id && typeof db !== 'undefined' && db) {
        try {
            await db.collection("messages").doc(id).delete();
        } catch (e) {
            console.warn("Firestore delete warning:", e);
        }
    }
    showToast("Message deleted successfully!");
    renderMessages();
}
