const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const clearButton =
    document.getElementById("clearButton");

const charactersGrid =
    document.getElementById("charactersGrid");

const noResults =
    document.getElementById("noResults");

const resultsInfo =
    document.getElementById("resultsInfo");


/* =========================
   FENÊTRE IMAGE
========================= */

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");


let personnages = [];


/* =========================
   CHARGER LE JSON
========================= */

async function chargerPersonnages() {

    try {

        const response =
            await fetch("./data.json");


        if (!response.ok) {

            throw new Error(
                `Erreur HTTP ${response.status}`
            );

        }


        personnages =
            await response.json();


        if (!Array.isArray(personnages)) {

            throw new Error(
                "data.json doit contenir une liste."
            );

        }


        /*
         * IMPORTANT :
         * On n'affiche PAS les personnages
         * au démarrage.
         */

        charactersGrid.innerHTML = "";

        resultsInfo.textContent = "";

        noResults.classList.add("hidden");


        console.log(
            "Personnages chargés :",
            personnages
        );

    }


    catch (error) {

        console.error(
            "Erreur :",
            error
        );


        resultsInfo.textContent =
            "Erreur de chargement";


        noResults.classList.remove("hidden");


        noResults.querySelector("h2").textContent =
            "Impossible de charger la banque";


        noResults.querySelector("p").textContent =
            "Vérifie que data.json est bien à côté de index.html.";

    }

}


/* =========================
   RECHERCHE
========================= */

function rechercherPersonnage() {

    const recherche =
        searchInput.value
            .trim()
            .toLowerCase();


    /*
     * Si la barre est vide,
     * on ne montre rien.
     */

    if (recherche === "") {

        charactersGrid.innerHTML = "";

        resultsInfo.textContent = "";

        noResults.classList.add("hidden");

        return;

    }


    /*
     * Recherche du personnage
     */

    const resultats =
        personnages.filter(personnage =>

            personnage.nom
                .toLowerCase()
                .includes(recherche)

        );


    /*
     * Nettoyer les anciens résultats
     */

    charactersGrid.innerHTML = "";

    noResults.classList.add("hidden");


    /* =====================
       PERSONNAGE TROUVÉ
    ===================== */

    if (resultats.length > 0) {

        resultsInfo.textContent =
            `${resultats.length} résultat${resultats.length > 1 ? "s" : ""}`;


        resultats.forEach(personnage => {

            const card =
                document.createElement("div");


            card.className =
                "character-card";


            /* IMAGE */

            const image =
                document.createElement("img");


            image.src =
                personnage.image;


            image.alt =
                `Fiche de ${personnage.nom}`;


            image.onerror = function () {

                console.error(
                    "Image introuvable :",
                    personnage.image
                );

            };


            /* NOM */

            const name =
                document.createElement("div");


            name.className =
                "character-name";


            name.textContent =
                personnage.nom;


            /* =====================
               CLIQUER SUR LA FICHE
            ===================== */

            card.addEventListener(
                "click",
                () => {

                    ouvrirImage(
                        personnage.image,
                        personnage.nom
                    );

                }
            );


            card.appendChild(image);

            card.appendChild(name);

            charactersGrid.appendChild(card);

        });


    }


    /* =====================
       PERSONNAGE NON TROUVÉ
    ===================== */

    else {

        resultsInfo.textContent = "";


        noResults.classList.remove("hidden");

    }

}


/* =========================
   OUVRIR IMAGE EN GRAND
========================= */

function ouvrirImage(
    cheminImage,
    nomPersonnage
) {

    modalImage.src =
        cheminImage;


    modalImage.alt =
        `Fiche d'amélioration de ${nomPersonnage}`;


    imageModal.classList.remove("hidden");

}


/* =========================
   FERMER IMAGE
========================= */

function fermerImage() {

    imageModal.classList.add("hidden");

    modalImage.src = "";

}


/* =========================
   BOUTON RECHERCHE
========================= */

searchButton.addEventListener(
    "click",
    rechercherPersonnage
);


/* =========================
   TOUCHE ENTRÉE
========================= */

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            rechercherPersonnage();

        }

    }
);


/* =========================
   BOUTON EFFACER
========================= */

clearButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        charactersGrid.innerHTML = "";

        resultsInfo.textContent = "";

        noResults.classList.add("hidden");

        searchInput.focus();

    }
);


/* =========================
   BOUTON X DE LA FENÊTRE
========================= */

modalClose.addEventListener(
    "click",
    fermerImage
);


/* =========================
   CLIQUER À CÔTÉ DE L'IMAGE
========================= */

imageModal.addEventListener(
    "click",
    event => {

        if (event.target === imageModal) {

            fermerImage();

        }

    }
);


/* =========================
   TOUCHE ÉCHAP
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !imageModal.classList.contains("hidden")
        ) {

            fermerImage();

        }

    }
);


/* =========================
   DÉMARRAGE
========================= */

chargerPersonnages();