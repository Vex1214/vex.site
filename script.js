const informations = {
    "Heure et langue": {
        "Fuseau horaire": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "Langue principale": navigator.language,
        "Langues préférées": navigator.languages.join(", "),
        "Calendrier": Intl.DateTimeFormat().resolvedOptions().calendar,
        "Système de numération":
            Intl.NumberFormat().resolvedOptions().numberingSystem
    },

    "Navigateur": {
        "User-Agent": navigator.userAgent,
        "Plateforme": navigator.platform,
        "Cookies activés": navigator.cookieEnabled ? "oui" : "non",
        "Connexion Internet": navigator.onLine ? "oui" : "non"
    },

    "Écran et fenêtre": {
        "Résolution": `${screen.width} × ${screen.height} px`,
        "Zone disponible": `${screen.availWidth} × ${screen.availHeight} px`,
        "Fenêtre": `${window.innerWidth} × ${window.innerHeight} px`,
        "Densité de pixels": window.devicePixelRatio,
        "Profondeur de couleur": `${screen.colorDepth} bits`,
        "Orientation": screen.orientation?.type || "inconnue",
        "Écran tactile": navigator.maxTouchPoints > 0 ? "oui" : "non"
    },

    "Préférences système": {
        "Thème": window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "sombre"
            : "clair",

        "Animations réduites":
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "oui"
                : "non"
    },

    "Matériel": {
        "Cœurs du processeur":
            navigator.hardwareConcurrency || "non disponible",

        "Mémoire approximative":
            navigator.deviceMemory
                ? `≈ ${navigator.deviceMemory} Go`
                : "non disponible",

        "WebGL":
            "WebGL" in document.createElement("canvas")
                ? "oui"
                : "non"
    },

    "Connexion": {
        "Type":
            navigator.connection?.effectiveType || "non disponible",

        "Débit estimé":
            navigator.connection?.downlink
                ? `${navigator.connection.downlink} Mb/s`
                : "non disponible",

        "Latence estimée":
            navigator.connection?.rtt
                ? `${navigator.connection.rtt} ms`
                : "non disponible",

        "Économiseur de données":
            navigator.connection?.saveData
                ? "oui"
                : "non"
    },

    "Capacités": {
        "Géolocalisation":
            "geolocation" in navigator
                ? "disponible"
                : "non disponible",

        "Notifications":
            "Notification" in window
                ? "disponible"
                : "non disponible",

        "Caméra et micro":
            navigator.mediaDevices
                ? "disponibles"
                : "non disponibles",

        "Presse-papiers":
            navigator.clipboard
                ? "disponible"
                : "non disponible",

        "Bluetooth":
            "bluetooth" in navigator
                ? "disponible"
                : "non disponible",

        "Stockage local":
            "localStorage" in window
                ? "disponible"
                : "non disponible",

        "IndexedDB":
            "indexedDB" in window
                ? "oui"
                : "non"
    }
};


// ======================================
// AFFICHAGE DES INFORMATIONS
// ======================================

const conteneur = document.getElementById("informations");

for (const [categorie, donnees] of Object.entries(informations)) {

    const section = document.createElement("section");

    const titre = document.createElement("h2");
    titre.textContent = categorie;

    section.appendChild(titre);

    for (const [nom, valeur] of Object.entries(donnees)) {

        const ligne = document.createElement("div");
        ligne.className = "info";

        const nomElement = document.createElement("span");
        nomElement.className = "nom";
        nomElement.textContent = nom;

        const valeurElement = document.createElement("span");
        valeurElement.className = "valeur";
        valeurElement.textContent = valeur;

        ligne.appendChild(nomElement);
        ligne.appendChild(valeurElement);

        section.appendChild(ligne);
    }

    conteneur.appendChild(section);
}


// ======================================
// GÉOLOCALISATION
// ======================================

const boutonLocaliser = document.getElementById("localiser");
const resultat = document.getElementById("position");

boutonLocaliser.addEventListener("click", () => {

    if (!navigator.geolocation) {
        resultat.textContent =
            "❌ La géolocalisation n'est pas disponible.";
        return;
    }

    resultat.textContent =
        "⏳ Demande d'autorisation de localisation...";

    navigator.geolocation.getCurrentPosition(

        // Si la personne accepte
        (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            resultat.innerHTML = `
                ✅ Localisation obtenue !<br><br>
                Latitude : ${latitude.toFixed(5)}<br>
                Longitude : ${longitude.toFixed(5)}
            `;
        },

        // Si la personne refuse
        (erreur) => {

            if (erreur.code === 1) {
                resultat.textContent =
                    "❌ La permission de localisation a été refusée.";
            } else {
                resultat.textContent =
                    "❌ Impossible d'obtenir la localisation.";
            }
        }
    );
});