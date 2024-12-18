// TypeScript in a modern browser (or use a bundler like Vite/Webpack for older environments)
    const canvas = document.getElementById('matrix') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

// Set canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// Characters to use for the rain
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 16; // Font size for each character
    const columns = Math.floor(canvas.width / fontSize); // Number of columns
    const drops: number[] = Array(columns).fill(1); // Initial Y positions of each column

    function draw() {
        // Black background with slight opacity for fading effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text color
        ctx.fillStyle = "#0F0";
        ctx.font = `${fontSize}px monospace`;

        // Draw each column
        for (let i = 0; i < drops.length; i++) {
            // Pick a random character from the string
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];

            // Draw the character at the current column and drop position
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Randomly reset drop to the top with some probability
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move the drop down
            drops[i]++;
        }
    }

// Run the animation
    setInterval(draw, 50);



