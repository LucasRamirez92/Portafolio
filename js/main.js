document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // ANIMACIÓN DE BARRAS Y PORCENTAJES DINÁMICOS
    // ==========================================
    const rows = document.querySelectorAll(".performance-row");

    // Función que incrementa el número de forma fluida de 0 al target%
    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute("data-target"), 10);
        let current = 0;
        
        // Ajustamos el incremento por frame para que dure aprox 1.2s (60 frames por segundo)
        const increment = target / 72; 
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.innerText = `${Math.ceil(current)}%`;
                requestAnimationFrame(updateCount); // Sincroniza la animación con los FPS de la pantalla
            } else {
                element.innerText = `${target}%`;
            }
        };
        
        updateCount();
    };

    // Intersection Observer para disparar efectos solo al hacer scroll visible
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const row = entry.target;
                
                // 1. Añade la clase que expande la barra en CSS
                row.classList.add("active");
                
                // 2. Ejecuta la animación del número acumulativo
                const metricText = row.querySelector(".tech-metric");
                if (metricText) {
                    animateNumber(metricText);
                }
                
                // Deja de observar la fila para que no se repita la animación innecesariamente
                observer.unobserve(row);
            }
        });
    }, {
        threshold: 0.15 // Se dispara cuando el 15% del contenedor asoma en la pantalla
    });

    // Registramos todas las filas de tecnologías en el observador
    rows.forEach(row => skillsObserver.observe(row));


    // ==========================================
    // TOGGLE MODO CLARO / MODO OSCURO (Opcional)
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            
            if (document.body.classList.contains("light-mode")) {
                themeToggle.innerText = "Dark";
            } else {
                themeToggle.innerText = "Light";
            }
        });
    }
});