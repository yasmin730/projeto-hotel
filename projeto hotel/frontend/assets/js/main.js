
// Aqui estamos dizendo:
// "espere o html carregar completamente antes de executar o JavaScrippt"
Document.addEventListener("DOMContentLoaded", function () {

    //Aqui estamos pegando o formulário pelo ID
    // No HTML precisa existir: <form id="formCadastro");
    const formCadastro = document.getElementById("formCadastro");

    // Agoa estamos dizendo:
    // "quando o formulário for enviado (botão Enviar clicado)..."
    formCadastro.addEventListener("submit", function (e){

        // Impede o comportamento padrão do navegador
        // Normalmente o formulário recarrega a página
        // Isso bloqueia o recarregamento
        e.preventDefault();

        // Aqui acotece

        const dados = Object.fromEntries(

        );

        console.log("dados capturados:");

        //mostra apenas o campo nome
        console.log("Nome:", dados.nome);

        //mostra o campo email(só funciona se existir no HTML)
        console.log("Email:", dados.email);

        //mostra o campo telefone(só funciona se existir no HTML)
        console.LOG



    });
});