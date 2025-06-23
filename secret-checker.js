// Onmiddellijk uitvoeren
(function() {
    console.log("Inline secret checker running");
    
    if (localStorage.getItem('secretAccess') === null) {
        localStorage.setItem('secretAccess', 'false');
    }
    
    // Debug info
    console.log("secretAccess value:", localStorage.getItem('secretAccess'));
    console.log("secretAccess type:", typeof localStorage.getItem('secretAccess'));
    
    // Controleer of dit een beschermde pagina is
    const protectedGames = ['bookiebicker.html', 'betris.html', 'rong.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log("Current page:", currentPage);
    console.log("Is protected:", protectedGames.includes(currentPage));
    
    if (protectedGames.includes(currentPage) && localStorage.getItem('secretAccess') === 'false') {
        console.log("Redirecting to secret.html");
        document.documentElement.style.display = 'none';
        window.location.replace('secret.html');
    } else {
        console.log("Access granted");
    }
})();
