

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('formSelect');
    const divDados = document.getElementById('pokeDados')
    const details = document.getElementById('pokeDados');


    function pokemonDados (pokemon) {
        nome = pokemon.nome.toUpperCase(0);
        const imgPokemon = pokemon.img_3d;
        numero = pokemon.numero;
        altura = pokemon.altura;
        peso = pokemon.peso;
        tipo = pokemon.tipo;
        geracao = pokemon.geracao;
        speed = pokemon.speed;
        hp = pokemon.hp;
        atk = pokemon.atk;
        def = pokemon.def;
        spatk = pokemon.spatk;
        spdef = pokemon.spdef;
        evolutions = pokemon.evolucoes;
       

        divDados.innerHTML = `
       
        <h2 id="nomePokemon">${nome} - #${numero}</h2>
        <img id="imgPokemon" src="${imgPokemon}" alt="Imagem do Pokémon">

        <div id=Informacoes>
        <div id="dadosBasicos">
        <div id="colunaUm"><p><b>${altura} cm</b></p>
        <p><b>${peso} kg</b></p></div>
        <div id="colunaDois">
            <p><b>Geração ${geracao} </b> <div class="iconesTipo">
        </p></div>
        </div>

        
        
        </div>
        <table id="dadosCombate">
       
        <tr>
        <td>Ataque: ${atk}</td>
        <td>Defesa: ${def}</td>
        <td>HP:${hp}</td>
        </tr>

        <tr>
        <td>Ataque Especial: ${spatk}</td>
        <td>Defesa Especial: ${spdef}</td>
        <td>Velocidade: ${speed}</td>
        </tr>
        
        </table>

        <div class="iconesEvolution">
        Evoluções: "${evolutions}"
        </div>
        
    </div>
    `;
    

    
    const tipo2 = tipo.split(',');
    let iconesTipo = document.querySelector('.iconesTipo');
    iconesTipo.innerHTML = '';
    for (var i =0; i < tipo2.length; i++) {
        iconesTipo.innerHTML += `<img class="imgTipo" src="images/${tipo2[i]}.svg">`
    }

    // evolutionPokemon = evolutions.split(',');
    // let divEvolution = document.querySelector('.iconesEvolution');
    // divEvolution.innerHTML = '';
    // for (var i =0; i < evolutionPokemon.length; i++) {
    //     const PokemonEvolution = `https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${evolutionPokemon[i]}`;
    //     const imgPokemonEvolution = PokemonEvolution.img_3d;
    //     divEvolution.innerHTML += `<img class="imageEvolution" src="${imgPokemonEvolution[i]}">`
    // }

evolutionPokemon = evolutions.split(',');
let divEvolution = document.querySelector('.iconesEvolution');
divEvolution.innerHTML = '';

for (var i = 0; i < evolutionPokemon.length; i++) {
    const evolutionName = evolutionPokemon[i]; 
    const evolutionApiUrl = `https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${evolutionName}`;

    // Faça uma requisição à API
    fetch(evolutionApiUrl)
        .then(response => response.json())
        .then(data => {
            const imgPokemonEvolution = evolutionName.img;
            divEvolution.innerHTML += `<img class="imageEvolution" src="${imgPokemonEvolution}">`
            
        })
        .catch(error => {
            console.error(`Erro ao carregar a evolução ${evolutionName}: ${error}`);
        });
}

    
   
   

    }

   

    fetch('https://pokemon.danielpimentel.com.br/v1/pokemon/lista')
        .then(response => response.json())
        .then(data => {
            data.pokemon.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.nome;
                option.textContent = pokemon.nome;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    select.addEventListener('change', () => {
        const pokemonSelecionado = select.value;
        fetch(`https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${pokemonSelecionado}`)
            .then(response => response.json())
            .then(data => {
                pokemonDados(data.pokemon);
                details.style.display = 'block';
                
            })
            .catch(error => console.error(error));
    });
});

