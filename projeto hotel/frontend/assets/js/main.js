document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault();
            const dados = Object.fromEntries(new FormData(formCadastro));
            try {
                const resp = await fetch('/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                const result = await resp.json();
                document.getElementById('mensagem').innerText = result.message;
                formCadastro.reset();
            } catch (err) {
                alert('Erro de comunicação: ' + err);
            }
        });
    }

    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            const nome = document.getElementById('campoBusca').value;
            // CORREÇÃO: Uso de crases para Template Literals
            const resp = await fetch(`/buscar?nome=${nome}`);
            const clientes = await resp.json();

            const tabela = document.getElementById('tabelaResultados');
            tabela.innerHTML = ''; // CORREÇÃO: innerHTML

            clientes.forEach(cli => {
                // CORREÇÃO: Uso de crases e sintaxe correta no link de editar
                const row = `
                <tr>
                    <td>${cli.ID}</td>
                    <td>${cli.Nome}</td>
                    <td>${cli.CPF}</td>
                    <td>${cli.Email}</td>
                    <td>${cli.Telefone}</td>
                    <td><a href="/alterar?id=${cli.ID}" class="btn btn-sm btn-warning">Editar</a></td>
                </tr>`;
                tabela.innerHTML += row;
            });
        });
    }

    const formAlterar = document.getElementById('formAlterar');
    if (formAlterar) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id'); // ID capturado da URL
        const mensagem = document.getElementById('mensagem');

        // Carregar dados atuais do cliente
        fetch(`/api/cliente/${id}`) // CORREÇÃO: Uso de crases
            .then(r => r.json())
            .then(cli => {
                document.getElementById('clienteid').value = cli.ID;
                document.getElementById('nome').value = cli.Nome;
                document.getElementById('cpf').value = cli.CPF;
                document.getElementById('email').value = cli.Email;
                document.getElementById('telefone').value = cli.Telefone;
                document.getElementById('endereco').value = cli.Endereço;
                document.getElementById('observacoes').value = cli.Observações;
            });

        // Evento de salvar alteração
        formAlterar.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Capturando os valores dos inputs corretamente
            const dados = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value,
                observacoes: document.getElementById('observacoes').value
            };

            try {
                const resp = await fetch(`/api/atualizar/${id}`, { // CORREÇÃO: Uso de crases
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }, // CORREÇÃO: application
                    body: JSON.stringify(dados)
                });

                const result = await resp.json(); // CORREÇÃO: espaço no await
                mensagem.innerText = result.message;
            } catch (err) {
                console.error("Erro ao atualizar:", err);
            }
        });
    }
});
