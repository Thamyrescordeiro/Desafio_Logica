"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
class produto {
    constructor(nome, preco, categoria, quantidadeEstoque) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidadeEstoque = quantidadeEstoque;
    }
}
let produtos = [];
function adicionarProduto(nome, preco, categoria, quantidadeEstoque) {
    const produtoExitente = produtos.find(produto => produto.nome === nome);
    if (produtoExitente) {
        console.log("Produto já cadastrado.");
        return;
    }
    if (preco <= 0 || quantidadeEstoque < 0) {
        console.log("Preço e quantidade em estoque devem ser maiores que zero.");
        return;
    }
    const novoProduto = new produto(nome, preco, categoria, quantidadeEstoque);
    produtos.push(novoProduto);
    console.log("Produto adicionado com sucesso!");
}
function editarProduto(nome, novoNome, novoPreco, novaCategoria, novaQuantidadeEstoque) {
    const produto = produtos.find(produto => produto.nome === nome);
    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }
    if (novoPreco <= 0 || novaQuantidadeEstoque < 0) {
        console.log("Preço e quantidade em estoque devem ser maiores que zero.");
        return;
    }
    produto.nome = novoNome;
    produto.preco = novoPreco;
    produto.categoria = novaCategoria;
    produto.quantidadeEstoque = novaQuantidadeEstoque;
    console.log("Produto editado com sucesso!");
}
function removerProduto(nome) {
    const produtoIndex = produtos.findIndex(produto => produto.nome === nome);
    if (produtoIndex === -1) {
        console.log("Produto não encontrado.");
        return;
    }
    produtos.splice(produtoIndex, 1);
    console.log("Produto removido com sucesso!");
}
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }
    console.log("Lista de produtos:");
    produtos.forEach(produto => {
        console.log(`Nome: ${produto.nome}, Preço: ${produto.preco}, Categoria: ${produto.categoria}, Quantidade em Estoque: ${produto.quantidadeEstoque}`);
    });
}
function buscarCategoria(categoria) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    if (produtosFiltrados.length === 0) {
        console.log("Nenhum produto encontrado nessa categoria.");
        return;
    }
    console.log("Produtos encontrados na categoria " + categoria + ":");
    produtosFiltrados.forEach(produto => {
        console.log(`Nome: ${produto.nome}, Preço: ${produto.preco}, Quantidade em Estoque: ${produto.quantidadeEstoque}`);
    });
}
function menu() {
    let opcao;
    do {
        console.log("Menu:");
        console.log("1. Adicionar produto");
        console.log("2. Editar produto");
        console.log("3. Remover produto");
        console.log("4. Listar produtos");
        console.log("5. Buscar produtos por categoria");
        console.log("0. Sair");
        opcao = readlineSync.questionInt("Escolha uma opção: ");
        if (opcao < 0 || opcao > 5) {
            console.log("Opção inválida. Tente novamente.");
            continue;
        }
        if (opcao === 6) {
            console.log('Saindo do programa.');
            break;
        }
        switch (opcao) {
            case 1:
                const nomeAdicionar = readlineSync.question('Nome do produto: ');
                const precoAdicionar = readlineSync.questionFloat('Preço do produto: ');
                const categoriaAdicionar = readlineSync.question('Categoria do produto: ');
                const quantidadeAdicionar = readlineSync.questionInt('Quantidade em estoque: ');
                adicionarProduto(nomeAdicionar, precoAdicionar, categoriaAdicionar, quantidadeAdicionar);
                break;
            case 2:
                const nomeEditar = readlineSync.question('Nome do produto');
                const novoNome = readlineSync.question('Nome do produto a editar: ');
                const novoPreco = readlineSync.questionFloat('Novo preço do produto: ');
                const novaCategoria = readlineSync.question('Nova categoria do produto: ');
                const novaQuantidadeEstoque = readlineSync.questionInt('Nova quantidade do produto');
                editarProduto(nomeEditar, novoNome, novoPreco, novaCategoria, novaQuantidadeEstoque);
                break;
            case 3:
                const nomeRemover = readlineSync.question('Nome do produto a remover: ');
                removerProduto(nomeRemover);
                break;
            case 4:
                listarProdutos();
                break;
            case 5:
                const categoriaBuscar = readlineSync.question('Digite a categoria: ');
                buscarCategoria(categoriaBuscar);
                break;
        }
    } while (true);
}
menu();
