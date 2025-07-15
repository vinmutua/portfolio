document.addEventListener('DOMContentLoaded', function() {
    // Create matrix rain effect
    function createMatrixRain() {
        const chars = "01アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const container = document.getElementById('matrixContainer');
        const width = container.offsetWidth;
        
        for (let i = 0; i < 20; i++) {
            const matrixDrop = document.createElement('div');
            matrixDrop.className = 'matrix-drop';
            matrixDrop.style.left = Math.random() * width + 'px';
            matrixDrop.style.animationDuration = Math.random() * 2 + 3 + 's';
            matrixDrop.style.animationDelay = Math.random() * 5 + 's';
            
            let text = '';
            const length = Math.floor(Math.random() * 15) + 10;
            for (let j = 0; j < length; j++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            matrixDrop.textContent = text;
            container.appendChild(matrixDrop);
        }
    }
    
    // Set up date/time display
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', {hour12: false});
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize terminal
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    let authAttempts = 0;
    let accessGranted = true; // Set to false if you want to simulate login
    
    // Sample data for the portfolio with hacker twist
    const portfolioData = {
        about: [
            "[root@cyberterm]:$ User profile decrypted...",
            "",
            "> IDENT: ████████_SYSTEM_OPERATIVE",
            "> CODENAME: <span class='text-cyan-300'>NE0</span>",
            "> CLEARANCE: <span class='text-green-400'>LEVEL 5</span>",
            "> SPECIALIZATION: <span class='text-yellow-300'>CYBER_SECURITY | FULL_STACK_DEV</span>",
            "> LOCATION: ████████, ████████",
            "",
            "[BIO]:",
            "> 01010100 01110010 01100001 01101001 01101110 01100101 01100100 ",
            "> 01101001 01101110 00100000 01110001 01110101 01100001 01101110 ",
            "> 01110100 01110101 01101101 00100000 01100011 01101111 01101101 ",
            "> 01110000 01110101 01110100 01101001 01101110 01100111 00101110 ",
            "",
            "> ███████████ ████ ██ ████████ █████ ███████ █████",
            "> ███ ███████ ███",
            "",
            "[END TRANSMISSION]"
        ],
        skills: [
            "<span class='text-cyan-300'>[+] ACTIVE SKILLSET:</span>",
            "",
            ">> <span class='text-green-400'>LANGUAGES:</span>",
            "   - JavaScript/TypeScript [██████████]",
            "   - Python [██████████]",
            "   - C++/Java [██████]",
            "   - Assembly [███]",
            "",
            ">> <span class='text-green-400'>FRONTEND:</span>",
            "   - React/Vue [████████]",
            "   - Three.js/WebGL [██████]",
            "   - WebAssembly [████]",
            "",
            ">> <span class='text-green-400'>BACKEND:</span>",
            "   - Node.js/Deno [█████████]",
            "   - Rust/Go [██████]",
            "",
            ">> <span class='text-green-400'>CYBER:</span>",
            "   - Penetration Testing [████████]",
            "   - Cryptography [███████]",
            "   - Reverse Engineering [█████]",
            "",
            ">> <span class='text-green-400'>OTHER:</span>",
            "   - Machine Learning [██████]",
            "   - Blockchain [█████]",
            "   - Quantum Computing [██]",
            "",
            "<span class='text-gray-400'>// More data available with higher clearance</span>"
        ],
        projects: [
            "<span class='text-cyan-300'>[+] OPERATIONAL HISTORY:</span>",
            "",
            "1. <span class='text-yellow-300'>CYBER_PENTEST_FRAMEWORK</span> [CLASSIFIED]",
            "   - Built with: Python, C++, Assembly",
            "   - Status: <span class='text-green-400'>ACTIVE</span>",
            "   - Clearance required: <span class='text-red-400'>LEVEL 4+</span>",
            "",
            "2. <span class='text-yellow-300'>QUANTUM_ENCRYPTION_PROTOCOL</span> [REDACTED]",
            "   - Built with: Q#, Python, Rust",
            "   - Status: <span class='text-green-400'>ACTIVE</span>",
            "   - Clearance required: <span class='text-red-400'>LEVEL 5+</span>",
            "",
            "3. <span class='text-yellow-300'>NEURAL_INTERFACE</span> [EXPUNGED]",
            "   - Built with: TensorFlow, PyTorch, Cuda",
            "   - Status: <span class='text-yellow-300'>CLASSIFIED</span>",
            "   - Clearance required: <span class='text-red-400'>LEVEL 6+</span>",
            "",
            "<span class='text-gray-400'>// Contact for more information (clearance verification required)</span>"
        ],
        contact: [
            "<span class='text-cyan-300'>[+] SECURE COMMUNICATION CHANNELS:</span>",
            "",
            "> <span class='text-green-400'>ENCRYPTED MESSAGE:</span>",
            "   [Base64]: QmFnZ2FnZWVzIGFyZSBnb29kIHN0dWRlbnRz",
            "   [SHA256]: 32d10c7b8...",
            "",
            "> <span class='text-green-400'>PREFERRED CONTACT:</span>",
            "   - Keybase: <span class='text-cyan-300'>@yourusername</span>",
            "   - SecureDrop: <span class='text-cyan-300'>[REDACTED]</span>",
            "   - PGP: <span class='text-cyan-300'>0xDEADBEEF</span>",
            "",
            "<span class='text-yellow-300'>// Standard channels not recommended for sensitive data</span>",
            "",
            "> <span class='text-green-400'>STANDARD CONTACT:</span>",
            "   - Email: your.email@example.com",
            "   - GitHub: github.com/yourusername",
            "   - LinkedIn: linkedin.com/in/yourprofile",
            "",
            "<span class='text-gray-400'>[END OF LINE]</span>"
        ],
        system: [
            "<span class='text-cyan-300'>[+] SYSTEM DIAGNOSTICS:</span>",
            "",
            "> MEMORY: 78% <span class='text-yellow-300'>████████░░░░</span>",
            "> CPU: 43% <span class='text-green-400'>████░░░░░░░░</span>",
            "> NETWORK: 62% <span class='text-yellow-300'>██████░░░░░░</span>",
            "> ENCRYPTION: AES-256 <span class='text-green-400'>[ACTIVE]</span>",
            "> VPN: TOR Network <span class='text-green-400'>[ACTIVE]</span>",
            "> FIREWALL: STATE: <span class='text-green-400'>SECURE</span>",
            "",
            "> THREATS DETECTED: 0",
            "> INTRUSIONS BLOCKED: 12",
            "> DATA BREACHES: 0",
            "",
            "<span class='text-green-400'>SYSTEM STATUS: NOMINAL</span>"
        ],
        secret: [
            "<span class='text-cyan-300'>[!] UNAUTHORIZED ACCESS DETECTED [!]</span>",
            "",
            "> Initiating countermeasures...",
            "> Trace route activated...",
            "> Sending alert to central...",
            "",
            "<span class='text-red-400'>> WARNING: UNAUTHORIZED ACCESS ATTEMPT LOGGED</span>",
            "",
            "<span class='text-gray-400'>You shouldn't be here...</span>"
        ]
    };
    
    // Help command information
    const helpText = [
        "<span class='text-cyan-300'>[+] AVAILABLE COMMANDS:</span>",
        "",
        "> <span class='text-green-400'>about</span>       - ████████ profile",
        "> <span class='text-green-400'>skills</span>      - Display operative skill set",
        "> <span class='text-green-400'>projects</span>    - Access mission logs",
        "> <span class='text-green-400'>contact</span>     - Open secure communication channels",
        "> <span class='text-green-400'>system</span>      - Run system diagnostics",
        "> <span class='text-green-400'>clear</span>       - Purge terminal history",
        "> <span class='text-green-400'>help</span>        - Show command list",
        "",
        "<span class='text-gray-400'>Type <span class='text-cyan-300'>'sudo'</span> for advanced options (clearance required)</span>"
    ];
    
    // Function to add text to terminal output with optional delay
    function addTerminalLine(text, className = '', delay = 0) {
        setTimeout(() => {
            const line = document.createElement('div');
            if (className) line.className = className;
            line.innerHTML = text;
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, delay);
    }
    
    // Function to simulate loading animation
    function simulateLoading(duration, callback) {
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            const loadingText = document.createElement('div');
            loadingText.className = 'text-yellow-300';
            loadingText.textContent = `Accessing secure database${'.'.repeat(dots)}`;
            
            // Remove previous loading message if it exists
            const prevLoading = terminalOutput.querySelector('.loading-message');
            if (prevLoading) terminalOutput.removeChild(prevLoading);
            
            loadingText.classList.add('loading-message');
            terminalOutput.appendChild(loadingText);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 300);
        
        setTimeout(() => {
            clearInterval(interval);
            // Remove the last loading message
            const loadingElements = document.querySelectorAll('.loading-message');
            loadingElements.forEach(el => terminalOutput.removeChild(el));
            if (callback) callback();
        }, duration);
    }
    
    // Function to simulate hacking animation
    function simulateHacking(callback) {
        const chars = "01█▓▒░/\\|_-+=";
        const originalText = terminalOutput.textContent;
        
        let iterations = 0;
        const interval = setInterval(() => {
            terminalOutput.textContent = terminalOutput.textContent.split('')
                .map((char, index) => {
                    if (index < iterations || char === '\n') return char;
                    if (Math.random() < 0.1) return chars.charAt(Math.floor(Math.random() * chars.length));
                    return char;
                }).join('');
            
            iterations += 3;
            
            if (iterations > originalText.length * 1.5) {
                clearInterval(interval);
                terminalOutput.textContent = originalText;
                if (callback) callback();
            }
        }, 50);
    }
    
    // Function to process commands
    function processCommand(command) {
        if (!command.trim()) return;
        
        addTerminalLine(command, 'command text-gray-300');
        
        const cmd = command.trim().toLowerCase();
        
        if (cmd === 'help') {
            helpText.forEach(line => addTerminalLine(line));
        } 
        else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        }
        else if (cmd === 'about' || cmd === 'skills' || cmd === 'projects' || cmd === 'contact' || cmd === 'system') {
            // Simulate secure database access
            simulateLoading(1500, () => {
                portfolioData[cmd].forEach(line => addTerminalLine(line));
            });
        }
        else if (cmd === 'sudo') {
            simulateHacking(() => {
                addTerminalLine("<span class='text-red-400'>[!] UNAUTHORIZED: Insufficient clearance level detected</span>");
                addTerminalLine("<span class='text-red-400'>[!] This incident has been reported</span>");
            });
        }
        else if (cmd === 'secret') {
            addTerminalLine("<span class='text-red-400'>Initiating security protocol...</span>", '', 0);
            simulateHacking(() => {
                portfolioData.secret.forEach(line => addTerminalLine(line));
                setTimeout(() => {
                    terminalOutput.innerHTML = '';
                    addTerminalLine("<span class='text-green-400'>System rebooted. Credentials cleared.</span>");
                    addTerminalLine("<span class='text-cyan-300'>Enter 'help' for available commands</span>");
                }, 3000);
            });
        }
        else if (cmd === 'login') {
            if (!accessGranted) {
                simulatePasswordPrompt();
            } else {
                addTerminalLine("<span class='text-yellow-300'>Already authenticated as root</span>");
            }
        }
        else {
            addTerminalLine(`<span class='text-red-400'>Command not recognized: ${cmd}</span>. Type 'help' for available commands.`);
        }
    }
    
    // Simulate password prompt
    function simulatePasswordPrompt() {
        terminalInput.type = "password";
        terminalInput.className += " password-input";
        terminalInput.placeholder = "[password required]";
        
        const checkPassword = (e) => {
            if (e.key === 'Enter') {
                terminalInput.type = "text";
                terminalInput.classList.remove("password-input");
                terminalInput.placeholder = "";
                
                simulateLoading(2000, () => {
                    if (authAttempts > 2) {
                        addTerminalLine("<span class='text-red-400'>[!] TOO MANY ATTEMPTS. LOCKDOWN INITIATED.</span>");
                        portfolioData.secret.forEach(line => addTerminalLine(line));
                        setTimeout(() => {
                            terminalOutput.innerHTML = '';
                            addTerminalLine("<span class='text-yellow-300'>System locked. Refresh to try again.</span>");
                            terminalInput.disabled = true;
                        }, 3000);
                    } else {
                        authAttempts++;
                        addTerminalLine("<span class='text-red-400'>[!] AUTHENTICATION FAILED</span>");
                        addTerminalLine("<span class='text-yellow-300'>Hint: Try 'cyberninja'</span>");
                        terminalInput.value = '';
                        terminalInput.removeEventListener('keydown', checkPassword);
                        terminalInput.addEventListener('keydown', handleInput);
                    }
                });
            }
        };
        
        terminalInput.removeEventListener('keydown', handleInput);
        terminalInput.addEventListener('keydown', checkPassword);
        terminalInput.focus();
    }
    
    // Handle normal input
    function handleInput(e) {
        if (e.key === 'Enter') {
            processCommand(terminalInput.value);
            terminalInput.value = '';
            e.preventDefault();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const cmd = terminalInput.value.trim().toLowerCase();
            const availableCommands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'system', 'sudo', 'login'];
            
            const matches = availableCommands.filter(c => c.startsWith(cmd));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                addTerminalLine("<span class='text-cyan-300'>Possible commands:</span> " + matches.join(', '));
            }
        }
    }
    
    // Initialize
    terminalInput.addEventListener('keydown', handleInput);
    createMatrixRain();
    updateDateTime();
    
    // Initial system boot message
    setTimeout(() => {
        addTerminalLine(" ", 'text-gray-400');
        helpText.forEach(line => addTerminalLine(line));
    }, 800);
    
    // Focus input on page load
    terminalInput.focus();
    
    // Easter egg - cursor over password prompt
    terminalInput.addEventListener('mouseover', () => {
        if (!accessGranted && Math.random() > 0.7) {
            const tip = document.createElement('div');
            tip.className = 'text-xs text-gray-400';
            tip.textContent = "Hint: The password is 'cyberninja'";
            terminalOutput.appendChild(tip);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
});
