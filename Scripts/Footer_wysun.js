document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');

    function checkFooterVisibility() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 10) { // -10 dla marginesu
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkFooterVisibility);

    // Sprawdź widoczność stopki przy ładowaniu strony
    checkFooterVisibility();
});
