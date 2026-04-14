// --- DADOS DINÂMICOS ---
const protagonists = [
    { nome: "Franklin", desc: "O jovem ambicioso." },
    { nome: "Michael", desc: "O profissional aposentado." },
    { nome: "Trevor", desc: "O elemento imprevisível." }
];

const faqs = [
    { q: "Onde o jogo se passa?", a: "Na cidade fictícia de Los Santos e arredores." },
    { q: "Existem expansões?", a: "Sim, o GTA Online recebe atualizações constantes." }
];

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    renderCharacters();
    renderFAQ();
    initScrollReveal();
});

// --- RENDERIZADORES ---
function renderCharacters() {
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = protagonists.map(p => `
        <article class="card" role="listitem">
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
        </article>
    `).join('');
}

function renderFAQ() {
    const container = document.getElementById('faq-container');
    container.innerHTML = faqs.map((f, i) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                ${f.q}
            </button>
            <div class="accordion-content" style="display:none; padding:1rem;">
                <p>${f.a}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE ---
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize = action === 'up' ? currentFontSize + 2 : currentFontSize - 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    content.style.display = isExpanded ? 'none' : 'block';
}

// --- CARROSSEL ---
let currentSlide = 0;
const track = document.getElementById('carousel-track');
// Adiciona slides dinâmicos para exemplo
for(let i=1; i<=3; i++) {
    track.innerHTML += `<div class="slide">Cena de Ação ${i}</div>`;
}

document.querySelector('.next').onclick = () => {
    currentSlide = (currentSlide + 1) % 3;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
};

document.querySelector('.prev').onclick = () => {
    currentSlide = (currentSlide - 1 + 3) % 3;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
};

// --- ANIMAÇÕES (Scroll Reveal) ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));
}
