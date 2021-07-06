/* Abre e fecha o menu quando clicar no icone: hamburguer e X*/
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')


for (const element of toggle) {
    element.addEventListener('click', () => {
        nav.classList.toggle('show')
    })
}

/* Fechar menu quando clicar nos itens de menu */
const navItems = document.querySelectorAll('nav ul li a')

for (const element of navItems) {
    element.addEventListener('click', () => {
        nav.classList.remove('show')
    })
}

/* Adicionar sombra ao header quando rolar a pagina com o movimento de scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight
function changeHeaderWhenScroll() {

    if (window.scrollY >= navHeight) {
        // scroll é maior que a altura do header
        header.classList.add('scroll')
    } else {
        // scroll é menor que a altura do header 
        header.classList.remove('scroll')
    }
}

/* Testimonials slider com Swiper */
const swiper = new Swiper('.swiper-container', {
    slidesPreview: 1,
    pagination: {
        el: '.swiper-pagination'
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        767: {
            slidesPerView: 2,
            setWrapperSize: true
        }
    }
});

/* ScrollReveal revelar o conteúdo da página a medida que vai rolando para baixo o scroll */
const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: true
})
scrollReveal.reveal(`
#home .image, #home .text,
#about .image, #about .text,
#services header, #services .card,
#testimonials header, #testimonials .testimonials,
#contact .text, #contact .links,
footer .brand, footer .social
`, { interval: 150 })

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')
function showBackToTopButtonWhenScroll() {

    if (window.scrollY >= 600) {
        backToTopButton.classList.add('show')
    } else {
        backToTopButton.classList.remove('show')
    }
}

/* Menu ativo conforme a seção vísivel na página */
const sections = document.querySelectorAll('main section[id]')

function activateMenuAtCurrentSection() {
    // posição do scroll
    const scrollPosition = window.pageYOffset

    // altura total disponível da janela
    const windowHight = window.innerHeight

    // criar um alinha imaginária (breackpoint) dividindo a tela em 8 partes e 
    // pegando 4 partes somando a posição atual do scroll
    const breakpoint = scrollPosition + (windowHight / 8) * 4

    for (const section of sections) {
        // valor scroll do topo da section, posição do topo da seção em relação a página inteira
        const sectionTopPosition = section.offsetTop

        // altura da section
        const sectionHeight = section.offsetHeight

        // id da section
        const sectionId = section.getAttribute('id')

        // limites onde ficara marcado o inicio e o fim da area delimitada
        // para as sections ativarem o menu
        const limiteStart = breakpoint >= sectionTopPosition
        const limiteEnd = breakpoint <= sectionTopPosition + sectionHeight

        // se estiver entre limiteStart e limiteEnd
        if (limiteStart && limiteEnd) {
            //seleciona o elemento a que tenha no atributo href o id da section
            document
                .querySelector('nav ul li a[href*=' + sectionId + ']')
                .classList.add('active')
        } else {
            document
                .querySelector('nav ul li a[href*=' + sectionId + ']')
                .classList.remove('active')
        }
    }
}

/* Adicionando evento de scroll a janela */
window.addEventListener('scroll', () => {
    changeHeaderWhenScroll()
    showBackToTopButtonWhenScroll()
    activateMenuAtCurrentSection()
})

