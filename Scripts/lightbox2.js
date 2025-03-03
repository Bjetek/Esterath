document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {

        const imageCounts = {
            Ashen_Wasteland: 2, // Liczba zdjęć 
            Crystal_Canyon: 2, // Liczba zdjęć 
            Emethral_Deposit: 2, // Liczba zdjęć 
            Demonic_Cathedral: 3,  // Liczba zdjęć 
            Abadoned_Village: 2,
            Dragon_Gate: 2,
            Dragon_Sanctuary: 5,
            White_Palace: 10,
            Drakhan: 6,
            Worgen: 4,
            Hermit_Theodor: 2,
            Cold: 3,
            Ice_Lady: 6,
            Dargen: 8,
            First_Hound: 2,
            Tzhar: 2,
            Crumb: 3,
            Dragon_Guardian: 2,
            Dyuan: 5,
            Emerthal_Golem: 3,
            Gnoul: 2
        };

        const imageAlt = item.querySelector("img").alt; // Pobierz `alt` obrazka
        const count = imageCounts[imageAlt] || 0; // Pobierz liczbę zdjęć z obiektu

        if (count > 0) {
            lightbox.option({
                wrapAround: true,
                albumLabel: "Zdjęcie %1 z %2",
            });

            // Tworzenie dynamicznych linków do zdjęć
            const lightboxLinks = [];
            for (let i = 1; i <= count; i++) {
                const link = document.createElement("a");
                link.href = `/obrazy/${imageAlt}/image${i}.png`; // Ścieżka do zdjęć
                link.setAttribute("data-lightbox", imageAlt);
                link.setAttribute("data-title", `${imageAlt}`);
                // link.setAttribute("data-lightbox", imageAlt);
                lightboxLinks.push(link);
            }

            // Dodanie linków do dokumentu, kliknięcie pierwszego i ich usunięcie
            lightboxLinks.forEach(link => document.body.appendChild(link));
            lightboxLinks[0].click(); // Otwórz pierwszy obraz
            lightboxLinks.forEach(link => document.body.removeChild(link)); // Usuń linki po zamknięciu
        } else {
            console.error(`Brak zdjęć dla ${imageAlt}.`);
        }
    });
});
