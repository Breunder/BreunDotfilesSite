        // Lijst van toegestane pagina's
        const allowedPages = [
            'home.html',
            'aboutme.html',
            '404.html',
            'blog.html',
            'Bash-SoftwareInstallatie-Generator.html',
            'changelog.html',
            'dotfiles.html',
            'gallery.html',
            'geavanceerd-scripting.html',
            'hyprland-config-generator.html',
            'installatie-arch.html',
            'installatie-hyprland.html',
            'news.html',
            'post1.html',
            'post2.html',
            'post3.html',
            'problemen.html',
            'scripting.html',
            'waybar-config-generator.html',
            'wiki.html',
            'page-checker.html',
            'mijndotfiles.html',
            'secret.html',
            'rong.html',
            'betris.html',
            'bookiebicker.html',
        ];
        
        // Controleer of de huidige pagina in de lijst staat
        function checkCurrentPage() {
            const currentPath = window.location.pathname;
            const filename = currentPath.split('/').pop();
            
            // Als we al op de 404 pagina zijn, doe niets
            if (filename === '404.html') {
                return;
            }
            
            // Als de pagina niet in de lijst staat, redirect naar 404
            if (!allowedPages.includes(filename) && filename !== '') {
                window.location.href = '404.html';
            }
        }
        
       // Voeg event listeners toe aan alle links op de pagina
function setupLinkValidation() {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Negeer externe links, ankers, of speciale links
            if (!href || 
                href.startsWith('http://') || 
                href.startsWith('https://') || 
                href.startsWith('#') || 
                href.startsWith('javascript:') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:')) {
                return;
            }
            
            // Haal de bestandsnaam uit de href
            const targetFilename = href.split('/').pop();
            
            // Als de doelpagina niet in de lijst staat, voorkom de standaard actie en ga naar 404
            if (!allowedPages.includes(targetFilename)) {
                event.preventDefault();
                // Sla de opgevraagde URL op in sessionStorage voor weergave op de 404-pagina
                sessionStorage.setItem('requestedUrl', href);
                window.location.href = '404.html';
            }
        });
    }
}

// Voer de controles uit zodra de pagina is geladen
document.addEventListener('DOMContentLoaded', function() {
    checkCurrentPage();
    setupLinkValidation();
});