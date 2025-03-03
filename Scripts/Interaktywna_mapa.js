// Funkcja zmieniająca tło sekcji na podstawie wybranego regionu
function updateSectionBackground(regionName) {
    let radioElement; // Deklaracja zmiennej przed warunkiem

    if (regionName === "Boromushi") {
        radioElement = document.getElementById('r2_map');
    } else if (regionName === "NorthAresia"){
        radioElement = document.getElementById('r3_map');
    } else if (regionName === "SouthAresia"){
        radioElement = document.getElementById('r4_map');
    } else if (regionName === "Clenyia"){
        radioElement = document.getElementById('r5_map');
    } else if (regionName === "Alornard"){
        radioElement = document.getElementById('r6_map');
    } else if (regionName === "Reughtar"){
        radioElement = document.getElementById('r7_map');
    } else {
        radioElement = document.getElementById('r1_map');
    }
    radioElement.checked = true; 
}

// Funkcja do ładowania opisu regionu z pliku .txt
function loadRegionDescription(regionId) {

    if (regionId == "NorthAresia" || regionId == "SouthAresia"){
        regionId = "Aresia";
    }
    // Ścieżka do pliku .txt dla wybranego regionu
    const filePath = `Historia/${regionId}.txt`;

    // Pobieramy kontener 'region-description'
    const regionDescription = document.querySelector('.region-description_v2');

    // Wczytujemy plik .txt i umieszczamy jego zawartość w kontenerze
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Nie udało się załadować pliku.");
            }
            return response.text();
        })
        .then(text => {
            regionDescription.textContent = text;
        })
        .catch(error => {
            console.error("Błąd podczas ładowania opisu regionu:", error);
            regionDescription.textContent = "Opis niedostępny."; // Wiadomość w razie błędu
        });
}

// Funkcja, która dodaje spacje przed wielkimi literami (NorthAresia => North Aresia)
function formatRegionName(regionId) {
    return regionId.replace(/([A-Z])/g, ' $1').trim();
}

// Pobieramy mapę, kontener mapy, opis i przycisk
const map = document.querySelector('#worldMap');
const descriptionContainer = document.querySelector('.description-container_v2');
const backToMapButton = document.querySelector('.back-to-map-btn_v2');
const worldSection = document.getElementById('s_EsterathMapV3');
const mapDescContainer = document.getElementById('s_IntertactiveMap')
const regionTitle = document.querySelector('.region-title_v2');
const Cursor = 'obrazy/loupe.png';
const dustCanvas = document.querySelector(".particle-container")

// Pobieramy wszystkie regiony
const regions = document.querySelectorAll('.region_v2');

// Dodajemy event listener dla każdego regionu - najechanie i opuszczenie
regions.forEach(region => {
    region.addEventListener('mouseenter', function() {
        // Sprawdzamy, czy jesteśmy w trybie domyślnym (czyli bez klasy 'selected')
        if (!mapDescContainer.classList.contains('selected')) {
            // Podmieniamy obraz mapy na odpowiednią wersję
            const regionId = region.id; // podmień obraz mapy
            map.src = `obrazy/${regionId}.png`; // Zakładamy, że nazwy plików odpowiadają id regionów
            region.style.cursor = `url(${Cursor}), auto`; // podmień kursor
        }
        // ustawiamy domyslny kursor (nie lupka) w widoku szegółowym (opis + mapka wybranego regionu) 
        else{
            region.style.cursor = `default`;
        }
    });

    region.addEventListener('mouseleave', function() {
        // Sprawdzamy, czy jesteśmy w trybie domyślnym
        if (!mapDescContainer.classList.contains('selected')) {
            // Przywracamy główną mapę
            map.src = 'obrazy/map_main.png';
            // przywróć kursor
            region.style.cursor = 'default';
        }
    });

    region.addEventListener('click', function(event) {
        // Sprawdzamy, czy jesteśmy w trybie domyślnym
        if (!mapDescContainer.classList.contains('selected')) {
            event.preventDefault(); // Zapobiega domyślnemu działaniu

            // Ustawiamy nazwę regionu w sekcji z opisem
            regionTitle.textContent = formatRegionName(region.id);

            // Ładujemy opis dla wybranego regionu
            loadRegionDescription(region.id);

            // Przejście do widoku z opisem
            mapDescContainer.classList.add('selected'); // Dodaje klasę 'selected' do sekcji
            descriptionContainer.classList.remove('hidden'); // Pokazuje kontener z opisem
            map.style.maxWidth = '100%'; // Zmniejsza mapę i przesuwa na prawo

            // Ustawiamy szczegółowy obraz na podstawie ID regionu
            const detailedImage = `obrazy/${region.id}_detailed.png`; // Tworzymy nazwę obrazu
            map.src = detailedImage; // Zmieniamy mapę na obraz szczegółowy

            // Ukrywamy wyświetlanie pyłków
            dustCanvas.style.display = "none";

            updateSectionBackground(region.id)
        }
    });
});

