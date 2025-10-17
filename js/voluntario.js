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

// ===== Botão de rolar para o topo =====
// Cria dinamicamente um botão de scroll para o topo
const scrollButton = document.createElement('button');
scrollButton.textContent = '↑'; // Setinha para cima

// Define o estilo do botão
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
scrollButton.style.zIndex = '1000';

// Adiciona o botão ao corpo do documento
document.body.appendChild(scrollButton);

// Ao clicar no botão, rola suavemente para o topo da página
scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mostra ou esconde o botão dependendo da posição de rolagem
window.addEventListener('scroll', () => {
    scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ===== Funções executadas após o DOM carregar (Lazy Loading e Validações) =====
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Menu Hambúrguer (ADICIONADA AQUI) ---
    const btnMenu = document.querySelector('.menu-mobile-btn');
    const menuLinks = document.querySelector('#menu-links');

    if (btnMenu && menuLinks) {
        btnMenu.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });
    }
    // --- FIM da Lógica do Menu Hambúrguer ---

    // ===== Validação de cadastro de voluntário com mensagem animada =====
    const formVoluntario = document.getElementById('cadastro'); // Formulário
    const senhaInput = document.getElementById('senha'); // Campo senha
    const confirmSenhaInput = document.getElementById('confirmSenha'); // Campo confirmar senha

    // Cria o elemento da mensagem de sucesso
    const msgSucesso = document.createElement('div');
    msgSucesso.textContent = "Cadastro realizado com sucesso!";
    msgSucesso.classList.add('mensagem-sucesso'); // Adiciona classe para estilização/animacao
    document.body.appendChild(msgSucesso); // Adiciona ao corpo

    // Verifica se os elementos existem antes de adicionar o evento
    if (formVoluntario && senhaInput && confirmSenhaInput) {
        formVoluntario.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede envio real do formulário para exibir animação

            const senha = senhaInput.value.trim();
            const confirmSenha = confirmSenhaInput.value.trim();

            // Verifica se os campos de senha não estão vazios
            if (senha === "" || confirmSenha === "") {
                alert("Preencha ambos os campos de senha!");
                return;
            }

            // Verifica se as senhas conferem
            if (senha !== confirmSenha) {
                alert("As senhas não conferem!");
                senhaInput.focus(); // Foca no campo de senha para correção
                return;
            }

            // Exibe a mensagem de sucesso com animação
            msgSucesso.classList.add('mostrar');

            // Some automaticamente após 3 segundos e limpa o formulário
            setTimeout(() => {
                msgSucesso.classList.remove('mostrar');
                formVoluntario.reset(); // limpa todos os campos
            }, 3000);
        });
    }
    
    // Seleciona os inputs (movidos para dentro do DOMContentLoaded para garantir a execução)
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const cepInput = document.getElementById("cep"); // só uma vez

    // Máscara de CPF
    if (cpfInput) {
        cpfInput.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, ""); // remove tudo que não é número
            if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            this.value = valor;
        });
    }

    // Máscara de Telefone
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, ""); // remove tudo que não é número
            if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos
            valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // adiciona parênteses no DDD
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");    // adiciona hífen
            this.value = valor;
        });
    }

    // Máscara de CEP
    if (cepInput) {
        cepInput.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, ""); // remove tudo que não é número
            if (valor.length > 8) valor = valor.slice(0, 8); // limita a 8 dígitos
            valor = valor.replace(/^(\d{5})(\d)/, "$1-$2"); // adiciona hífen após os 5 primeiros números
            this.value = valor;
        });
    }


}); // FIM de DOMContentLoaded