// Funkcja sprawdzająca rozmiar ekranu
function isScreenLargeEnough() {
    return window.innerWidth > 1001 && window.innerHeight > 1001;
}
// Pobierz element obrazu
const imageElement = document.querySelector('.image-container img');

// Domyślna ścieżka obrazu
const defaultImage = 'obrazy/ilustracja-mapa2dark.png';
// Ścieżka dla Regionu 1
const region1Image = 'obrazy/ilustracja-mapa2light.png';

// Ścieżka do niestandardowej ikony kursora
const customCursor = 'obrazy/loupe.png';

// Obsługa najechania kursorem na region
document.querySelectorAll('.b_region').forEach(region => {
    region.addEventListener('mouseover', (event) => {
        const regionName = event.target.getAttribute('data-region');

        // Jeśli to Region 1, zmień obraz i kursor
        if (regionName === "Region 1" && isScreenLargeEnough()) {
            imageElement.src = region1Image;
            region.style.cursor = `url(${customCursor}), auto`;
        }
    });

    // Obsługa wyjścia kursora z regionu
    region.addEventListener('mouseout', (event) => {
        const regionName = event.target.getAttribute('data-region');

        // Jeśli to Region 1, przywróć domyślny obraz i kursor
        if (regionName === "Region 1") {
            imageElement.src = defaultImage;
            region.style.cursor = 'default';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Pobranie elementów do ukrycia
    const interactiveMapContainer = document.querySelector(".interactiveMap-container");
    const imageContainer = document.querySelector(".image-container");
    const textContainer = document.querySelector(".text-container");
    const iconContainer = document.querySelector(".icon-container");
    const svgCont = document.querySelector(".interactive-overlay")

    // Pobranie wszystkich regionów
    const regions = document.querySelectorAll(".b_region");

    // Dodanie zdarzenia kliknięcia do każdego regionu
    regions.forEach(region => {
        region.addEventListener("click", () => {
            // Ustawienie widoczności kontenera interaktywnej mapy
            interactiveMapContainer.style.display = "flex";

            // Ukrycie wybranych kontenerów
            imageContainer.style.display = "none";
            textContainer.style.display = "none";
            iconContainer.style.display = "none";
            svgCont.style.display = "none"


        });
    });

    // Dodanie zdarzenia kliknięcia na .icon-container
    iconContainer.addEventListener("click", () => {
        interactiveMapContainer.style.display = "flex";
        imageContainer.style.display = "none";
        textContainer.style.display = "none";
        iconContainer.style.display = "none";
        svgCont.style.display = "none";
    });

});


// skrypt generujący pyłki w sekcji interaktywnej mapy
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const maxParticles = 200;

    // Dopasowanie rozmiaru canvas do okna
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tworzenie cząstek
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.9 + 0.5, // Rozmiar cząstki
            opacity: Math.random(),
            speedX: Math.random() * 0.9 - 0.25, // Prędkość w osi X
            speedY: Math.random() * 0.9 - 0.25, // Prędkość w osi Y
        };
    }

    // Inicjalizacja cząstek
    for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle());
    }

    // Aktualizacja pozycji cząstek
    function updateParticles() {
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Resetowanie cząstki, jeśli wychodzi poza ekran
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                Object.assign(p, createParticle());
            }
        });
    }

    // Rysowanie cząstek
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(241, 244, 204, ${p.opacity})`; // 255,255,255
            ctx.fill();
        });
    }

    // Pętla animacji
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    animate();
});

// skrypt wyłącza przewijanie strony kólkiem myszy, gdy kursor znajduje się z kontenerze .region-description_v2
document.addEventListener("DOMContentLoaded", () => {
const scrollContainer = document.querySelector(".region-description_v2");

    scrollContainer.addEventListener("wheel", (event) => {
        // Sprawdź, czy użytkownik jest na początku lub końcu przewijania kontenera
        const isAtTop = scrollContainer.scrollTop === 0;
        const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight;

        if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
            event.preventDefault(); // Zatrzymanie przewijania strony
        }
    });
});








