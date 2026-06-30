const botao = document.getElementById('btn-converter');
const inputValor = document.getElementById('valor');
const selectOrigem = document.getElementById('moeda-origem');
const selectDestino = document.getElementById('moeda-destino');
const botaoTrocar = document.getElementById('btn-trocar');

botao.addEventListener('click', function() {
    const valor = inputValor.value;
    const moedaOrigem = selectOrigem.value;
    const moedaDestino = selectDestino.value;

    if (valor === '' || valor <= 0) {
    document.getElementById('resultado').textContent = 'Digite um valor válido.';
    return;
    }

    const taxas = {
        BRL: 1,
        USD: 5.20,
        EUR: 5.65,
        GBP: 6.60
    };

    const valorEmReais = valor * taxas[moedaOrigem];
    const valorConvertido = valorEmReais / taxas[moedaDestino];
    const resultadoArredondado = valorConvertido.toFixed(2);

    document.getElementById('resultado').textContent =
    `${valor} ${moedaOrigem} = ${resultadoArredondado} ${moedaDestino}`;

});

inputValor.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        botao.click();
    }
});

botaoTrocar.addEventListener('click', function() {
    const temp = selectOrigem.value;
    selectOrigem.value = selectDestino.value;
    selectDestino.value = temp;
});