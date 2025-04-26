// Importa a biblioteca para ler os dados do usuário//
import * as readlineSync from 'readline-sync';

// Classe com suas váriaveis//
class produto{
    id: number;
    nome: string;
    preco: number;
    categoria: string;
    quantidadeEstoque: number;

    constructor(id: number, nome: string, preco: number, categoria: string, quantidadeEstoque: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidadeEstoque = quantidadeEstoque;
    }
}
   // Array que armazena os produtos//
    let produtos: produto[] = [];

    // Variável que armazena o próximo ID//
    let proximoId: number = 1;

   // Função para adicionar um produto//
function adicionarProduto(nome: string, preco: number, categoria: string, quantidadeEstoque: number) {
    //verifica se o produto já existe//
   const produtoExitente = produtos.find(produto => produto.nome === nome);
    if (produtoExitente) {
        console.log("Produto já cadastrado.");
        return;
    }
    // verifica se o preço e a quantidade em estoque são válidos//
    if (preco <= 0 || quantidadeEstoque < 0) {
        console.log("Preço e quantidade em estoque devem ser maiores que zero.");
        return;
        
    }
    // Cria um novo produto e adiciona ao array//
    const novoProduto = new produto(proximoId, nome, preco, categoria, quantidadeEstoque);
    produtos.push(novoProduto);
    console.log("Produto adicionado com sucesso!");
    proximoId++;
}

// Função para editar um produto//
function editarProdutoId(id: number, novoNome: string, novoPreco: number, novaCategoria: string, novaQuantidadeEstoque: number) {
    const produto = produtos.find(produto => produto.id === id);
    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }
    if (novoPreco <= 0 || novaQuantidadeEstoque < 0) {
        console.log("Preço e quantidade em estoque devem ser validos");
        return;
    }
    // Atualiza os dados do produto//
    produto.nome = novoNome;
    produto.preco = novoPreco;
    produto.categoria = novaCategoria;
    produto.quantidadeEstoque = novaQuantidadeEstoque;
    console.log("Produto editado com sucesso!");
}
// Função para remover um produto//
function removerProduto(id: number) {
    const produtoIndex = produtos.findIndex(produto => produto.id === id);
    if (produtoIndex === -1) {
        console.log("Produto não encontrado.");
        return;
    }
    // Remove o produto do array//
    produtos.splice(produtoIndex, 1);
    console.log("Produto removido com sucesso!");
}
// Função para listar todos os produtos//
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }
    console.log("Lista de produtos:");
    produtos.forEach(produto => {
        console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Preço: ${produto.preco}, Categoria: ${produto.categoria}, Quantidade em Estoque: ${produto.quantidadeEstoque}`);
    });
}
// Função para buscar produtos por categoria//
function buscarCategoria(categoria: string) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    if (produtosFiltrados.length === 0) {
        console.log("Nenhum produto encontrado nessa categoria.");
        return;
    }
    console.log("Produtos encontrados na categoria " + categoria + ":");
    // Lista os produtos filtrados//
    produtosFiltrados.forEach(produto => {
        console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Preço: ${produto.preco}, Categoria: ${produto.categoria}, Quantidade em Estoque: ${produto.quantidadeEstoque}`);
    });
}
// Função para exibir o menu e lidar com as opções do usuário//
function menu() {
    let opcao: number;

    do {
        console.clear();
        console.log("Menu:");
        console.log("1. Adicionar produto");
        console.log("2. Editar produto");
        console.log("3. Remover produto");
        console.log("4. Listar produtos");
        console.log("5. Buscar produtos por categoria");
        console.log("6. Sair");

        opcao = readlineSync.questionInt("Escolha uma opção: ");

        
        if(opcao < 0 || opcao > 6) {
            console.log("Opção inválida. Tente novamente.");
            continue;
        }

        if(opcao ===6){
            console.log('Saindo do programa.');
            break;
        }

        // Chama a função correspondente à opção escolhida//
   switch (opcao) {
    case 1:
      const nomeAdicionar = readlineSync.question('Nome do produto: ');
      const precoAdicionar = readlineSync.questionFloat('Preço do produto: ');
      const categoriaAdicionar = readlineSync.question('Categoria do produto: ');
      const quantidadeAdicionar = readlineSync.questionInt('Quantidade em estoque: ');
      adicionarProduto(nomeAdicionar, precoAdicionar, categoriaAdicionar, quantidadeAdicionar);
      break;


    case 2:
      const idnomeEditar = readlineSync.questionInt('ID do produto a editar: ');
      const produtoExistente = produtos.find(produto => produto.id === idnomeEditar);

      if (!produtoExistente) {
          console.log("Produto não encontrado.");
          break;
      }

      const novoNome = readlineSync.question('Nome do produto a editar: ');
      const novoPreco = readlineSync.questionFloat('Novo preço do produto: ');
      const novaCategoria = readlineSync.question('Nova categoria do produto: ');
      const novaQuantidadeEstoque = readlineSync.questionInt('Nova quantidade do produto: ');
      editarProdutoId(idnomeEditar, novoNome, novoPreco, novaCategoria, novaQuantidadeEstoque);
      break;

    case 3: 
    const idRemover = readlineSync.questionInt('ID do produto a remover: ');
    removerProduto(idRemover);
       break;   
       
    case 4: 
    listarProdutos();
       break;
    
    case 5:
        const categoriaBuscar = readlineSync.question('Digite a categoria: ');
       buscarCategoria(categoriaBuscar);
       break;

   }
   readlineSync.question('Pressione Enter para voltar ao menu...');
}while(true)

}
menu();



       

