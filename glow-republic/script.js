const nav = document.querySelector("nav")

window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled")
    } else {
        nav.classList.remove("nav-scrolled")
    }
})

const button = document.querySelector(".menu-toggle")
const menuLista = document.querySelector("nav ul")

button.addEventListener("click", function() {
    menuLista.classList.toggle("menu-aberto")
})

const botoes = document.querySelectorAll(".btn-modal")

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const alvo = botao.dataset.modal
        const modal = document.querySelector("#" + alvo)
        modal.classList.add("ativo")
    })
})

const botoesFechar = document.querySelectorAll(".fechar-modal")

botoesFechar.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const modal = botao.closest(".modal")
        modal.classList.remove("ativo")
    })
})

const modais = document.querySelectorAll(".modal")

modais.forEach(function(modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("ativo")
        }
    })
})

const botoesFiltro = document.querySelectorAll(".filtros button")
const cardsFiltro = document.querySelectorAll(".card-produto")

botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const filtro = botao.dataset.filtro

        botoesFiltro.forEach(function(b) {
            b.classList.remove("ativo")
        })

        botao.classList.add("ativo")

        cardsFiltro.forEach(function(card) {
            if (filtro === "todos" || card.dataset.categoria === filtro) {
                card.classList.remove("escondido")
            } else { 
                card.classList.add("escondido")
            }
        })
    })
})

const formulario = document.querySelector("#form-contato")

if (formulario) {
    const nome = document.querySelector("#nome")
    const email = document.querySelector("#email")
    const assunto = document.querySelector("#assunto")
    const mensagem = document.querySelector("#mensagem")
    const sucesso = document.querySelector("#mensagem-sucesso")
    const erros = document.querySelectorAll(".erro")

    formulario.addEventListener("submit", function(event) {
        event.preventDefault()

        let valido = true

        if (nome.value.trim().includes(" ")) {
            erros[0].textContent = ""
        } else {
            erros[0].textContent = "Digite seu nome completo"
            valido = false
        }

        const valorEmail = email.value.trim()
        const posicaoArroba = valorEmail.indexOf("@")

        if (valorEmail.includes("@") && valorEmail.indexOf(".", posicaoArroba) > posicaoArroba) {
            erros[1].textContent = ""
        } else {
            erros[1].textContent = "Digite um e-mail válido"
            valido = false
        }

        if (assunto.value !== "") {
            erros[2].textContent = ""
        } else {
            erros[2].textContent = "Selecione um assunto"
            valido = false
        }

        if (mensagem.value.trim().length >= 20) {
            erros[3].textContent = ""
        } else {
            erros[3].textContent = "A mensagem deve ter pelo menos 20 caracteres"
            valido = false
        }

        if (valido) {
            formulario.style.display = "none"
            sucesso.style.display = "block"
        }
    })
}

const secaoNumeros = document.querySelector("#numeros")

if (secaoNumeros) {
    const contadores = document.querySelectorAll(".contador")
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                contadores.forEach(function(contador) {
                    const valorFinal = parseInt(contador.textContent)
                    let valorAtual = 0

                    const intervalo = setInterval(function() {
                        valorAtual++
                        contador.textContent = valorAtual

                        if (valorAtual >= valorFinal) {
                            clearInterval(intervalo)
                            contador.textContent = contador.getAttribute("data-valor")
                        }
                    }, 30)
                })

                observer.unobserve(entry.target)
            }
        })
    })

    observer.observe(secaoNumeros)
}

const btnNewsletter = document.querySelector(".newsletter-form button")
const emailNews = document.querySelector("#email-newsletter")
const feedback = document.querySelector("#newsletter-feedback")

if (btnNewsletter) {
    btnNewsletter.addEventListener("click", function() {
        const valorEmail = emailNews.value.trim()
        const posicaoArroba = valorEmail.indexOf("@")

        if (valorEmail.includes("@") && valorEmail.indexOf(".", posicaoArroba) > posicaoArroba) {
            feedback.textContent = "Inscrição realizada! 💛"
            feedback.style.color = "var(--roxo)"
        } else {
            feedback.textContent = "Digite um e-mail válido"
            feedback.style.color = "red"
        }
    })
}

        