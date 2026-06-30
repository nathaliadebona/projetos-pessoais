const dataHoje = document.getElementById('data-hoje'); 
dataHoje.textContent = new Date().toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'});

const formulario = document.getElementById('form-tarefas'); // o forumário
const input = document.getElementById('tarefa'); // o input de nova tarefa
const lista = document.getElementById('lista-tarefas'); // a <ul> onde ficam as tarefas
const conclusao = document.getElementById('tarefas-conclusao'); // span do contador no footer
const limpar = document.getElementById('limpar-concluidas'); // exclui as tarefas concluídas

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const textoTarefa = input.value.trim();

    if (textoTarefa === '') {
        return;      
    }

    const novaTarefa = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const spanTexto = document.createElement('span');
    spanTexto.textContent = textoTarefa;
    const botaoLista = document.createElement('button');
    botaoLista.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    novaTarefa.appendChild(checkbox);
    checkbox.addEventListener('change', function() {
        spanTexto.classList.toggle('concluida');
        atualizarContador();
        salvarTarefas();
    });

    novaTarefa.appendChild(spanTexto);

    novaTarefa.appendChild(botaoLista);
    botaoLista.addEventListener('click', function() {
        novaTarefa.remove();
        atualizarContador();
        salvarTarefas();
    });

    lista.appendChild(novaTarefa);
    atualizarContador();
    salvarTarefas();

    input.value = '';
})

function atualizarContador() {
    const total = lista.children.length;
    const checkboxes = lista.querySelectorAll('input[type="checkbox"]');

    const concluidas = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked;
    });

    conclusao.textContent = `${concluidas.length} de ${total} tarefas concluídas`;
}

limpar.addEventListener('click', function(evento) {
    const marcados = lista.querySelectorAll('input[type="checkbox"]:checked');
    Array.from(marcados).forEach(function(checkbox) {
        checkbox.parentElement.remove();
    });
    atualizarContador();
    salvarTarefas();
})

function salvarTarefas() {
    const itens = Array.from(lista.querySelectorAll('li')); 
    const tarefas = itens.map(function(item) {
        return {
            texto: item.querySelector('span').textContent,
            concluida: item.querySelector('input').checked
        };
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dadosSalvos = localStorage.getItem('tarefas');
    if (dadosSalvos === null) {
        return;
    }

    const tarefas = JSON.parse(dadosSalvos);

    tarefas.forEach(function(tarefa) {
        const novaTarefa = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const spanTexto = document.createElement('span');
        spanTexto.textContent = tarefa.texto;
        const botaoLista = document.createElement('button');
        botaoLista.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        checkbox.checked = tarefa.concluida;
        if (tarefa.concluida) {
            spanTexto.classList.add('concluida');
        }

        novaTarefa.appendChild(checkbox);
        checkbox.addEventListener('change', function() {
            spanTexto.classList.toggle('concluida');
            atualizarContador();
            salvarTarefas();
        });

        novaTarefa.appendChild(spanTexto);

        novaTarefa.appendChild(botaoLista);
        botaoLista.addEventListener('click', function() {
            novaTarefa.remove();
            atualizarContador();
            salvarTarefas();
        });

        lista.appendChild(novaTarefa);
    });

    atualizarContador();
}

carregarTarefas();

