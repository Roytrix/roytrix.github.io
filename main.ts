window.onload = function() {
    const commandInput = document.getElementById('command') as HTMLInputElement;
    commandInput.focus();
    commandInput.click();

    // Play silent sound to enable audio playback
    const silentSound = document.getElementById('click-sound') as HTMLAudioElement;
    silentSound.play().then(() => {
        // Silent sound played successfully
    }).catch((error) => {
        console.error('Silent sound playback failed:', error);
    });
};

let charIndex = 0;
let welcomeMessage =  "Welcome - Type 'help' for a list of commands...";
const commandInput = document.getElementById('command') as HTMLInputElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;
const promptSymbol = '$'; // Prompt symbol
const clickSound = document.getElementById('click-sound') as HTMLAudioElement;

// Command responses
const commands = {
    help: "Available commands:\n- help: Show this help menu\n- clear: Clear the terminal\n- about: Learn about this terminal\n- time: Display current time\n- echo: Print a message\nExample: echo Hello, world!",
    about: "This is a simulated terminal created with HTML, CSS, and Typescript.",
    clear: "clear",
    time: () => `Current time: ${new Date().toLocaleTimeString()}`,
    echo: (args: string[]) => args.join(' ') || "Usage: echo [message]",
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
   // document.getElementById('terminal')!.scrollTop = terminal.scrollHeight;
}

function typeCommand() {
    if (charIndex < welcomeMessage.length) {
        commandInput.value += welcomeMessage.charAt(charIndex);
        clickSound.currentTime = 0.16;
        clickSound.play(); // Play the click sound
        charIndex++;
        setTimeout(typeCommand, 50);
    } else {
        setTimeout(() => {
            commandInput.value = '';
        }, 2000);
    }
}

typeCommand();