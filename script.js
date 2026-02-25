document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion du Préloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000); // On laisse 1s pour le côté premium
    });

    // 2. Navigation vers Inscription
    const goToInsc = () => {
        window.location.href = 'insc.html';
    };

    // 3. Navigation vers Connexion
    const goToConc = () => {
        window.location.href = 'conc.html';
    };

    // Attribution des événements aux boutons
    document.getElementById('nav-join').addEventListener('click', goToInsc);
    document.getElementById('nav-login').addEventListener('click', goToConc);

    // 4. Menu du bas (Animation de clic)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Si le lien est "#", on empêche le saut de page pour la démo
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Feedback visuel simple
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                console.log("Navigation vers : " + this.querySelector('span').innerText);
            }
        });
    });
});
