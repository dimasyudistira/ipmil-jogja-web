document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. Load Data from ipmilData (defined in data.js)
    if (typeof ipmilData === 'undefined') {
        console.error("Data source not found. Make sure data.js is loaded before script.js.");
        return;
    }

    // Populate Hero
    document.getElementById('hero-title').textContent = ipmilData.hero.title;
    document.getElementById('hero-subtitle').textContent = ipmilData.hero.subtitle;
    document.getElementById('hero-cta').textContent = ipmilData.hero.cta;

    // Populate About
    document.getElementById('about-title').textContent = ipmilData.about.title;
    document.getElementById('about-desc').textContent = ipmilData.about.description;

    // Populate Projects
    const projectGrid = document.getElementById('project-grid');
    if (ipmilData.projects && ipmilData.projects.length > 0) {
        projectGrid.innerHTML = '';
        ipmilData.projects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="Foto dokumentasi ${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <span class="project-badge">${project.year}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    } else {
        projectGrid.innerHTML = '<p>Belum ada proyek yang dipublikasikan.</p>';
    }

    // Populate Board Members
    const boardGrid = document.getElementById('board-grid');
    if (ipmilData.boardMembers && ipmilData.boardMembers.length > 0) {
        boardGrid.innerHTML = '';
        ipmilData.boardMembers.forEach(member => {
            const card = document.createElement('article');
            card.className = 'member-card';
            
            // Fallback for missing image
            const imageSrc = member.imageUrl ? member.imageUrl : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=F9C013&color=1A241E';

            card.innerHTML = `
                <div class="member-image">
                    <img src="${imageSrc}" alt="Pas foto ${member.name}" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${member.name}') + '&background=F9C013&color=1A241E'">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-dept small-text">${member.department || ''}</p>
                </div>
            `;
            boardGrid.appendChild(card);
        });
    } else {
        boardGrid.innerHTML = '<p>Data pengurus belum tersedia.</p>';
    }
});
