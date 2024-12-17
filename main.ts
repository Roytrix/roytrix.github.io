window.onload = function() {
    const commandInput = document.getElementById('command') as HTMLInputElement;
    commandInput.focus();
    commandInput.click();
}
let charIndex = 0;
let welcomeMessage =  "Welcome - Type 'help' for a list of commands...";
const commandInput = document.getElementById('command') as HTMLInputElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;
const promptSymbol = '$'; // Prompt symbol
const clickSound = document.getElementById('click-sound') as HTMLAudioElement;

// CV content
const cvContent = `
Jean-Marc Hébert
Programmeur-Analyste
Email : johnmarkhebert@gmail.com | Téléphone : 581-909-3019 | Québec, Canada
________________________________________

Profil Professionnel

Programmeur passionné avec plus de 10 ans d'expérience en développement logiciel, automatisation des tests et pratiques DevOps.
Expertise dans les environnements .NET, JavaScript, TypeScript et les pipelines CI/CD. Fort d’une capacité à concevoir des solutions robustes et innovantes, 
je combine mon expertise technique avec une approche proactive et une capacité démontrée à travailler en équipe pour livrer des projets de haute qualité.
________________________________________

Compétences Techniques

Langages de Programmation : C#, VB.NET, JavaScript, TypeScript, Java
Frameworks et Outils : .NET Framework, Jenkins, BDD, CI/CD, DevOps
Automatisation et QA : Tests UI automatisés, bots de test, pipelines d'intégration continue
Bases de Données : SQL, MySQL, SQLITE
Compétences Transversales : Gestion d'équipe, formation, amélioration continue
________________________________________

Expériences Professionnelles

Responsable Assurance Qualité & Développement de Tests Automatisés | Eddyfi, Québec
\tJuin 2018 – Février 2022
\t•  Développement de logiciels et bots pour automatiser les tests d’interfaces utilisateurs.
\t•  Mise en place de pipelines CI/CD pour l'intégration des tests automatisés.
\t•  Gestion et formation de l'équipe QA afin d’optimiser les processus d'assurance qualité.
\t  •Participation à l'amélioration continue des processus DevOps.
Architecte Logiciel .NET & Web | INRS (Université du Québec), Québec
\tNovembre 2017 – Juin 2018
\t•  Analyse approfondie de l'architecture logicielle existante et recommandations d’améliorations.
\t•  Support des développeurs pour la mise en œuvre de solutions optimisées.
Programmeur Analyste JavaScript | ICOD, Saint-Jean-sur-Richelieu
\tJuin 2013 – Janvier 2015
\t•  Contribution à l'amélioration d’un ERP dans le secteur de l’assurance santé.
Programmeur Analyste C# .NET | LaSalle International, Montréal
\tFévrier 2012 – Juin 2013
\t•  Développement d’applications sur mesure pour Microsoft CRM Dynamics 2011.
\t•  Participation au développement d’une application iPad pour des salons étudiants.
Programmeur Analyste VB.NET | 6i Solution, Trois-Rivières
\tSeptembre 2011 – Février 2012
\t•  Développement de frameworks pour les applications ERP.
Programmeur Analyste VB.NET | TMS Systeme, St-Henri
\tMai 2010 – Juin 2011
\t•  Amélioration de logiciels ERP propriétaires et autres applications logicielles.
\t•  Transition réussie d'un stage de fin d'études vers une embauche à temps plein.
________________________________________

Éducation

AEC – Programmeur-Analyste
Collège Multihexa, Québec | 2010

DEP – Mécanicien Diesel et Engins de Chantier
Centre de Formation Carrefour Mauricie, Shawinigan | 2004
________________________________________

Projets Personnels

Automatisation de la Planification de Production
\t•  Conception d’un algorithme en JavaScript pour Google Sheets permettant d’automatiser la planification des cultures en fonction des canaux de distribution et de la demande client.

________________________________________

Langues

\t•Français : Langue maternelle
\t•Anglais : Professionnel
`;

// Command responses
const commands = {
    help: "Available commands:\n- help: Show this help menu\n- clear: Clear the terminal\n- cv: show my past experiences\n- about: Learn about this terminal\n- time: Display current time\n- echo: Print a message\nExample: echo Hello, world!",
    about: "This is a simulated terminal created with HTML, CSS, and Typescript.",
    clear: "clear",
    time: () => `Current time: ${new Date().toLocaleTimeString()}`,
    echo: (args: string[]) => args.join(' ') || "Usage: echo [message]",
    cv: cvContent
};

// Handle input and command execution
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = commandInput.value.trim();
        if (input) {
            processCommand(input);
            commandInput.value = '';
        }
    }
});

function processCommand(input: string) {
    const [command, ...args] = input.split(' ');
    const lowerCommand = command.toLowerCase();

    let response:any;
    if (commands[lowerCommand]) {
        response = typeof commands[lowerCommand] === 'function'
            ? commands[lowerCommand](args)
            : commands[lowerCommand];
    } else {
        response = `Command not found: ${command}. Type 'help' for a list of available commands.`;
    }

    printOutput(input, response);
}

function printOutput(input: string, response: string) {
    const inputLine = `<div>${promptSymbol} ${input}</div>`;
    const outputLine = response === 'clear'
        ? ''
        : `<div>${response}</div>`;

    if (response === 'clear') {
        outputDiv.innerHTML = '';
    } else {
        outputDiv.innerHTML += inputLine + outputLine;
    }

    // Scroll to bottom
    const terminal = document.getElementById('terminal') as HTMLDivElement;
    terminal.scrollTop = terminal.scrollHeight;
}

function typeCommand() {
    if (charIndex < welcomeMessage.length) {
        commandInput.value += welcomeMessage.charAt(charIndex);
        clickSound.currentTime = 0.17;
        clickSound.play(); // Play the click sound
        charIndex++;
        setTimeout(typeCommand, 30);
    } else {
        setTimeout(() => {
            commandInput.value = '';
        }, 2000);
    }
}

typeCommand();