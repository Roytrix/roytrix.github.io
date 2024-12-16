---
layout: default
---

# Welcome to My Terminal
write -h for help

<div id="terminal">
    <div class="command-line">
        <span class="prompt">$</span>
        <span id="command"></span>
        <span class="terminal-cursor"></span>
    </div>
    <div id="output"></div>
</div>

<script>
    const commands = [
        { command: 'ls -la', output: 'total 0\ndrwxr-xr-x  2 user  staff  64 Oct  1 12:34 .\ndrwxr-xr-x  3 user  staff  96 Oct  1 12:34 ..' },
        { command: 'pwd', output: '/path/to/directory' },
        { command: 'mkdir new_directory', output: '' },
        { command: 'rm filename.txt', output: '' },
        { command: 'cat filename.txt', output: 'Hello, World!' },
        { command: 'cp source.txt destination.txt', output: '' },
        { command: 'mv oldname.txt newname.txt', output: '' },
        { command: 'df -h', output: 'Filesystem      Size   Used  Avail Capacity iused      ifree %iused  Mounted on\n/dev/disk1s1   500G   200G   300G    40%  1000000  200000000    0%   /' },
        { command: 'free -m', output: '              total        used        free      shared  buff/cache   available\nMem:           8000        2000        4000         500        2000        5000' },
        { command: '-h', output:'to have info write info'}
    ];

    let commandIndex = 0;
    let charIndex = 0;
    const commandElement = document.getElementById('command');
    const outputElement = document.getElementById('output');

    function typeCommand() {
        if (charIndex < commands[commandIndex].command.length) {
            commandElement.textContent += commands[commandIndex].command.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, 100);
        } else {
            setTimeout(() => {
                outputElement.textContent = commands[commandIndex].output;
                commandIndex = (commandIndex + 1) % commands.length;
                charIndex = 0;
                setTimeout(() => {
                    commandElement.textContent = '';
                    outputElement.textContent = '';
                    typeCommand();
                }, 2000);
            }, 500);
        }
    }

    typeCommand();
</script>