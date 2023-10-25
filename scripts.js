

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('formSelect');
    const divDados = document.getElementById('pokeDados')

    function pokemonDados (pokemon) {
        nome = pokemon.nome.toUpperCase(0);
        const imgPokemon = pokemon.img;
        numero = pokemon.numero;
        altura = pokemon.altura;
        peso = pokemon.peso;
        tipo = pokemon.tipo;
        geracao = pokemon.geracao;
        // const types = pokemon.tipo.split(',');

        divDados.innerHTML = `
        <h2 id="nomePokemon">${nome} - #${numero}</h2>
        <img id="imgPokemon" src="${imgPokemon}" alt="Imagem do Pokémon">
        <p><b>Altura: ${altura} cm</b></p>
        <p><b>Peso: ${peso} kg</b></p>
        <p><b>Geração: ${geracao} </b></p>
        <p><b>Tipo: ${tipo}</b>`;

        
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

