async function obterProdutos() {
    const url = "https://dummyjson.com/products"; // URL da API
    const produtosContainer = document.getElementById("produtos"); // Container dos produtos

    try {
        const resposta = await fetch(url);

        // Verifica se a resposta é válida
        if (resposta.status === 200) {
            const dados = await resposta.json();
            const produtos = dados.products;

            // Limpa o container antes de adicionar novos produtos
            produtosContainer.innerHTML = "";

            // Cria os elementos para exibir os produtos
            produtos.forEach(produto => {
                const produtoElemento = document.createElement("div");
                produtoElemento.classList.add("produto");

                produtoElemento.innerHTML = `
                    <img src="${produto.thumbnail}" alt="${produto.title}">
                    <h3>${produto.title}</h3>
                    <p>Preço: R$ ${produto.price.toFixed(2)}</p>
                    <p>${produto.description}</p>
                `;

                produtosContainer.appendChild(produtoElemento);
            });
        } else {
            console.error(`Erro: Status ${resposta.status}`);
            produtosContainer.innerHTML = "<p>Erro ao carregar produtos. Tente novamente.</p>";
        }
    } catch (erro) {
        console.error("Erro ao tentar buscar os dados:", erro.message);
        produtosContainer.innerHTML = "<p>Erro de conexão. Tente novamente mais tarde.</p>";
    }
}

// Chamar ao clicar no botão
document.getElementById("btnCarregar").addEventListener("click", obterProdutos);