// obsługa przycisku powrotu (drogowskaz)
const returnButton = document.querySelector(".back-to-main-map-slide")

const interactiveMapContainer = document.querySelector(".interactiveMap-container");
const imageContainer = document.querySelector(".image-container");
const textContainer = document.querySelector(".text-container");
const iconContainer = document.querySelector(".icon-container");
const svgCont = document.querySelector(".interactive-overlay")

returnButton.addEventListener('click', function() {
    // Sprawdzenie, czy klasa "hidden" jest aktywna
    if (descriptionContainer.classList.contains('hidden')) {
        // Powrót z widoku interaktywnej mapki do widoku głównego (domyślny slajd)
        interactiveMapContainer.style.display = "none";
        imageContainer.style.display = "";
        textContainer.style.display = "";
        iconContainer.style.display = "";
        svgCont.style.display = "";

    } else {
        // Powrót z widoku szczegółowego (opisy + obraz region) do widoku interaktywnej mapki
        updateSectionBackground("Esterath_Background")
        mapDescContainer.classList.remove('selected');
        descriptionContainer.classList.add('hidden');
        map.style.maxWidth = '100%'; // Przywraca mapę do pełnych rozmiarów

        // Przywracamy działanie podświetlania (domyślna mapa)
        map.src = 'obrazy/map_main.png';

        // Przywracamy wyświetlanie pyłków
        dustCanvas.style.display = "initial"; 

        setDefaultActiveCircle()
    }

});


/* #region Skrypt obsługujący zmianę wyświetlania tekstu opisów wybranego regionu (oraz zmianę wskaźnika - kropek) */
 
// funkcja ustawiająca pierwszą kropkę jako aktywną, a drugą nieaktywną (ustawienia domyślne)
function setDefaultActiveCircle() {
    const circles = document.querySelectorAll(".circle");

    // Usuń klasę 'active' z wszystkich kropek
    circles.forEach(circle => circle.classList.remove("active"));

    // Ustaw pierwszą kropkę jako aktywną
    if (circles[0]) {
        circles[0].classList.add("active");
    }
}

// obsługa kliknięć w kropki
document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle"); // Pobierz wszystkie kropki
    let regionNameForDescription="";
    



    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            // Sprawdź, czy kliknięta kropka już ma klasę 'active'
            if (circle.classList.contains("active")) {
                console.log("Kliknięto już aktywną kropkę. Brak zmiany.");
                return; // Przerwij działanie funkcji, jeśli kropka jest już aktywna
            }

            // Usuń klasę 'active' ze wszystkich kropek
            circles.forEach(c => c.classList.remove("active"));

            // Dodaj klasę 'active' do klikniętej kropki
            circle.classList.add("active");

            // Zaloguj informacje o kliknięciu
            const index = circle.getAttribute("data-index");
            console.log(`Kliknięto kropkę numer ${index}`);
            console.log(`Region: ${regionTitle.textContent}`);
            console.log(`Region 2: ${regionNameForDescription.toString()}`);

            regionNameForDescription = regionTitle.textContent;
            // Inicjalizacja regionNameForDescription na podstawie regionTitle
            if (index == "1"){
                if (regionNameForDescription == "North Aresia" || regionNameForDescription == "South Aresia"){
                    regionNameForDescription = "Aresia";
                }
            } else {
                if (regionNameForDescription == "North Aresia"){
                    regionNameForDescription = "NorthAresia";
                }
                else if (regionNameForDescription == "South Aresia"){
                    regionNameForDescription = "SouthAresia";
                }
            }

            // Załaduj opis w zależności od regionu
            loadDescription(regionNameForDescription, index);
        });
    });
});


// Funkcja wczytująca tekst przy zmianie wybranej kropki
function loadDescription(rN, activeDotIndex) {
    // Pobierz kontener regionDescription
    const regionDescription = document.querySelector(".region-description_v2");

    // Pobierz aktywną kropkę
    const currentActiveDot = document.querySelector(".pagination-indicator .circle.active");

    // Sprawdź, czy aktywna kropka jest taka sama jak ta, którą chcemy ustawić
    const currentActiveIndex = currentActiveDot ? currentActiveDot.dataset.index : null;

    // Ustal folder, z którego będzie ładowany plik
    const folderName = activeDotIndex === "1" ? "Historia" : "Lokacje";

    // Ścieżka do pliku .txt
    const filePath = `${folderName}/${rN}.txt`;
    console.log(filePath)

    // Wczytaj plik .txt i ustaw jego zawartość w kontenerze
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Nie udało się załadować pliku.");
            }
            return response.text();
        })
        .then(text => {
            regionDescription.textContent = text;
        })
        .catch(error => {
            console.error("Błąd podczas ładowania tekstu:", error);
            regionDescription.textContent = "Nie udało się załadować opisu.";
        });
}

/* #endregion */



