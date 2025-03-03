document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".s_StorySection");
    const dustContainer = section.querySelector(".dust-particles-container");
    const maxParticles = 100; // Maksymalna liczba drobinek

    const createDustParticle = () => {
        // Sprawdź, ile jest już drobinek
        if (dustContainer.querySelectorAll(".dust-particle").length >= maxParticles) return;

        const particle = document.createElement("div");
        particle.className = "dust-particle";

        // Losowe umiejscowienie
        const startX = Math.random() * section.offsetWidth;
        const startY = Math.random() * section.offsetHeight;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        // Losowa wielkość
        const size = Math.random() * 1 + 2; // Wielkość
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Losowe przesunięcie na boki
        const driftX = Math.random() * 60 - 30; // Przesunięcie w lewo lub prawo
        particle.style.setProperty('--drift-x', `${driftX}px`);

        // Losowa skala
        const scale = Math.random() * 0.5 + 0.8; // 0.8 - 1.3x oryginalnego rozmiaru
        particle.style.setProperty('--scale', scale);

        // Losowy czas trwania animacji
        const duration = Math.random() * 2 + 3; // Czas życia
        particle.style.animationDuration = `${duration}s`;

        dustContainer.appendChild(particle);

        // Usuń drobinkę po zakończeniu animacji
        particle.addEventListener("animationend", () => {
            particle.remove();
        });
    };

    // Generowanie drobinek w interwałach
    setInterval(createDustParticle, 100); // Co 100ms nowa drobinka
});


// zablokowanie przewijania stronki, gdy przewijany jest tekst
document.addEventListener("DOMContentLoaded", () => {
    const scrollableContainer = document.querySelector(".about-story-container p");

    scrollableContainer.addEventListener("wheel", (event) => {
        event.stopPropagation(); // Blokuje propagację eventu do window
    }, { passive: false });

    // Obsługa dotykowego przewijania na telefonach
    scrollableContainer.addEventListener("touchstart", (event) => {
        event.stopPropagation();
    }, { passive: false });

    scrollableContainer.addEventListener("touchmove", (event) => {
        event.stopPropagation();
    }, { passive: false });
});

