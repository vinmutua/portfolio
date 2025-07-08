
// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        setTimeout(function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }
        }, 1000);
    });

    // Initialize Vanta.js background if available
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-background",
            color: 0x3b82f6,
            backgroundColor: 0xf1f5f9,
            points: 10,
            maxDistance: 22,
            spacing: 16,
            showDots: false
        });
    }

    // Dark mode toggle functionality
    const toggle = document.getElementById('toggle');
    const toggleMobile = document.getElementById('toggle-mobile');
    const body = document.body;
            
    // Check for saved user preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark');
        if (toggle) toggle.checked = true;
        if (toggleMobile) toggleMobile.checked = true;
        
        // Update Vanta.js background for dark mode
        if (typeof VANTA !== 'undefined') {
            VANTA.NET({
                el: "#vanta-background",
                color: 0x3b82f6,
                backgroundColor: 0x0f172a,
                points: 10,
                maxDistance: 22,
                spacing: 16,
                showDots: false
            });
        }
    }
            
    // Desktop toggle
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark');
                localStorage.setItem('dark-mode', 'enabled');
                if (toggleMobile) toggleMobile.checked = true;
                
                if (typeof VANTA !== 'undefined') {
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0x0f172a,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                }
            } else {
                body.classList.remove('dark');
                localStorage.setItem('dark-mode', 'disabled');
                if (toggleMobile) toggleMobile.checked = false;
                
                if (typeof VANTA !== 'undefined') {
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0xf1f5f9,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                }
            }
        });
    }
            
    // Mobile toggle
    if (toggleMobile) {
        toggleMobile.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark');
                localStorage.setItem('dark-mode', 'enabled');
                if (toggle) toggle.checked = true;
                
                if (typeof VANTA !== 'undefined') {
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0x0f172a,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                }
            } else {
                body.classList.remove('dark');
                localStorage.setItem('dark-mode', 'disabled');
                if (toggle) toggle.checked = false;
                
                if (typeof VANTA !== 'undefined') {
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0xf1f5f9,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                }
            }
        });
    }
            
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
            
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }
            
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    }
            
    // Close menu when clicking on links
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
            
    // Create floating particles
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        const particleCount = window.innerWidth < 768 ? 15 : 30;
                    
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('absolute', 'rounded-full', 'bg-blue-300', 'dark:bg-blue-600/30');
                            
            // Random size
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
                            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
                            
            // Random animation
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
                            
            particlesContainer.appendChild(particle);
        }
    }
            
    // Animate skill bars on scroll
    window.addEventListener('scroll', function() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.getElementById('skills');
        
        if (skillsSection) {
            const sectionPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
                    
            if (sectionPosition < screenPosition) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
                            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
                            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3D Character Animation
    const container = document.getElementById('character-container');
    const canvas = document.getElementById('character-canvas');
                    
    if (canvas && container && typeof THREE !== 'undefined') {
        // Set canvas size
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
                        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, 
             canvas.width / canvas.height, 
             0.1, 
             1000
        );
        camera.position.z = 5;
                        
        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(canvas.width, canvas.height);
                        
        // Simple character geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ 
             color: 0x3b82f6,
            wireframe: true 
         });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
                        
        // Add floating AI elements
        const aiElements = [];
        const aiGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const aiMaterial = new THREE.MeshBasicMaterial({ 
             color: 0x10b981 
         });
                        
        for (let i = 0; i < 5; i++) {
            const aiElement = new THREE.Mesh(aiGeometry, aiMaterial);
            aiElement.position.x = (Math.random() - 0.5) * 2;
            aiElement.position.y = (Math.random() - 0.5) * 2;
            aiElement.position.z = (Math.random() - 0.5) * 2;
            scene.add(aiElement);
            aiElements.push(aiElement);
        }
                        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
                            
            // Rotate character
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
                            
            // Animate AI elements
            aiElements.forEach((element, index) => {
                element.position.x = Math.sin(Date.now() * 0.001 + index) * 1.5;
                element.position.y = Math.cos(Date.now() * 0.001 + index * 2) * 1.5;
                element.position.z = Math.sin(Date.now() * 0.001 + index * 0.5) * 1.5;
            });
                            
            renderer.render(scene, camera);
        }
                        
        animate();
                        
        // Cursor interaction
        container.addEventListener('mousemove', (event) => {
            const rect = container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
            const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
                            
            cube.rotation.y = x * 0.5;
            cube.rotation.x = y * 0.5;
                            
            if (aiElements[0]) {
                aiElements[0].position.x = x * 2;
                aiElements[0].position.y = y * 2;
            }
        });
                        
        // Hover effect
        container.addEventListener('mouseenter', () => {
            cube.material.color.setHex(0x10b981);
            cube.scale.set(1.1, 1.1, 1.1);
        });
                        
        container.addEventListener('mouseleave', () => {
            cube.material.color.setHex(0x3b82f6);
            cube.scale.set(1, 1, 1);
        });
    }

    // Terminal functionality
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    
    if (terminalOutput && terminalInput) {
        // Set current date and time
        const now = new Date();
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            timeZoneName: 'short' 
        };
        const currentDateTimeElement = document.getElementById('currentDateTime');
        if (currentDateTimeElement) {
            currentDateTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
        
        // Portfolio data for terminal commands
        const portfolioData = {
            about: [
                "Name: Musyoki Mutua",
                "Title: Software Engineer",
                "Specialization: AI for Healthcare",
                "Location: Nairobi, Kenya",
                "",
                "Professional Summary:",
                "Innovative Software Engineer specializing in AI product",
                "development and machine learning. Successfully built AI-powered",
                "products, fine-tuned LLMs for medical applications, and",
                "implemented RAG pipelines for healthcare."
            ],
            skills: [
                "Core Competencies:",
                "- Python (Expert)",
                "- Machine Learning",
                "- AI Product Development",
                "- Natural Language Processing",
                "",
                "Technologies:",
                "- TensorFlow, PyTorch",
                "- AWS, Docker",
                "- SQL, Cypher QL",
                "- LLMs, Transformer Models"
            ],
            projects: [
                "1. AI-Powered Healthcare SaaS",
                "   - Built AI system for hospitals",
                "   - Tech: LLMs, RAG, Python",
                "",
                "2. Brain Tumor Segmentation",
                "   - UNet architecture implementation",
                "   - Tech: TensorFlow, Medical Imaging",
                "",
                "3. NLP to SQL Conversion",
                "   - Natural language to database queries",
                "   - Tech: NLU, LLMs, Graph DBs"
            ],
            contact: [
                "Email: mutua.musyoki@example.com",
                "Phone: +254 700 000000",
                "GitHub: github.com/musyokimutua",
                "LinkedIn: linkedin.com/in/musyokimutua",
                "",
                "Available for:",
                "- Full-time positions",
                "- Consulting projects",
                "- Research collaborations"
            ]
        };
        
        // Help command information
        const helpText = [
            "Available commands:",
            "-------------------",
            "about       - Display information about me",
            "skills      - Show my technical skills and expertise",
            "projects    - List some of my notable projects",
            "contact     - Get in touch with me",
            "clear       - Clear the terminal screen",
            "help        - Show this help message"
        ];
        
        // Function to add text to terminal output
        function addTerminalLine(text, className = '') {
            const line = document.createElement('div');
            if (className) line.className = className;
            line.textContent = text;
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
        
        // Function to process commands
        function processCommand(command) {
            addTerminalLine(command, 'command text-gray-300');
            
            const cmd = command.trim().toLowerCase();
            
            if (cmd === 'help') {
                helpText.forEach(line => addTerminalLine(line));
            } 
            else if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
                // Re-add the initial messages
                addTerminalLine('Welcome to my interactive terminal!', 'text-indigo-400');
                addTerminalLine('Type \'help\' to see available commands.', '');
                addTerminalLine('----------------------------------------------------------------------', 'text-gray-400 text-xs');
                const currentDateTimeElement = document.getElementById('currentDateTime');
                if (currentDateTimeElement) {
                    addTerminalLine(`Last login: ${currentDateTimeElement.textContent} from 127.0.0.1`, 'text-green-400');
                }
            }
            else if (cmd === 'about' || cmd === 'skills' || cmd === 'projects' || cmd === 'contact') {
                portfolioData[cmd].forEach(line => addTerminalLine(line));
            }
            else if (cmd) {
                addTerminalLine(`Command not found: ${cmd}. Type 'help' to see available commands.`, 'text-red-400');
            }
        }
        
        // Handle input
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                processCommand(terminalInput.value);
                terminalInput.value = '';
                e.preventDefault();
            }
        });
        
        // Focus input on page load
        terminalInput.focus();
    }

    // Responsive adjustments on resize
    window.addEventListener('resize', function() {
        const container = document.getElementById('character-container');
        const canvas = document.getElementById('character-canvas');
        if (canvas && container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
    });
});

        // Interactive Background
        VANTA.NET({
            el: "#vanta-background",
            color: 0x3b82f6,
            backgroundColor: 0xf1f5f9,
            points: 10,
            maxDistance: 22,
            spacing: 16,
            showDots: false
        });

        // Dark mode toggle functionality
        const toggle = document.getElementById('toggle');
        const toggleMobile = document.getElementById('toggle-mobile');
        const body = document.body;
                
        // Check for saved user preference, if any
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark');
            toggle.checked = true;
            if (toggleMobile) toggleMobile.checked = true;
            // Change Vanta.js background for dark mode
            VANTA.NET({
                el: "#vanta-background",
                color: 0x3b82f6,
                backgroundColor: 0x0f172a,
                points: 10,
                maxDistance: 22,
                spacing: 16,
                showDots: false
            });
        }
                
        // Desktop toggle
        toggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark');
                localStorage.setItem('dark-mode', 'enabled');
                if (toggleMobile) toggleMobile.checked = true;
                // Change Vanta.js background for dark mode
                VANTA.NET({
                    el: "#vanta-background",
                    color: 0x3b82f6,
                    backgroundColor: 0x0f172a,
                    points: 10,
                    maxDistance: 22,
                    spacing: 16,
                    showDots: false
                });
            } else {
                body.classList.remove('dark');
                localStorage.setItem('dark-mode', 'disabled');
                if (toggleMobile) toggleMobile.checked = false;
                // Change Vanta.js background for light mode
                VANTA.NET({
                    el: "#vanta-background",
                    color: 0x3b82f6,
                    backgroundColor: 0xf1f5f9,
                    points: 10,
                    maxDistance: 22,
                    spacing: 16,
                    showDots: false
                });
            }
        });
                
        // Mobile toggle
        if (toggleMobile) {
            toggleMobile.addEventListener('change', function() {
                if (this.checked) {
                    body.classList.add('dark');
                    localStorage.setItem('dark-mode', 'enabled');
                    toggle.checked = true;
                    // Change Vanta.js background for dark mode
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0x0f172a,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                } else {
                    body.classList.remove('dark');
                    localStorage.setItem('dark-mode', 'disabled');
                    toggle.checked = false;
                    // Change Vanta.js background for light mode
                    VANTA.NET({
                        el: "#vanta-background",
                        color: 0x3b82f6,
                        backgroundColor: 0xf1f5f9,
                        points: 10,
                        maxDistance: 22,
                        spacing: 16,
                        showDots: false
                    });
                }
            });
        }
                
        // Mobile menu functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');
                
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
                
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
                
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
                
        // Create floating particles
        document.addEventListener('DOMContentLoaded', function() {
            const particlesContainer = document.querySelector('.particles');
            const particleCount = window.innerWidth < 768 ? 15 : 30;
                        
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('absolute', 'rounded-full', 'bg-blue-300', 'dark:bg-blue-600/30');
                                
                // Random size
                const size = Math.random() * 6 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                                
                // Random animation
                const duration = Math.random() * 20 + 10;
                particle.style.animation = `float ${duration}s ease-in-out infinite`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                                
                particlesContainer.appendChild(particle);
            }
        });
                
        // Animate skill bars on scroll
        window.addEventListener('scroll', function() {
            const skillBars = document.querySelectorAll('.skill-progress');
            const skillsSection = document.getElementById('skills');
            const sectionPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
                        
            if (sectionPosition < screenPosition) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 3D Character Animation
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('character-container');
            const canvas = document.getElementById('character-canvas');
                        
            // Create a simple 3D character (simplified for this example)
            // In a real implementation, you would use a 3D model loader like GLTFLoader
            // and a pre-made 3D model of a data scientist
                        
            if (canvas && typeof THREE !== 'undefined') {
                // Set canvas size
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                                
                // Scene setup
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(
                    75, 
                     canvas.width / canvas.height, 
                     0.1, 
                     1000
                );
                camera.position.z = 5;
                                
                // Renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    alpha: true,
                    antialias: true
                });
                renderer.setClearColor(0x000000, 0);
                renderer.setSize(canvas.width, canvas.height);
                                
                // Simple character geometry (could be replaced with a proper 3D model)
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ 
                     color: 0x3b82f6,
                    wireframe: true 
                 });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
                                
                // Add some floating AI elements around the character
                const aiElements = [];
                const aiGeometry = new THREE.SphereGeometry(0.1, 16, 16);
                const aiMaterial = new THREE.MeshBasicMaterial({ 
                     color: 0x10b981 
                 });
                                
                for (let i = 0; i < 5; i++) {
                    const aiElement = new THREE.Mesh(aiGeometry, aiMaterial);
                    aiElement.position.x = (Math.random() - 0.5) * 2;
                    aiElement.position.y = (Math.random() - 0.5) * 2;
                    aiElement.position.z = (Math.random() - 0.5) * 2;
                    scene.add(aiElement);
                    aiElements.push(aiElement);
                }
                                
                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                                    
                    // Rotate character
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                                    
                    // Animate AI elements
                    aiElements.forEach((element, index) => {
                        element.position.x = Math.sin(Date.now() * 0.001 + index) * 1.5;
                        element.position.y = Math.cos(Date.now() * 0.001 + index * 2) * 1.5;
                        element.position.z = Math.sin(Date.now() * 0.001 + index * 0.5) * 1.5;
                    });
                                    
                    renderer.render(scene, camera);
                }
                                
                animate();
                                
                // Cursor interaction
                container.addEventListener('mousemove', (event) => {
                    const rect = container.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
                    const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
                                    
                    // Rotate character based on cursor position
                    cube.rotation.y = x * 0.5;
                    cube.rotation.x = y * 0.5;
                                    
                    // Make AI elements follow cursor
                    aiElements[0].position.x = x * 2;
                    aiElements[0].position.y = y * 2;
                });
                                
                // Hover effect
                container.addEventListener('mouseenter', () => {
                    cube.material.color.setHex(0x10b981);
                    cube.scale.set(1.1, 1.1, 1.1);
                });
                                
                container.addEventListener('mouseleave', () => {
                    cube.material.color.setHex(0x3b82f6);
                    cube.scale.set(1, 1, 1);
                });
            }
        });

        // Terminal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const terminalOutput = document.getElementById('terminalOutput');
            const terminalInput = document.getElementById('terminalInput');
            
            // Set current date and time
            const now = new Date();
            const options = { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZoneName: 'short' 
            };
            document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
            
            // Portfolio data for terminal commands
            const portfolioData = {
                about: [
                    "Name: Musyoki Mutua",
                    "Title: Software  Engineer",
                    "Specialization: AI for Healthcare",
                    "Location: Nairobi, Kenya",
                    "",
                    "Professional Summary:",
                    "Innovative Software  Engineer specializing in AI product",
                    "development and machine learning. Successfully built AI-powered",
                    "products, fine-tuned LLMs for medical applications, and",
                    "implemented RAG pipelines for healthcare."
                ],
                skills: [
                    "Core Competencies:",
                    "- Python (Expert)",
                    "- Machine Learning",
                    "- AI Product Development",
                    "- Natural Language Processing",
                    "",
                    "Technologies:",
                    "- TensorFlow, PyTorch",
                    "- AWS, Docker",
                    "- SQL, Cypher QL",
                    "- LLMs, Transformer Models"
                ],
                projects: [
                    "1. AI-Powered Healthcare SaaS",
                    "   - Built AI system for hospitals",
                    "   - Tech: LLMs, RAG, Python",
                    "",
                    "2. Brain Tumor Segmentation",
                    "   - UNet architecture implementation",
                    "   - Tech: TensorFlow, Medical Imaging",
                    "",
                    "3. NLP to SQL Conversion",
                    "   - Natural language to database queries",
                    "   - Tech: NLU, LLMs, Graph DBs"
                ],
                contact: [
                    "Email: mutua.musyoki@example.com",
                    "Phone: +254 700 000000",
                    "GitHub: github.com/musyokimutua",
                    "LinkedIn: linkedin.com/in/musyokimutua",
                    "",
                    "Available for:",
                    "- Full-time positions",
                    "- Consulting projects",
                    "- Research collaborations"
                ]
            };
            
            // Help command information
            const helpText = [
                "Available commands:",
                "-------------------",
                "about       - Display information about me",
                "skills      - Show my technical skills and expertise",
                "projects    - List some of my notable projects",
                "contact     - Get in touch with me",
                "clear       - Clear the terminal screen",
                "help        - Show this help message"
            ];
            
            // Function to add text to terminal output
            function addTerminalLine(text, className = '') {
                const line = document.createElement('div');
                if (className) line.className = className;
                line.textContent = text;
                terminalOutput.appendChild(line);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
            
            // Function to process commands
            function processCommand(command) {
                addTerminalLine(command, 'command text-gray-300');
                
                const cmd = command.trim().toLowerCase();
                
                if (cmd === 'help') {
                    helpText.forEach(line => addTerminalLine(line));
                } 
                else if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    // Re-add the initial messages
                    addTerminalLine('Welcome to my interactive terminal!', 'text-indigo-400');
                    addTerminalLine('Type \'help\' to see available commands.', '');
                    addTerminalLine('----------------------------------------------------------------------', 'text-gray-400 text-xs');
                    addTerminalLine(`Last login: ${document.getElementById('currentDateTime').textContent} from 127.0.0.1`, 'text-green-400');
                }
                else if (cmd === 'about' || cmd === 'skills' || cmd === 'projects' || cmd === 'contact') {
                    portfolioData[cmd].forEach(line => addTerminalLine(line));
                }
                else if (cmd) {
                    addTerminalLine(`Command not found: ${cmd}. Type 'help' to see available commands.`, 'text-red-400');
                }
            }
            
            // Handle input
            terminalInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    processCommand(terminalInput.value);
                    terminalInput.value = '';
                    e.preventDefault();
                }
            });
            
            // Focus input on page load
            terminalInput.focus();
        });

        // Responsive adjustments on resize
        window.addEventListener('resize', function() {
            // Update character canvas size
            const container = document.getElementById('character-container');
            const canvas = document.getElementById('character-canvas');
            if (canvas && container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        });
    