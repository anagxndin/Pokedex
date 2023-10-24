
let formSelect = document.querySelector("#formSelect");
let pokeImg = document.querySelector("#pokeImg");
let pokeNome = document.querySelector("#pokeNome");
let pokeTipo = document.querySelector("#pokeTipo");
let pokeNum = document.querySelector("#pokeNum");
let pokeInfo = document.querySelector("#pokeInfo");
let pokeDados = document.querySelector('#pokeDados');


function fetchPokemon(pokeNome) {
    fetch(`https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${pokeNome}`)
            .then(response => response.json())
            .then(data => {
                let nome = data.name;
                let imageUrl = data.sprites.front_default;
                let tipo = data.types[0].type.name;
                let numero = data.id;

                pokeImg.src = imageUrl;
                pokeDados.innerHTML = "<h1>" + nome.toUpperCase() + " - #" + numero + "</h1>"
                
                fetch(`https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${pokeNome}`)
                    .then(response => response.json())
                    .then(speciesData => {
                        let altura = data.height * 10;
                        let peso = data.weight / 10;
                        let geracao = speciesData.generation.name;

                        pokeInfo.innerHTML = `
                        <p><b>Altura: ${altura} cm</b></p>
                        <p><b>Peso: ${peso} kg</b></p>
                        <p><b>Geração: ${geracao} </b></p>
                        <p><b>Tipo: </b>${tipo}</p>
                    `;
                    
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));

    }


    fetch("https://pokemon.danielpimentel.com.br/v1/pokemon/lista")
    .then((resposta) => resposta.json())
    .then((dados) => {
        for (let i = 0; i < dados.pokemon.length; i ++) {
            numero = dados.pokemon[i].pokeNum
            fetch(url+"pokemon/numero/"+pokeNum)
            .then((resposta) => resposta.json())
            .then((pokemon) => {
                document.querySelector(".gridPokemon").innerHTML += `<img src=${pokemon.pokemon.img}>`
            })
            .catch((erro) => console.log(erro))
        }
        document.querySelector(".modalLoading").style.visibility = 'hidden'
    })
    .catch((erro) => console.log(erro))


    selecionaPokemon();
   

    formSelect.addEventListener("change", function() {
        let selectedPokemonName = formSelect.value;
        fetchPokemon(selectedPokemonName);

    });

 


