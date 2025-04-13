// Dropdown functionaliteit
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.classList.contains("show")) {
        dropdown.style.transform = "translateX(-50%) translateY(0)";
        dropdown.style.opacity = "0";
        setTimeout(() => dropdown.classList.remove("show"), 300);
    } else {
        dropdown.classList.add("show");
        dropdown.style.transform = "translateX(-50%) translateY(10px)";
        dropdown.style.opacity = "1";
    }
}

// Sluit dropdown als er buiten geklikt wordt
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Sluit dropdown als er buiten geklikt wordt (ook voor touchscreens)
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

// Ensure dropdown closes on resize
window.addEventListener('resize', () => {
    const dropdown = document.getElementById("myDropdown");
    if (dropdown && dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    }
});

// Zoekfunctionaliteit
function zoekFunction() {
    const input = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (input) {
        resultsContainer.style.display = 'block';
        resultsContainer.style.visibility = 'visible';
    } else {
        resultsContainer.style.display = 'none';
        return;
    }

    // Fetch all blog items
    const blogItems = Array.from(document.querySelectorAll('.blog-item')).map(item => {
        const titleElement = item.querySelector('h3');
        const previewElement = item.querySelector('.preview');
        const linkElement = item.querySelector('a');
        return {
            title: titleElement ? titleElement.textContent.trim() : '',
            preview: previewElement ? previewElement.textContent.trim() : '',
            link: linkElement ? linkElement.getAttribute('href') : '#'
        };
    });

    // Search through blog items
    blogItems.forEach(item => {
        if (item.title.toLowerCase().includes(input) || item.preview.toLowerCase().includes(input)) {
            const li = document.createElement('li');
            const highlightedTitle = item.title.replace(new RegExp(input, 'gi'), match => `<mark>${match}</mark>`);
            const highlightedPreview = item.preview.replace(new RegExp(input, 'gi'), match => `<mark>${match}</mark>`);
            li.innerHTML = `<a href="${item.link}">${highlightedTitle}</a><p>${highlightedPreview}</p>`;
            resultsContainer.appendChild(li);
        }
    });

    if (!resultsContainer.hasChildNodes()) {
        const li = document.createElement('li');
        li.textContent = 'Geen resultaten gevonden.';
        resultsContainer.appendChild(li);
    }
}

