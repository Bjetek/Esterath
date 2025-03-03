function toggleMenu() {
    // Pobierz elementy menu i ikony
    const menu = document.querySelector('.menu');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    // Przełącz widoczność menu
    menu.classList.toggle('show');
    
    // Sprawdź, czy menu jest otwarte, i odpowiednio zmień ikonę oraz kolor
    if (menu.classList.contains('show')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times'); // Zmień ikonę na krzyżyk (FontAwesome fa-times)
        hamburgerIcon.style.color = '#ffcc00';  // Zmiana koloru ikony na żółty, gdy menu jest otwarte
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars'); // Przywróć ikonę hamburgera
        hamburgerIcon.style.color = '#ffffff';  // Zmiana koloru ikony na biały, gdy menu jest zamknięte
    }
}

// Zwiń menu po kliknięciu na element i zmień ikonę oraz kolor na biały
function closeMenu() {
    const menu = document.querySelector('.menu');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    // Sprawdź, czy menu jest rozwinięte
    if (menu.classList.contains('show')) {
        menu.classList.remove('show'); // Zwiń menu
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars'); // Przywróć ikonę hamburgera
        hamburgerIcon.style.color = '#ffffff';  // Zmień kolor ikony na biały po zamknięciu menu
    }
}

// Dodaj event listener do każdego linku w menu, aby zamknąć menu po kliknięciu
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
