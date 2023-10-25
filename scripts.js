

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('formSelect');
    const divDados = document.getElementById('pokeDados')

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
        // const types = pokemon.tipo.split(',');

        divDados.innerHTML = `
       
        <h2 id="nomePokemon">${nome} - #${numero}</h2>
        <img id="imgPokemon" src="${imgPokemon}" alt="Imagem do Pokémon">

        <div id=Informacoes>
        <div id="dadosBasicos">
        <div id="colunaUm"><p><b>${altura} cm</b></p>
        <p><b>${peso} kg</b></p></div>
        <div id="colunaDois">
            <p><b>Geração ${geracao} </b> <p>${pokemon.tipo}</p>
        </p></div>
        </div>

        <img class="imgTipo" src="images/${pokemon.tipo}.svg">
       
        <table id="dadosCombate">
       
        <tr>
        <td>hpatk: ${atk}</td>
        <td>hpdef: ${def}</td>
        <td>hp:${hp}</td>
        </tr>

        <tr>
        <td>spatk: ${spatk}</td>
        <td>spdef: ${spdef}</td>
        <td>speed: ${speed}</td>
        </tr>
        
        </table>

        "evolucoes": "${evolutions}"
    </div>
    `;

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

