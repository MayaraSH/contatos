const form = document.getElementById('form-contato');
const nomes = [];
const telefones = [];

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    ordenarContatos();
    atualizaTabela();
});

function adicionaLinha() {
    const inputNomeCompleto = document.getElementById('nome-completo');
    const inputTelefoneDDD = document.getElementById('telefone-ddd');

    const nome = inputNomeCompleto.value;
    const telefone = inputTelefoneDDD.value.replace(/\s+/g, '');

    if (nomes.includes(nome)) {
        alert(`Este nome: ${nome} já foi inserido.`);
        return;
    }

    if (telefones.includes(telefone)) {
        alert(`Este telefone: ${telefone} já foi inserido.`);
        return;
    }
    
    if (telefone.length < 10 || isNaN(telefone)) {
        alert('O telefone deve conter pelo menos 10 números.');
        return;
    }

    nomes.push(nome);
    telefones.push(telefone);

    let linha = '<tr>';
    linha += `<td>${nome}</td>`;
    linha += `<td>${telefone}</td>`;
    linha += `</tr>`;

    linhas += linha;

    inputNomeCompleto.value = '';
    inputTelefoneDDD.value = '';
}

function ordenarContatos() {
    const contatos = nomes.map((nome, index) => ({ nome, telefone: telefones[index] }));
    
    contatos.sort((a, b) => a.nome.localeCompare(b.nome));

    for (let i = 0; i < contatos.length; i++) {
        nomes[i] = contatos[i].nome;
        telefones[i] = contatos[i].telefone;
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    linhas = '';

    for (let i = 0; i < nomes.length; i++) {
        let linha = '<tr>';
        linha += `<td>${nomes[i]}</td>`;
        linha += `<td>${telefones[i]}</td>`;
        linha += `</tr>`;
        linhas += linha;
    }

    corpoTabela.innerHTML = linhas;
}
