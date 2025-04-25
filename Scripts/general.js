// Obsługa scrollowania strony (przyciąganie do sekcji)
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section"); // Pobierz wszystkie sekcje
    const scrollableContainers = document.querySelectorAll(".description-container_v2, .gallery-items-container"); // Kontenery, które mają być wyjątkiem
    let isScrolling = false; // Flaga zapobiegająca wielokrotnemu uruchamianiu

    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: "smooth" }); // Płynne przewijanie
            setTimeout(() => isScrolling = false, 1000); // Zresetowanie flagi po 1s
        }
    };

    const isInsideScrollableContainer = (event) => {
        return Array.from(scrollableContainers).some(container => container.contains(event.target));
    };

    // Funkcja blokująca przewijanie strony w kontenerach objętych wyjątkiem
    const preventPageScroll = (event) => {
        const target = event.target.closest(".region-description_v2");
        if (target) {
            // Sprawdź, czy można przewijać w kontenerze
            const canScrollDown = target.scrollHeight > target.scrollTop + target.clientHeight;
            const canScrollUp = target.scrollTop > 0;

            if ((event.deltaY > 0 && !canScrollDown) || (event.deltaY < 0 && !canScrollUp)) {
                // Blokuj przewijanie strony, gdy nie można przewijać w kontenerze
                event.preventDefault();
            }
        }
    };

    // Obsługa scrollowania strony
    // let currentSection = 0;
    // window.addEventListener("wheel", (event) => {
    //     if (isScrolling || isInsideScrollableContainer(event)) return;

    //     if (event.deltaY > 0) {
    //         // Scroll w dół
    //         currentSection = Math.min(currentSection + 1, sections.length - 1);
    //     } else if (event.deltaY < 0) {
    //         // Scroll w górę
    //         currentSection = Math.max(currentSection - 1, 0);
    //     }

    //     scrollToSection(currentSection);
    // });

    // Obsługa scrollowania w kontenerach objętych wyjątkiem
    scrollableContainers.forEach(container => {
        container.addEventListener("wheel", preventPageScroll);
    });

    // Obsługa scrollowania na urządzeniach mobilnych (swipe)
    let touchStartY = 0;
    let touchEndY = 0;

    window.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener("touchend", (event) => {
        touchEndY = event.changedTouches[0].clientY;

        if (isScrolling || isInsideScrollableContainer(event)) return;

        if (touchStartY - touchEndY > 50) {
            // Swipe w dół
            currentSection = Math.min(currentSection + 1, sections.length - 1);
        } else if (touchEndY - touchStartY > 50) {
            // Swipe w górę
            currentSection = Math.max(currentSection - 1, 0);
        }

        scrollToSection(currentSection);
    });
});

// Obsługa kopiowania adresu email
document.querySelector('.email-icon').addEventListener('click', function () {
    const emailText = document.querySelector('.email-paragraph');
    const email = this.dataset.email;

    // Kopiowanie do schowka
    navigator.clipboard.writeText(email).then(() => {
        emailText.classList.add('visible');
    });
});