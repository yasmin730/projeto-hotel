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
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            //pega o nome digitado pelo usuario
            const nome= document.getElementById('campoBusca').value;
            //🚀 faz uma requisição GET ao Flask, enviando o nome como parâmetro
            const resp = await fetch(`/bucar?nome=${nome}`);
            const clientes = await resp.json(); //🕹️ recebe lista de clientes

            const tabela = document.getElementById('tabelaResultados');
            tabela.innerHTML = ''; //Limpa a tabela antes de exibir os novos resultados

            // Para cada clientes retornado, cria uma nova linha na tabela HTML
            clientes.forEach(cli => {
               const row =`
               <tr>
                <td>${cli.ID}</td>
                <td>${cli.Nome}</td>
                <td>${cli.CPF}</td>
                <td>${cli.Email}</td>
                <td>${cli.Telefone}</td>
                <td><ahref="/alterar?id=${cli.ID}" class="bnt bnt-sm bnt-warning"> Editar</a></td>
               </tr>`;
               tabela.innerHTML += row;
            });
    

        });
    }

    formAlterar.addEventListener('submit', async (e) =>{
       e.preventDefault();

       const dados = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value,
        endereco: endereco.value,
        observacoes: observacoes.value,
       }
       // envia para o backend (rota/api/atualizar/<id>)
       const resp = await fetch(`/api/atualizar/${id}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json'},
          body: JSON.stringify(dados)
       });

       const result = await resp.json();
       mensagem.ineerText = result.message; // mostra o retorno na tela

    });


});
