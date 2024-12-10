//Config.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'config_claro.css';
        } else {
            themeStylesheet.href = 'config.css';
        }
    }
});

//Cadastro.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'cadastro_claro.css';
        } else {
            themeStylesheet.href = 'config.css';
        }
    }
});

//Login.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'login_claro.css';
        } else {
            themeStylesheet.href = 'login.css';
        }
    }
});

//Detail.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'style_claro.css';
        } else {
            themeStylesheet.href = 'style.css';
        }
    }
});

//forum.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'style_claro.css';
        } else {
            themeStylesheet.href = 'style.css';
        }
    }
});

//Posts.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'style_claro.css';
        } else {
            themeStylesheet.href = 'style.css';
        }
    }
});

//Histórias.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'historias_claro.css';
        } else {
            themeStylesheet.href = 'historias.css';
        }
    }
});

//Home.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'home_claro.css';
        } else {
            themeStylesheet.href = 'home.css';
        }
    }
});

//postdehistoria.ejs

document.addEventListener("DOMContentLoaded", () => {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeSelector = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selectedTheme');

    // Se houver um tema salvo, aplica-o ao carregar a página
    if (savedTheme) {
        switchTheme(savedTheme);
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        switchTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
    });

    function switchTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.href = 'historia_claro.css';
        } else {
            themeStylesheet.href = 'historia.css';
        }
    }
});