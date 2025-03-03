// Obsługa kliknięcia w kartę w widoku dla większych ekranów
document.addEventListener("DOMContentLoaded", () => {
    // Pobierz wszystkie karty
    const cards = document.querySelectorAll(".flip-card-container");

    // Funkcja ukrywająca kontener z kartami
    function hideCardsContainer() {
        const containerA = document.querySelector('.cards-container');
        const containerB = document.querySelector('.deck-container')
        if (containerA) {
            containerA.style.display = 'none'; // Ukrycie kontenera
        }
        if (containerB) {
            containerB.style.display = 'none'; // Ukrycie kontenera
        }
    }
    

    // Funkcja do wyświetlania konkretnego kontenera
    const showGallery = (galleryClass) => {
        const gallery = document.querySelector(`.GalleryContainer.${galleryClass}`);
        if (gallery) {
            gallery.style.display = "flex";
            hideCardsContainer();
        }
    };

    // Dodaj nasłuch na kliknięcie w każdą kartę
    cards.forEach(card => {
        card.querySelector(".card-back").addEventListener("click", () => {
            const cardId = card.getAttribute("data-card-id");
            // Wypisz odpowiednią wiadomość na podstawie ID karty
            showGallery(cardId);
        });
    });
});


//Obsługa tasowania talii (małe ekrany)
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let startX = 0;
    let isDragging = false;
    let activeCardIndex = 0; // Indeks aktywnej karty
    let currentDeltaX = 0;
    let clickBlocked = false; // Flaga blokująca kliknięcie

    // Funkcja aktualizująca pozycje kart w stosie
    const updateCardStack = () => {
        cards.forEach((card, index) => {
            const relativeIndex = (index - activeCardIndex + cards.length) % cards.length;

            if (relativeIndex === 0) {
                // Wierzchnia karta
                card.style.transform = `translateX(${currentDeltaX}px) rotate(10deg)`; // Lekko w prawo
                card.style.zIndex = cards.length;
            } else if (relativeIndex === 1) {
                // Środkowa karta
                card.style.transform = "translateX(-10px) rotate(0deg)"; // Pionowa
                card.style.zIndex = cards.length - 1;
            } else {
                // Karta na spodzie
                card.style.transform = "translateX(-20px) rotate(-10deg)"; // Lekko w lewo
                card.style.zIndex = cards.length - 2;
            }
        });
    };

    // Funkcja obsługująca rozpoczęcie przeciągania
    const handleDragStart = (e) => {
        startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        isDragging = true;
        currentDeltaX = 0; // Resetowanie przesunięcia
        clickBlocked = false; // Zresetuj blokowanie kliknięcia
        document.body.style.overflow = "hidden"; // Blokowanie przewijania
    };

    // Funkcja obsługująca ruch przeciągania
    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        currentDeltaX = currentX - startX;

        if (Math.abs(currentDeltaX) > 5) {
            clickBlocked = true; // Blokuj kliknięcie, jeśli karta się poruszyła
        }

        // Aktualizacja przesuwanej karty
        cards[activeCardIndex].style.transform = `translateX(${currentDeltaX}px) rotate(10deg)`;
    };

    // Funkcja obsługująca zakończenie przeciągania
    const handleDragEnd = (e) => {
        if (!isDragging) return;

        const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
        const deltaX = endX - startX;

        if (Math.abs(deltaX) >= 50) {
            // Jeśli przesuwamy kartę
            if (deltaX > 0) {
                // Przesuwanie w prawo
                activeCardIndex = (activeCardIndex + 1) % cards.length;
            } else {
                // Przesuwanie w lewo
                activeCardIndex = (activeCardIndex + 1 + cards.length) % cards.length;
            }
        }

        currentDeltaX = 0; // Reset przesunięcia
        isDragging = false; // Zakończenie przeciągania
        updateCardStack(); // Aktualizacja stosu
        document.body.style.overflow = ""; // Odblokowanie przewijania
    };

    // Funkcja obsługująca kliknięcie karty
    const handleClick = (e) => {
        if (clickBlocked) {
            // Jeśli kliknięcie jest zablokowane, przerywamy działanie
            return;
        }

        // Funkcja ukrywająca kontener z kartami
        function hideCardsContainer() {
            const containerA = document.querySelector('.cards-container');
            const containerB = document.querySelector('.deck-container')
            if (containerA) {
                containerA.style.display = 'none'; // Ukrycie kontenera
            }
            if (containerB) {
                containerB.style.display = 'none'; // Ukrycie kontenera
            }
        }        

        const showGallery = (galleryClass) => {
            const gallery = document.querySelector(`.GalleryContainer.${galleryClass}`);
            if (gallery) {
                gallery.style.display = "inline";
            }
            hideCardsContainer();
        };

        const cardId = e.currentTarget.dataset.cardId; // Pobranie ID klikniętej karty
        console.log(`Kliknięto kartę: ${cardId}`); // Wyświetlenie w konsoli
        switch(cardId){
            case '1':
                showGallery("Characters");
                break;
            case '2':
                showGallery("Creatures");
                break;
            case '3':
                showGallery('Enviro');
                break;
            default:
                //pass
        }
    
    };

    // Dodanie obsługi zdarzeń do każdej karty
    cards.forEach((card, index) => {
        card.dataset.cardId = index + 1; // Przypisanie ID do karty, aby identyfikować, która karta została kliknięta

        // Obsługa przeciągania
        card.addEventListener("touchstart", handleDragStart);
        card.addEventListener("touchmove", handleDragMove);
        card.addEventListener("touchend", handleDragEnd);

        card.addEventListener("mousedown", handleDragStart);
        card.addEventListener("mousemove", handleDragMove);
        card.addEventListener("mouseup", handleDragEnd);

        // Obsługa kliknięcia, ale tylko jeśli nie jest przeciągane
        card.addEventListener("click", handleClick);
    });

    // Inicjalizacja stosu kart
    updateCardStack();
});

// Obsługa przycisków powrotu z galerii
document.addEventListener("DOMContentLoaded", () => {
    // Funkcja przywracjąca domyślne wartośći parametów display dla kontenera z kartami
    function showCardsContainer() {
        const containerA = document.querySelector('.cards-container');
        const containerB = document.querySelector('.deck-container');
        if (containerA) {
            containerA.style.display = ''; // Przywrócenie domyślnego stylu
        }
        if (containerB) {
            containerB.style.display = ''; // Przywrócenie domyślnego stylu
        }
    }

    // Funkcja do ukrywania wszystkich kontenerów galerii
    const hideAllGalleries = () => {
        const galleries = document.querySelectorAll(".GalleryContainer");
        galleries.forEach(gallery => {
            gallery.style.display = "none";
        });
        console.log("Wszystkie galerie zostały ukryte.");
    };

    // Dodanie nasłuchiwania na kliknięcia w przyciski powrotu
    const backButtons = document.querySelectorAll(".back-to-conceptart-main-silde");

    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            hideAllGalleries(); // Wywołanie funkcji ukrywającej galerie
            showCardsContainer(); // Przywróć karty Enviro, Charactes, Creatures
        });
    });
});





