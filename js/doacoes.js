// ===== Rolagem suave para links de âncora =====
// Seleciona todos os links que começam com '#' (âncoras internas)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Evita que o link pule instantaneamente para a seção
        // Seleciona o elemento de destino usando o href do link
        const target = document.querySelector(this.getAttribute('href'));
        // Se o elemento existir, faz a rolagem suave até ele
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Botão de voltar ao topo =====
// Cria um botão dinamicamente
const scrollButton = document.createElement('button');
scrollButton.textContent = '↑'; // Setinha para cima

// Estiliza o botão
scrollButton.style.position = 'fixed';
scrollButton.style.bottom = '30px';
scrollButton.style.right = '30px';
scrollButton.style.padding = '10px 15px';
scrollButton.style.fontSize = '20px';
scrollButton.style.borderRadius = '50%';
scrollButton.style.border = 'none';
scrollButton.style.backgroundColor = '#12333d';
scrollButton.style.color = '#fff';
scrollButton.style.cursor = 'pointer';
scrollButton.style.display = 'none'; // Inicialmente escondido
scrollButton.style.zIndex = '1000'; // Fica acima de outros elementos

// Adiciona o botão ao corpo do documento
document.body.appendChild(scrollButton);

// Ao clicar no botão, rola suavemente para o topo da página
scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Exibe o botão apenas quando o usuário rolar mais de 300px
window.addEventListener('scroll', () => {
    scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ===== Validação e funcionalidade do formulário de doação =====
const formDoacao = document.getElementById('formulario'); // Formulário de doação
const inputValor = document.getElementById('valor-doacao'); // Campo de valor da doação
const botoes = document.querySelectorAll('.btn-valor'); // Botões de valores pré-definidos

// Quando um botão de valor é clicado, adiciona o valor ao campo de doação
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Converte o valor atual do campo para float, substituindo vírgula por ponto
        let valorAtual = parseFloat(inputValor.value.replace(',', '.')) || 0;
        let valorBotao = parseFloat(botao.dataset.valor); // Valor do botão clicado
        // Atualiza o campo com a soma dos valores, formatado com 2 casas decimais
        inputValor.value = (valorAtual + valorBotao).toFixed(2);
    });
});

// ===== Botão Limpar =====
// Cria dinamicamente um botão para limpar o valor da doação
const btnLimpar = document.createElement('button');
btnLimpar.type = 'button';
btnLimpar.textContent = 'Limpar';

// Estiliza o botão
btnLimpar.style.marginLeft = '10px';
btnLimpar.style.padding = '10px 15px';
btnLimpar.style.borderRadius = '8px';
btnLimpar.style.border = 'none';
btnLimpar.style.backgroundColor = '#12333d';
btnLimpar.style.color = '#fff';
btnLimpar.style.cursor = 'pointer';

// Adiciona o botão à div de botões de valores
document.querySelector('.botoes-valores').appendChild(btnLimpar);

// Limpa o campo de valor ao clicar no botão
btnLimpar.addEventListener('click', () => { 
    inputValor.value = ''; 
});

// ===== Validação do cadastro de voluntário =====
const formVoluntario = document.getElementById('cadastro'); // Formulário de cadastro de voluntário

// Previne o envio automático do formulário para permitir validações
formVoluntario.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // Aqui você pode adicionar validações ou envio via AJAX
});
