// Aqui estamos dizendo:
// "espere o html carregar completamente antes de executar o JavaScrippt"
Document.addEventListener("DOMContentLoaded", function () {

    //Aqui estamos pegando o formulário pelo ID
    // No HTML precisa existir: <form id="formCadastro");
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {


    

        // Agoa estamos dizendo:
        // "quando o formulário for enviado (botão Enviar clicado)..."
        formCadastro.addEventListener("submit", async (e) =>{

            try{

                const resp = await fetch('/api/cadastrar', {
                    method: 'POST',
                    headers: { 'content-Type': 'applicantion/json'},
                    body: JSON.stringify(dados)
                });

                const result = await resp.json();

                this.document.getElementById('mensagem').innerText = result.menssage;

                formCadastro.requestFullscreen();
            } catch (err){
                // Caso algo dê errado (servidor fora do ar, etc)
                alert('Erro de comunicação com o servidor:' + err);
            }
            

           // Impede o comportamento padrão do navegador
           // Normalmente o formulário recarrega a página
           // Isso bloqueia o recarregamento
           e.preventDefault();
           const dados = Object.fromEntries(
              new FormData(formCadastro)

           );

         console.log("dados capturados:");

         //mostra apenas o campo nome
         console.log("Nome:", dados.nome);

         //mostra o campo email(só funciona se existir no HTML)
          console.log("Email:", dados.email);

          //mostra o campo telefone(só funciona se existir no HTML)
          console.log("telefone:", dados.telefone);

          // mostra o objeto completo com todos os dados
          console.log(dados);
        });
    }
    


});
