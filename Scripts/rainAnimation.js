document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".s_AboutEsterathSection");
    const frontRow = section.querySelector(".rain.front-row");
    const backRow = section.querySelector(".rain.back-row");

    const makeItRain = () => {
        // Wyczyść wcześniejsze krople
        frontRow.innerHTML = "";
        backRow.innerHTML = "";

        let increment = 0;
        while (increment < 100) {
            const randoHundo = Math.floor(Math.random() * 98 + 1); // Random 1-98
            const randoFiver = Math.floor(Math.random() * 3 + 2);  // Random 2-5
            increment += randoFiver;

            const createDrop = (parent, leftOffset) => {
                const drop = document.createElement("div");
                drop.classList.add("drop");

                // Losowa wielkość kropli
                const randomWidth = Math.random() * 2 + 1; // Szerokość od 1px do 3px
                const randomHeight = Math.random() * 40 + 80; // Wysokość od 80px do 120px
                drop.style.width = `${randomWidth}px`;
                drop.style.height = `${randomHeight}px`;

                drop.style.left = `${increment}%`;
                drop.style.bottom = `${randoFiver + 100}%`;
                drop.style.animationDelay = `0.${randoHundo}s`;
                drop.style.animationDuration = `${Math.random() * 0.2 + 0.3}s`; // Losowy czas trwania

                const stem = document.createElement("div");
                stem.classList.add("stem");

                // Dopasowanie stem do rozmiaru kropli
                stem.style.width = `${randomWidth}px`;
                stem.style.height = `${randomHeight * 0.6}px`; // Wysokość stem jako procent długości kropli
                stem.style.animationDelay = `0.${randoHundo}s`;
                stem.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;

                const splat = document.createElement("div");
                splat.classList.add("splat");
                splat.style.animationDelay = `0.${randoHundo}s`;
                splat.style.animationDuration = `0.5${randoHundo}s`;

                drop.appendChild(stem);
                drop.appendChild(splat);
                parent.appendChild(drop);
            };

            createDrop(frontRow, increment);
            createDrop(backRow, increment);
        }
    };

    // Inicjalizuj deszcz
    makeItRain();
});