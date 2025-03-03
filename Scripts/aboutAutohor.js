document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".s_AboutAuthorSection");

    const createSpark = () => {
        const spark = document.createElement("div");
        spark.className = "sparkGreen";

        // Ustaw losową pozycję początkową w poziomie
        const startX = Math.random() * section.offsetWidth; // Losowa pozycja na szerokości sekcji

        // Ustaw wielkość iskierki
        const sparkSize = Math.random() * 1 + 3; // Losowy rozmiar od 3px do 4px
        spark.style.width = `${sparkSize}px`;
        spark.style.height = `${sparkSize * 3}px`; // Długość proporcjonalna do szerokości

        // Losowy czas trwania animacji
        const animationDuration = Math.random() * 4 + 2; // Od 2 do 6 sekund
        spark.style.animationDuration = `${animationDuration}s`;

        // Losowe parametry paraboli
        const parabolaDirection = Math.random() > 0.5 ? 1 : -1; // Losowe prawe lub lewe ramię (-1 lub 1)
        const parabolaWidth = Math.random() * 100 + 50; // Losowa szerokość paraboli (50px do 150px)
        spark.style.setProperty('--parabola-width', `${parabolaWidth * parabolaDirection}px`);

        // Ustaw pozycję iskierki
        spark.style.left = `${startX}px`;
        spark.style.bottom = `0px`; // Zawsze zaczynają od dołu

        section.appendChild(spark);

        // Usuń iskrę po zakończeniu animacji
        spark.addEventListener("animationend", () => {
            spark.remove();
        });
    };

    // Generuj iskierki w interwale
    setInterval(createSpark, 50); // Jedna iskierka co 100ms
});
