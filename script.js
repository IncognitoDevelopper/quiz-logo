// fetch("./devicon_icons_with_urls.json")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Erreur HTTP : ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(icons => {
//         let currentIndex = 0;
//         let score = 0;
//         let fdp = 0;
//         const iconDisplay = document.getElementById("icon-display");
//         const userInput = document.getElementById("user-input");
//         const submitBtn = document.getElementById("submit-btn");
//         const showAnswerBtn = document.getElementById("show-answer-btn");
//         const feedback = document.getElementById("feedback");
//         const scoreDisplay = document.getElementById("score");

//         // Mélange des icônes de manière aléatoire
//         icons = shuffleArray(icons);

//         // Fonction pour afficher l'icône actuelle
//         function displayIcon() {
//             const currentIcon = icons[currentIndex];
//             iconDisplay.innerHTML = `<img src="${currentIcon.url}" alt="${currentIcon.name}">`;
//             userInput.value = ""; // Réinitialise le champ de saisie
//             feedback.textContent = ""; // Réinitialise le feedback
//         }

//         // Fonction pour valider la réponse
//         function validateAnswer() {
//             const userAnswer = userInput.value.trim().toLowerCase();
//             const correctAnswer = icons[currentIndex].name.toLowerCase();
//             if (userAnswer === correctAnswer) {
//                 feedback.textContent = "Correct !";
//                 feedback.style.color = "green";
//                 if (fdp === 0)
//                     score++;
//                 scoreDisplay.textContent = `Score : ${score}`;
//                 currentIndex = (currentIndex + 1) % icons.length;
//                 setTimeout(displayIcon, 1000); // Passe à l'icône suivante après 1 seconde
//                 fdp = 0;
//             } else {
//                 feedback.textContent = "Mauvaise réponse. Réessayez !";
//                 feedback.style.color = "red";
//             }
//         }

//         // Fonction pour afficher la réponse correcte
//         function showAnswer() {
//             const correctAnswer = icons[currentIndex].name;
//             feedback.textContent = `La bonne réponse est : ${correctAnswer}`;
//             feedback.style.color = "blue";
//             fdp++;
//         }

//         // Fonction pour mélanger les icônes aléatoirement
//         function shuffleArray(array) {
//             for (let i = array.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
//             }
//             return array;
//         }

//         // Écouteurs d'événements
//         submitBtn.addEventListener("click", validateAnswer);
//         showAnswerBtn.addEventListener("click", showAnswer);

//         // Lancer le quiz
//         displayIcon();
//     })
//     .catch(error => console.error("Erreur lors du fetch :", error));

fetch("./devicon_icons_with_urls.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
    })
    .then(icons => {
        let currentIndex = 0;
        let score = 0;
        let fdp = 0;
        const iconDisplay = document.getElementById("icon-display");
        const userInput = document.getElementById("user-input");
        const submitBtn = document.getElementById("submit-btn");
        const showAnswerBtn = document.getElementById("show-answer-btn");
        const feedback = document.getElementById("feedback");
        const scoreDisplay = document.getElementById("score");

        // Mélange des icônes de manière aléatoire
        icons = shuffleArray(icons);

        // Fonction pour afficher l'icône actuelle
        function displayIcon() {
            const currentIcon = icons[currentIndex];
            iconDisplay.innerHTML = `<img src="${currentIcon.url}" alt="${currentIcon.name}">`;
            userInput.value = ""; // Réinitialise le champ de saisie
            feedback.textContent = ""; // Réinitialise le feedback
        }

        // Fonction pour valider la réponse en fonction de la similarité
        function validateAnswer() {
            const userAnswer = userInput.value.trim().toLowerCase();
            const correctAnswer = icons[currentIndex].name.toLowerCase();

            // Calcul de la distance de Levenshtein entre la réponse de l'utilisateur et la réponse correcte
            const distance = levenshtein(userAnswer, correctAnswer);
            const threshold = 1; // Seuil de similarité, plus il est bas, plus la réponse doit être précise

            if (distance <= threshold) {
                feedback.textContent = "Correct !";
                feedback.style.color = "green";
                if (fdp === 0)
                    score++;
                scoreDisplay.textContent = `Score : ${score}`;
                currentIndex = (currentIndex + 1) % icons.length;
                setTimeout(displayIcon, 1000); // Passe à l'icône suivante après 1 seconde
                fdp = 0;
            } else {
                feedback.textContent = "Mauvaise réponse. Réessayez !";
                feedback.style.color = "red";
            }
        }

        // Fonction pour afficher la réponse correcte
        function showAnswer() {
            const correctAnswer = icons[currentIndex].name;
            feedback.textContent = `La bonne réponse est : ${correctAnswer}`;
            feedback.style.color = "blue";
            fdp++;
        }

        // Fonction pour mélanger les icônes aléatoirement
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
            }
            return array;
        }

        // Fonction de calcul de la distance de Levenshtein
        function levenshtein(a, b) {
            const tmp = [];
            let i, j;
            for (i = 0; i <= a.length; i++) {
                tmp[i] = [i];
            }
            for (j = 0; j <= b.length; j++) {
                tmp[0][j] = j;
            }
            for (i = 1; i <= a.length; i++) {
                for (j = 1; j <= b.length; j++) {
                    tmp[i][j] = Math.min(
                        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
                        tmp[i][j - 1] + 1,
                        tmp[i - 1][j] + 1
                    );
                }
            }
            return tmp[a.length][b.length];
        }

        // Écouteurs d'événements
        submitBtn.addEventListener("click", validateAnswer);
        showAnswerBtn.addEventListener("click", showAnswer);

        // Lancer le quiz
        displayIcon();
    })
    .catch(error => console.error("Erreur lors du fetch :", error));

//TODO: Ajouter le fait de valider une question avec la touche "Entrée" du clavier
//TODO: Ajouter un timer pour chaque question / mode de jeu
//TODO: Ajouter un mode de jeu "Survie" où le joueur a un nombre limité de vies
//TODO: Ajouter un mode de jeu "Contre-la-montre" où le joueur doit répondre à un maximum de questions en un temps limité
//TODO: Ajouter un mode de jeu "Multijoueur" où plusieurs joueurs peuvent jouer en même temps
//TODO: Faire en sorte que les images n'ont pas leur nom dans le nom du fichier pour eviter pendant le chargement d'avoir la reponse
//TODO: Marquer la vrai reponse avant de passer a la suivante
//TODO: autocompletion de la reponse
//TODO: classement des joueurs
//TODO: ajouter filtre par categorie d'icones (ex: web, devops, etc)