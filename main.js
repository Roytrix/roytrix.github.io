window.onload = function () {
    var commandInput = document.getElementById('command');
    commandInput.focus();
    commandInput.click();
};
var charIndex = 0;
var welcomeMessage = "Welcome - Type 'help' for a list of commands...";
var commandInput = document.getElementById('command');
var outputDiv = document.getElementById('output');
var promptSymbol = '$'; // Prompt symbol
var clickSound = document.getElementById('click-sound');
// CV content
var cvContent = "\nJean-Marc H\u00E9bert\nProgrammeur-Analyste\nEmail : johnmarkhebert@gmail.com | T\u00E9l\u00E9phone : 581-909-3019 | Qu\u00E9bec, Canada\n________________________________________\n\nProfil Professionnel\n\nProgrammeur passionn\u00E9 avec plus de 10 ans d'exp\u00E9rience en d\u00E9veloppement logiciel, automatisation des tests et pratiques DevOps.\nExpertise dans les environnements .NET, JavaScript, TypeScript et les pipelines CI/CD. Fort d\u2019une capacit\u00E9 \u00E0 concevoir des solutions robustes et innovantes, \nje combine mon expertise technique avec une approche proactive et une capacit\u00E9 d\u00E9montr\u00E9e \u00E0 travailler en \u00E9quipe pour livrer des projets de haute qualit\u00E9.\n________________________________________\n\nComp\u00E9tences Techniques\n\nLangages de Programmation : C#, VB.NET, JavaScript, TypeScript, Java\nFrameworks et Outils : .NET Framework, Jenkins, BDD, CI/CD, DevOps\nAutomatisation et QA : Tests UI automatis\u00E9s, bots de test, pipelines d'int\u00E9gration continue\nBases de Donn\u00E9es : SQL, MySQL, SQLITE\nComp\u00E9tences Transversales : Gestion d'\u00E9quipe, formation, am\u00E9lioration continue\n________________________________________\n\nExp\u00E9riences Professionnelles\n\nResponsable Assurance Qualit\u00E9 & D\u00E9veloppement de Tests Automatis\u00E9s | Eddyfi, Qu\u00E9bec\n\tJuin 2018 \u2013 F\u00E9vrier 2022\n\t\u2022  D\u00E9veloppement de logiciels et bots pour automatiser les tests d\u2019interfaces utilisateurs.\n\t\u2022  Mise en place de pipelines CI/CD pour l'int\u00E9gration des tests automatis\u00E9s.\n\t\u2022  Gestion et formation de l'\u00E9quipe QA afin d\u2019optimiser les processus d'assurance qualit\u00E9.\n\t  \u2022Participation \u00E0 l'am\u00E9lioration continue des processus DevOps.\nArchitecte Logiciel .NET & Web | INRS (Universit\u00E9 du Qu\u00E9bec), Qu\u00E9bec\n\tNovembre 2017 \u2013 Juin 2018\n\t\u2022  Analyse approfondie de l'architecture logicielle existante et recommandations d\u2019am\u00E9liorations.\n\t\u2022  Support des d\u00E9veloppeurs pour la mise en \u0153uvre de solutions optimis\u00E9es.\nProgrammeur Analyste JavaScript | ICOD, Saint-Jean-sur-Richelieu\n\tJuin 2013 \u2013 Janvier 2015\n\t\u2022  Contribution \u00E0 l'am\u00E9lioration d\u2019un ERP dans le secteur de l\u2019assurance sant\u00E9.\nProgrammeur Analyste C# .NET | LaSalle International, Montr\u00E9al\n\tF\u00E9vrier 2012 \u2013 Juin 2013\n\t\u2022  D\u00E9veloppement d\u2019applications sur mesure pour Microsoft CRM Dynamics 2011.\n\t\u2022  Participation au d\u00E9veloppement d\u2019une application iPad pour des salons \u00E9tudiants.\nProgrammeur Analyste VB.NET | 6i Solution, Trois-Rivi\u00E8res\n\tSeptembre 2011 \u2013 F\u00E9vrier 2012\n\t\u2022  D\u00E9veloppement de frameworks pour les applications ERP.\nProgrammeur Analyste VB.NET | TMS Systeme, St-Henri\n\tMai 2010 \u2013 Juin 2011\n\t\u2022  Am\u00E9lioration de logiciels ERP propri\u00E9taires et autres applications logicielles.\n\t\u2022  Transition r\u00E9ussie d'un stage de fin d'\u00E9tudes vers une embauche \u00E0 temps plein.\n________________________________________\n\n\u00C9ducation\n\nAEC \u2013 Programmeur-Analyste\nColl\u00E8ge Multihexa, Qu\u00E9bec | 2010\n\nDEP \u2013 M\u00E9canicien Diesel et Engins de Chantier\nCentre de Formation Carrefour Mauricie, Shawinigan | 2004\n________________________________________\n\nProjets Personnels\n\nAutomatisation de la Planification de Production\n\t\u2022  Conception d\u2019un algorithme en JavaScript pour Google Sheets permettant d\u2019automatiser la planification des cultures en fonction des canaux de distribution et de la demande client.\n\n________________________________________\n\nLangues\n\n\t\u2022Fran\u00E7ais : Langue maternelle\n\t\u2022Anglais : Professionnel\n";
// Command responses
var commands = {
    help: "Available commands:\n- help: Show this help menu\n- clear: Clear the terminal\n- cv: show my past experiences\n- about: Learn about this terminal\n- time: Display current time\n- echo: Print a message\nExample: echo Hello, world!",
    about: "This is a simulated terminal created with HTML, CSS, and Typescript.",
    clear: "clear",
    time: function () { return "Current time: ".concat(new Date().toLocaleTimeString()); },
    echo: function (args) { return args.join(' ') || "Usage: echo [message]"; },
    cv: cvContent
};
// Handle input and command execution
commandInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        var input = commandInput.value.trim();
        if (input) {
            processCommand(input);
            commandInput.value = '';
        }
    }
});
function processCommand(input) {
    var _a = input.split(' '), command = _a[0], args = _a.slice(1);
    var lowerCommand = command.toLowerCase();
    var response;
    if (commands[lowerCommand]) {
        response = typeof commands[lowerCommand] === 'function'
            ? commands[lowerCommand](args)
            : commands[lowerCommand];
    }
    else {
        response = "Command not found: ".concat(command, ". Type 'help' for a list of available commands.");
    }
    printOutput(input, response);
}
function printOutput(input, response) {
    var inputLine = "<div>".concat(promptSymbol, " ").concat(input, "</div>");
    var outputLine = response === 'clear'
        ? ''
        : "<div>".concat(response, "</div>");
    if (response === 'clear') {
        outputDiv.innerHTML = '';
    }
    else {
        outputDiv.innerHTML += inputLine + outputLine;
    }
    // Scroll to bottom
    var terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}
function typeCommand() {
    if (charIndex < welcomeMessage.length) {
        commandInput.value += welcomeMessage.charAt(charIndex);
        clickSound.currentTime = 0.17;
        clickSound.play(); // Play the click sound
        charIndex++;
        setTimeout(typeCommand, 30);
    }
    else {
        setTimeout(function () {
            commandInput.value = '';
        }, 2000);
    }
}
typeCommand();