// Nieuwe zoekfunctie voor blog posts
function zoekBlogPosts() {
    const input = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!input) {
        resultsContainer.style.display = 'none';
        return;
    }

    const blogItems = document.querySelectorAll('.blog-item');
    let found = false;

    blogItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const preview = item.querySelector('.preview').textContent.toLowerCase();
        const link = item.querySelector('a').getAttribute('href');

        if (title.includes(input) || preview.includes(input)) {
            found = true;
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <a href="${link}">
                    <h4>${item.querySelector('h3').textContent}</h4>
                    <p>${item.querySelector('.preview').textContent}</p>
                </a>
            `;
            resultsContainer.appendChild(resultItem);
        }
    });

    if (!found) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'Geen resultaten gevonden';
        resultsContainer.appendChild(noResults);
    }

    resultsContainer.style.display = 'block';
}

// Observe changes in home.html to update search results dynamically
document.addEventListener('DOMContentLoaded', function () {
    const blogPostsSection = document.querySelector('.blog-posts ul');
    if (blogPostsSection) {
        const observer = new MutationObserver(() => {
            zoekFunction(); // Re-run search function to update results
        });
        observer.observe(blogPostsSection, { childList: true, subtree: true });
    }
});

// Zoek in wiki links
function zoekWikiLinks() {
    const input = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (input) {
        resultsContainer.style.display = 'block';
        resultsContainer.style.visibility = 'visible';
    } else {
        resultsContainer.style.display = 'none';
        return;
    }

    const wikiLinks = [
        { text: 'Basisconfiguratie', link: 'installatie.html' },
        { text: 'Dotfiles Basisconfiguratie', link: 'dotfiles.html#basisconfiguratie' },
        { text: 'Dotfiles Keybindings', link: 'dotfiles.html#keybindings' },
        { text: 'Dotfiles Theming', link: 'dotfiles.html#theming' },
        { text: 'Basis Scripting', link: 'scripting.html#basis-scripting' },
        { text: 'Automatisering', link: 'scripting.html#automatisering' },
        { text: 'Problemen oplossen', link: 'problemen.html' },
    ];

    wikiLinks.forEach(link => {
        if (link.text.toLowerCase().includes(input)) {
            const li = document.createElement('li');
            const highlightedText = link.text.replace(new RegExp(input, 'gi'), match => `<mark>${match}</mark>`);
            li.innerHTML = `<a href="${link.link}">${highlightedText}</a>`;
            resultsContainer.appendChild(li);
        }
    });

    // Dynamically fetch wiki titles
    const dynamicWikiItems = Array.from(document.querySelectorAll('.wiki-menu li a')).map(item => ({
        text: item.textContent.trim(),
        link: item.getAttribute('href') || '#'
    }));

    dynamicWikiItems.forEach(item => {
        if (item.text.toLowerCase().includes(input)) {
            const li = document.createElement('li');
            const highlightedText = item.text.replace(new RegExp(input, 'gi'), match => `<mark>${match}</mark>`);
            li.innerHTML = `<a href="${item.link}">${highlightedText}</a>`;
            resultsContainer.appendChild(li);
        }
    });

    if (!resultsContainer.hasChildNodes()) {
        const li = document.createElement('li');
        li.textContent = 'Geen resultaten gevonden.';
        resultsContainer.appendChild(li);
    }
}

// Observe changes in wiki.html to update search results dynamically
document.addEventListener('DOMContentLoaded', function () {
    const wikiMenuSection = document.querySelector('.wiki-menu');
    if (wikiMenuSection) {
        const observer = new MutationObserver(() => {
            zoekWikiLinks(); // Re-run search function to update results
        });
        observer.observe(wikiMenuSection, { childList: true, subtree: true });
    }
});

// Laad Arch Linux nieuws
function loadArchNews() {
    var newsListHome = document.getElementById('arch-news-list-home');
    var newsListFull = document.getElementById('arch-news-list');
    
    if (newsListHome || newsListFull) {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://archlinux.org/feeds/news/')
            .then(response => response.json())
            .then(data => {
                const targetList = newsListHome || newsListFull;
                targetList.innerHTML = '';

                const itemCount = newsListHome ? 3 : 5;
                
                data.items.slice(0, itemCount).forEach((item, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <details id="news-${index + 1}">
                            <summary>
                                <strong>${item.title}</strong>
                                <em>${new Date(item.pubDate).toLocaleDateString('nl-NL')}</em>
                            </summary>
                            <p class="preview">${item.description || 'Geen samenvatting beschikbaar.'}</p>
                        </details>
                    `;
                    targetList.appendChild(li);
                });
            })
            .catch(error => {
                const targetList = newsListHome || newsListFull;
                if (targetList) targetList.innerHTML = '<li>Kon Arch Linux nieuws niet laden.</li>';
                console.error('Fout bij laden RSS:', error);
            });
    }
}

// Laad Hyprland nieuws
function loadHyprlandNews() {
    var newsListHome = document.getElementById('hyprland-news-list-home');
    var newsListFull = document.getElementById('hyprland-news-full');
    
    if (newsListHome || newsListFull) {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://github.com/hyprwm/Hyprland/releases.atom')
            .then(response => response.json())
            .then(data => {
                const targetList = newsListHome || newsListFull;
                targetList.innerHTML = '';

                data.items.slice(0, newsListHome ? 3 : data.items.length).forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <details>
                            <summary>
                                <strong>${item.title}</strong>
                                <em>${new Date(item.pubDate).toLocaleDateString('nl-NL')}</em>
                            </summary>
                            <div class="release-body">${item.description}</div>
                        </details>
                    `;
                    targetList.appendChild(li);
                });
            })
            .catch(error => {
                const targetList = newsListHome || newsListFull;
                if (targetList) targetList.innerHTML = '<li>Kon releases niet laden.</li>';
                console.error('Fout bij laden Hyprland RSS:', error);
            });
    }
}

// Laad alles wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', function() {
    loadArchNews();
    loadHyprlandNews();
});

// Improved submenu functionality
function toggleSubmenu(button) {
    const submenu = button.nextElementSibling;

    if (submenu && submenu.classList.contains('submenu')) {
        const isOpen = submenu.style.display === 'block';
        submenu.style.display = isOpen ? 'none' : 'block';
        button.setAttribute('aria-expanded', !isOpen);
    }
}

// Popup functionaliteit
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('expertPopupShown')) {
        const popup = document.getElementById('expert-popup');
        popup.classList.add('show');
    }
});

function closePopup() {
    const popup = document.getElementById('expert-popup');
    popup.classList.remove('show');
    localStorage.setItem('expertPopupShown', 'true');
}

// Toggle dark mode functionaliteit
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    sessionStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateDarkModeButton();
}

// Update dark mode button appearance
function updateDarkModeButton() {
    const darkModeButton = document.querySelector('.dark-mode-toggle');
    if (darkModeButton) {
        darkModeButton.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
}

// Initialize dark mode
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = sessionStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButton();

    // Add click handler to button
    const darkModeButton = document.querySelector('.dark-mode-toggle');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
});