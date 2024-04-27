// Função para pesquisar um pokémon especifico
async function getPokemon(){
    try {
        const respota = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisaPokemon.value}`)
        const pokemonJson = await respota.json()

        const image = pokemonJson.sprites.front_default;
        const name = pokemonJson.species.name;
        const id = pokemonJson.id;
        // const type = pokemonJson.types;
        
        document.querySelector(".list-pokemon").style.padding = "15px"
        const mostrarImage = document.getElementById("imagePokemon").innerHTML = `<img class='imagePokemon' src='${image}' >`
        const mostrarNome = document.getElementById("nomePokemon").innerHTML = `<h3 class='numberPokemon'> ${name} </h3>`
        const mostrarId = document.getElementById("idPokemon").innerHTML = `<p style="color: #0000009c; margin-top: 10px;" > Nº ${id} </p>`
        // const mostrarTipo = document.getElementById("tipoPokemon").innerHTML = `<h3> ${type} </h3>`


        return mostrarImage, mostrarNome, mostrarId

    } catch (erro) {
        return alert('Pokémon não encontrado')

    }
}

// Função para gerar um container de pokémons

async function listPokemon(start, endPokemon) {
    const container = document.getElementById("pokemonContainer");

    for (let i = start; i <= endPokemon; i++) {
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonJson = await response.json();

        const image = pokemonJson.sprites.front_default;
        const name = pokemonJson.species.name;
        const id = pokemonJson.id;

        // Criar elementos HTML
        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("pokemon");
        pokemonDiv.style.boxShadow = "3px 3px 10px #c3c3c394";

        const imageElement = document.createElement("img");
        imageElement.src = image;
        imageElement.classList.add("imagePokemon");
        pokemonDiv.appendChild(imageElement);
        
        const idElement = document.createElement("p");
        idElement.textContent = `Nº ${id}`;
        idElement.style.color = "#0000009c";
        idElement.style.marginLeft = "10px";
        pokemonDiv.appendChild(idElement);

        const nameElement = document.createElement("h3");
        nameElement.textContent = name;
        nameElement.style.marginLeft = "10px";
        nameElement.classList.add("numberPokemon");
        pokemonDiv.appendChild(nameElement);


        // Adicionar o elemento criado ao container
        container.appendChild(pokemonDiv);
    }
}

const form = document.querySelector('#form')
const pesquisaPokemon = document.querySelector('#pesquisaPokemon')

let pokemonStart = 1;
let pokemonEnd = 18;

// Adicionar mais 18 pokémons na lista
document.getElementById("morePokemon").addEventListener("click", async function() {
    pokemonStart += 18;
    pokemonEnd += 18;
    await listPokemon(pokemonStart, pokemonEnd);
});

listPokemon(pokemonStart, pokemonEnd);


// Obtém uma referência para o botão de pesquisa
var btnPesquisar = document.getElementById("btn-pesquisar");

// Obtém uma referência para o modal
var modal = document.getElementById("myModal");

// Quando o botão de pesquisa for clicado, mostra o modal
btnPesquisar.addEventListener("click", function(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    // Mostra o modal com resultado da pesquisa
    modal.style.display = "block";
    getPokemon(pesquisaPokemon.value);
});

// Obtém uma referência para o botão de fechar do modal
var spanClose = document.getElementsByClassName("close")[0];

// Quando o botão de fechar do modal for clicado, fecha o modal
spanClose.addEventListener("click", function() {
    modal.style.display = "none";
});

// Quando o usuário clicar fora do modal, fecha o modal
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});