window.onload = function () {
    var commandInput = document.getElementById('command');
    commandInput.focus();
    commandInput.click();
    // Play silent sound to enable audio playback
    var silentSound = document.getElementById('click-sound');
    silentSound.play().then(function () {
        // Silent sound played successfully
    }).catch(function (error) {
        console.error('Silent sound playback failed:', error);
    });
};
var charIndex = 0;
var welcomeMessage = "Welcome - Type 'help' for a list of commands...";
var commandInput = document.getElementById('command');
var outputDiv = document.getElementById('output');
var promptSymbol = '$'; // Prompt symbol
var clickSound = document.getElementById('click-sound');
// Command responses
var commands = {
    help: "Available commands:\n- help: Show this help menu\n- clear: Clear the terminal\n- about: Learn about this terminal\n- time: Display current time\n- echo: Print a message\nExample: echo Hello, world!",
    about: "This is a simulated terminal created with HTML, CSS, and Typescript.",
    clear: "clear",
    time: function () { return "Current time: ".concat(new Date().toLocaleTimeString()); },
    echo: function (args) { return args.join(' ') || "Usage: echo [message]"; },
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
    // document.getElementById('terminal')!.scrollTop = terminal.scrollHeight;
}
function typeCommand() {
    if (charIndex < welcomeMessage.length) {
        commandInput.value += welcomeMessage.charAt(charIndex);
        clickSound.currentTime = 0.16;
        clickSound.play(); // Play the click sound
        charIndex++;
        setTimeout(typeCommand, 50);
    }
    else {
        setTimeout(function () {
            commandInput.value = '';
        }, 2000);
    }
}
typeCommand();
