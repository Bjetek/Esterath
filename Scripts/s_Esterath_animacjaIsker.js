const container = document.querySelector('.s_Esterath-background');
const maxSparks = 6; // Maksymalna liczba iskierek na ekranie
let minWidth = 0; // Początkowa lewa granica
let maxWidth = 0; // Początkowa prawa granica

// Funkcja aktualizująca zakres startowy iskierek na podstawie szerokości ekranu
function updateSparkArea() {
    let screenWidth = window.innerWidth;

    if(screenWidth > 1400){
        minWidth = 42;
        maxWidth = 46;
    }else if (screenWidth > 1200) { // Ekrany duże
        minWidth = 40;
        maxWidth = 45;
    } else if (screenWidth > 1000) { // Ekrany średnie
        minWidth = 42;
        maxWidth = 44;
    } else if (screenWidth > 700) { // Ekrany średnie
        minWidth = 38;
        maxWidth = 40;
    } else { // Ekrany małe
        minWidth = 20;
        maxWidth = 28;
    }
}

// Nasłuchuj zmiany rozmiaru okna
window.addEventListener('resize', updateSparkArea);
updateSparkArea(); // Wywołanie na start, aby ustawić początkowy zakres
function generateSparks(number) {
    for (let i = 0; i < number; i++) {
        // Usunięcie najstarszej iskierki, jeśli jest ich za dużo
        if (container.querySelectorAll('.spark').length >= maxSparks) {
            const oldestSpark = container.querySelector('.spark');
            if (oldestSpark) oldestSpark.remove();
        }

        const spark = document.createElement('div');
        spark.classList.add('spark');

        let startX = Math.random() * (maxWidth - minWidth) + minWidth;
        spark.style.left = `${startX}%`;

        // Losowe przemieszczenie w poziomie i pionie
        let moveX = Math.random() * 1000 - 500;
        let moveY = -(Math.random() * 600 + 400);

        spark.style.setProperty('--spark-x', `${moveX}px`);
        spark.style.setProperty('--spark-y', `${moveY}px`);

        // Losowy czas trwania animacji
        const randomDuration = Math.random() * 12 + 6; 
        spark.style.animationDuration = `${randomDuration}s`;

        // Dodanie iskry do kontenera
        container.appendChild(spark);
    }
}

// Tworzenie iskierek co 1 sekundę
setInterval(() => generateSparks(1), 1500); 