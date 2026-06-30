const nav = document.querySelector("header")

window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled")
    } else {
        nav.classList.remove("nav-scrolled")
    }
})

const secaoNumeros = document.querySelector("#numeros")

if (secaoNumeros) {
    const contadores = document.querySelectorAll(".contador")
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                contadores.forEach(function(contador) {
                    const valorFinal = parseInt(contador.getAttribute("data-valor"))

                    if (isNaN(valorFinal)) {
                        return
                    }

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

const form = document.querySelector("#form-contato")
const inputNome = document.querySelector("#nome")
const erroNome = inputNome.nextElementSibling
const inputEmail = document.querySelector("#email")
const erroEmail = inputEmail.nextElementSibling
const inputTelefone = document.querySelector("#telefone")
const erroTelefone = inputTelefone.nextElementSibling
const inputMensagem = document.querySelector("#mensagem")
const erroMensagem = inputMensagem.nextElementSibling

form.addEventListener("submit", function(event) {
    event.preventDefault()
    let valido = true
        if (inputNome.value.trim() === "") {
            erroNome.textContent = "Por favor, preencha seu nome."
            valido = false
        } else {
        erroNome.textContent = ""
        }

        if (inputEmail.value.trim() === "") {
            erroEmail.textContent = "Por favor, preencha seu e-mail." 
            valido = false
        } else if (!inputEmail.value.includes("@")) {
            erroEmail.textContent = "Por favor, insira um e-mail válido."
            valido = false
        } else {
            erroEmail.textContent = ""
        }

        if (inputTelefone.value.trim() === "") {
            erroTelefone.textContent = "Por favor, preencha seu telefone."
            valido = false
        } else {
            erroTelefone.textContent = ""
        }

        if (inputMensagem.value.trim() === "") {
            erroMensagem.textContent = "Por favor, escreva sua mensagem."
            valido = false
        } else {
            erroMensagem.textContent = ""
        }

        if (valido) {
            document.querySelector("#mensagem-sucesso").style.display = "block"
            form.reset()
        }
})

const btnHamburguer = document.querySelector("#menu-hamburguer")
const navMenu = document.querySelector("header nav")

btnHamburguer.addEventListener("click", function() {
    navMenu.classList.toggle("nav-aberto")

    document.addEventListener("click", function(event) {
    if (!navMenu.contains(event.target) && !btnHamburguer.contains(event.target)) {
        navMenu.classList.remove("nav-aberto")
    }
})
})