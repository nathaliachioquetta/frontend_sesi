function executarSistema() {

    try {
        const inputNome = document.getElementById("inputNome");
        const inputIdade =document.getElementById("inputIdade");
        const inputValor =document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom") === "true";

        //dados de saida
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById ("btnfinalizar");

        btn.disable= true;
        btn.innerText = "Processando . . .";

        //trim() Remove os espaços em branco
        const nome = inputNome.value.trim();
        const idade = parseInt (inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";

        // validação para campos vazios

        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "por favor, preencha todos os campos ;)";
            msg.style.color = "#ff4444"
            return;
        }

        // regra de negócio
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#1aff00";

            //desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            //estoque
            let estoque = ["placa de video", "processador", "memoria RAM"];
            lista.innerHTML = ""; // limpa a lista anterior

            estoque.forEach(Item => {
                let li = document.createElement("li");
                li.innerText = `Item) ${Item} reservado.`;
                lista.appendChild(li);
            });

            //relatorio
            relatorio.style.display = "block";
            relatorio.innerHTML = `
        <strong> RESUMO DO PEDIDO <\strong><br>
        cliente: ${nome} <br>
        Total Original: R$ ${valor.toFixed(2)} <br>
        <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong>
         `;

        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) {

    }

}


