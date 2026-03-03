/* ========================================
   KARAM AJAJ — Portfolio JS
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ----- Matrix Rain Background ----- */
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, cols, drops;

        function initMatrix() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const fontSize = 14;
            cols = Math.floor(w / fontSize);
            drops = Array(cols).fill(1);
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}<>|/\\=+-_@#$%&*';

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.08)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#00ff88';
            ctx.font = '14px JetBrains Mono, monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 14, drops[i] * 14);
                if (drops[i] * 14 > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        initMatrix();
        setInterval(drawMatrix, 50);
        window.addEventListener('resize', initMatrix);
    }

    /* ----- Typing Effect ----- */
    function typeText(element, text, speed, callback) {
        if (!element) return;
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    const typedName = document.getElementById('typed-name');
    const typedRole = document.getElementById('typed-role');

    if (typedName) {
        setTimeout(() => {
            typeText(typedName, 'Karam Ajaj', 80, () => {
                if (typedRole) {
                    typeRoleLoop(typedRole);
                }
            });
        }, 800);
    }

    function typeRoleLoop(el) {
        const roles = [
            'Cloud & Infra Automation Consultant',
            'VMware Certified Professional',
            'Infrastructure-as-Code Engineer',
            'DevOps Enthusiast',
            'Azure Cloud Engineer'
        ];
        let roleIndex = 0;

        function typeRole() {
            const role = roles[roleIndex];
            let i = 0;
            el.textContent = '';

            function typeChar() {
                if (i < role.length) {
                    el.textContent += role.charAt(i);
                    i++;
                    setTimeout(typeChar, 40);
                } else {
                    setTimeout(deleteRole, 2000);
                }
            }

            function deleteRole() {
                if (el.textContent.length > 0) {
                    el.textContent = el.textContent.slice(0, -1);
                    setTimeout(deleteRole, 25);
                } else {
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 400);
                }
            }

            typeChar();
        }

        typeRole();
    }

    /* ----- Navbar Scroll ----- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll spy
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });

    /* ----- Mobile Nav Toggle ----- */
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    if (navToggle && navLinksEl) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksEl.classList.toggle('open');
        });

        // Close on link click
        navLinksEl.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksEl.classList.remove('open');
            });
        });
    }

    /* ----- Scroll Reveal (IntersectionObserver) ----- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ----- Stat Counter Animation ----- */
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'), 10);
                animateCounter(target, count);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 1500;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    /* ----- Skill Bar Animation ----- */
    const skillFills = document.querySelectorAll('.skill-fill');
    const langFills = document.querySelectorAll('.lang-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(el => barObserver.observe(el));
    langFills.forEach(el => barObserver.observe(el));

    /* ----- Credentials Filter System ----- */
    const credGrid = document.getElementById('credentialsGrid');
    const credCount = document.getElementById('credentialsCount');
    const credEmpty = document.getElementById('credentialsEmpty');
    const credSearch = document.getElementById('credentialSearch');

    if (credGrid) {
        const cards = Array.from(credGrid.querySelectorAll('.credential-card'));
        let activeType = 'all';
        let activeVendor = 'all';
        let searchTerm = '';

        /* Collapse / expand logic */
        const LIMIT = window.innerWidth <= 768 ? 6 : 12;
        let isExpanded = false;
        const toggleBtn = document.getElementById('credentialsToggle');
        const hiddenCountEl = document.getElementById('credentialsHiddenCount');

        // Compute initial counts dynamically
        (function initCounts() {
            const totals = { all: cards.length, certification: 0, course: 0 };
            const vendors = { all: cards.length };
            cards.forEach(c => {
                totals[c.dataset.type] = (totals[c.dataset.type] || 0) + 1;
                vendors[c.dataset.vendor] = (vendors[c.dataset.vendor] || 0) + 1;
            });
            document.querySelectorAll('.filter-group').forEach(g => {
                const ft = g.dataset.filter;
                g.querySelectorAll('.filter-btn').forEach(btn => {
                    const v = btn.dataset.value;
                    const span = btn.querySelector('.filter-count');
                    if (span) span.textContent = (ft === 'type' ? totals[v] : vendors[v]) || 0;
                });
            });
        })();

        function applyFilters() {
            let visible = 0;
            cards.forEach(card => {
                const type = card.dataset.type;
                const vendor = card.dataset.vendor;
                const text = card.textContent.toLowerCase();

                const matchType = activeType === 'all' || type === activeType;
                const matchVendor = activeVendor === 'all' || vendor === activeVendor;
                const matchSearch = !searchTerm || text.includes(searchTerm);

                if (matchType && matchVendor && matchSearch) {
                    card.classList.remove('hidden');
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (credCount) credCount.textContent = visible;
            if (credEmpty) credEmpty.style.display = visible === 0 ? 'block' : 'none';
            if (credGrid) credGrid.style.display = visible === 0 ? 'none' : '';

            /* Apply collapse limit */
            applyCollapse();
        }

        function applyCollapse() {
            const visibleCards = cards.filter(c => !c.classList.contains('hidden'));
            if (isExpanded || visibleCards.length <= LIMIT) {
                visibleCards.forEach(c => c.classList.remove('collapsed-hidden'));
                if (toggleBtn) {
                    if (visibleCards.length <= LIMIT) {
                        toggleBtn.style.display = 'none';
                    } else {
                        toggleBtn.style.display = 'flex';
                        toggleBtn.classList.add('expanded');
                        toggleBtn.querySelector('span').innerHTML = 'Show less';
                    }
                }
            } else {
                visibleCards.forEach((c, i) => {
                    if (i >= LIMIT) c.classList.add('collapsed-hidden');
                    else c.classList.remove('collapsed-hidden');
                });
                const extra = visibleCards.length - LIMIT;
                if (toggleBtn) {
                    toggleBtn.style.display = 'flex';
                    toggleBtn.classList.remove('expanded');
                    if (hiddenCountEl) hiddenCountEl.textContent = extra;
                    toggleBtn.querySelector('span').innerHTML =
                        'Show all (<span id="credentialsHiddenCount">' + extra + '</span> more)';
                }
            }
        }

        // Filter button clicks
        document.querySelectorAll('.filter-group').forEach(group => {
            const filterType = group.dataset.filter; // 'type' or 'vendor'
            group.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    // Deactivate siblings
                    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (filterType === 'type') {
                        activeType = btn.dataset.value;
                    } else if (filterType === 'vendor') {
                        activeVendor = btn.dataset.value;
                    }
                    isExpanded = false;  // re-collapse on filter change
                    applyFilters();
                });
            });
        });

        // Toggle expand / collapse
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                isExpanded = !isExpanded;
                applyCollapse();
                if (!isExpanded) {
                    document.getElementById('credentials').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        // Search input
        if (credSearch) {
            credSearch.addEventListener('input', () => {
                searchTerm = credSearch.value.toLowerCase().trim();
                isExpanded = false;  // re-collapse on new search
                applyFilters();
            });
        }

        // Initial collapse on page load
        applyFilters();
    }

    /* ----- Dynamic About Stats ----- */
    (function dynamicStats() {
        // Years of experience: since Feb 2014
        const startDate = new Date(2014, 1); // Feb 2014
        const years = Math.floor((new Date() - startDate) / (365.25 * 24 * 60 * 60 * 1000));
        const elYears = document.getElementById('statYears');
        if (elYears) elYears.dataset.count = years;

        // Certs: count credential cards with data-type="certification"
        const certCount = document.querySelectorAll('.credential-card[data-type="certification"]').length;
        const elCerts = document.getElementById('statCerts');
        if (elCerts) elCerts.dataset.count = certCount;

        // Badges: will be updated after badges.json loads (see loadBadges)
    })();

    /* ----- Smooth Scroll for anchor links ----- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ----- Load Credly Badges ----- */
    async function loadBadges() {
        const container = document.getElementById('badge-container');
        if (!container) return;

        try {
            const response = await fetch('js/badges.json');
            const text = await response.text();

            let badgeIds;
            try {
                badgeIds = JSON.parse(text);
            } catch {
                const match = text.match(/\[[\s\S]*\]/);
                if (match) {
                    badgeIds = JSON.parse(match[0]);
                } else {
                    console.warn('Could not parse badges.json');
                    return;
                }
            }

            if (!Array.isArray(badgeIds) || badgeIds.length === 0) {
                container.innerHTML = '<p style="color: var(--text-muted);">No badges found.</p>';
                return;
            }

            // Update badges stat dynamically
            const elBadges = document.getElementById('statBadges');
            if (elBadges) {
                elBadges.dataset.count = badgeIds.length;
                // Re-animate if already visible
                animateCounter(elBadges, badgeIds.length);
            }

            // Use Credly embedded badge iframes (share-badge IDs)
            badgeIds.forEach(id => {
                const wrapper = document.createElement('div');
                wrapper.className = 'badge-card';

                const iframe = document.createElement('iframe');
                iframe.src = `https://www.credly.com/embedded_badge/${id}`;
                iframe.width = '150';
                iframe.height = '150';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                iframe.allowTransparency = true;
                iframe.title = 'Credly Badge';
                iframe.loading = 'lazy';
                iframe.style.cssText = 'background-color: transparent; border: none; overflow: hidden;';

                wrapper.appendChild(iframe);
                container.appendChild(wrapper);
            });

            // Show toggle button if more than 12 badges
            const toggleBtn = document.getElementById('badges-toggle');
            if (toggleBtn && badgeIds.length > 12) {
                toggleBtn.style.display = 'flex';
                const btnText = toggleBtn.querySelector('span');
                btnText.textContent = `Show all ${badgeIds.length} badges`;

                toggleBtn.addEventListener('click', () => {
                    const isCollapsed = container.classList.toggle('badges-collapsed');
                    toggleBtn.classList.toggle('expanded', !isCollapsed);
                    btnText.textContent = isCollapsed
                        ? `Show all ${badgeIds.length} badges`
                        : 'Show fewer';
                });
            }
        } catch (err) {
            console.warn('Failed to load badges:', err);
        }
    }

    loadBadges();

    /* ----- Performance: Reduce matrix rain when not visible ----- */
    document.addEventListener('visibilitychange', () => {
        // Matrix automatically slows when tab is hidden via browser throttling
    });

    /* ----- Mobile: Bottom Tab Bar + Experience Collapse ----- */
    (function initMobileEnhancements() {
        const isMobile = () => window.innerWidth <= 768;
        if (!isMobile()) return;

        // --- Bottom Tab Bar ---
        const tabs = [
            { id: 'hero',        icon: 'fas fa-terminal',       label: 'home' },
            { id: 'about',       icon: 'fas fa-user',           label: 'about' },
            { id: 'experience',  icon: 'fas fa-briefcase',      label: 'work' },
            { id: 'education',   icon: 'fas fa-graduation-cap', label: 'edu' },
            { id: 'skills',      icon: 'fas fa-code',           label: 'skills' },
            { id: 'credentials', icon: 'fas fa-certificate',    label: 'certs' },
            { id: 'badges',      icon: 'fas fa-id-badge',       label: 'badges' },
            { id: 'languages',   icon: 'fas fa-language',       label: 'lang' }
        ];

        const bar = document.createElement('nav');
        bar.className = 'mobile-tab-bar';
        bar.setAttribute('aria-label', 'Section navigation');

        const tabButtons = tabs.map((t, i) => {
            const btn = document.createElement('button');
            btn.className = 'tab-item' + (i === 0 ? ' active' : '');
            btn.innerHTML = `<i class="${t.icon}"></i><span>${t.label}</span>`;
            btn.setAttribute('aria-label', t.label);
            btn.addEventListener('click', () => {
                const target = document.getElementById(t.id);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
            bar.appendChild(btn);
            return btn;
        });

        document.body.appendChild(bar);

        // Scroll spy: highlight active tab
        const sectionEls = tabs.map(t => document.getElementById(t.id)).filter(Boolean);
        let activeIdx = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = sectionEls.indexOf(entry.target);
                    if (idx >= 0 && idx !== activeIdx) {
                        activeIdx = idx;
                        tabButtons.forEach((b, j) => b.classList.toggle('active', j === idx));
                    }
                }
            });
        }, { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' });

        sectionEls.forEach(s => observer.observe(s));

        // --- Experience: tap to expand/collapse jobs ---
        document.querySelectorAll('.timeline-item').forEach(item => {
            const header = item.querySelector('.timeline-header-box');
            if (!header) return;
            header.addEventListener('click', () => {
                item.classList.toggle('exp-expanded');
            });
        });

        // --- Handle resize: remove tab bar if going to desktop ---
        window.addEventListener('resize', () => {
            bar.style.display = isMobile() ? 'flex' : 'none';
        });
    })();

});
