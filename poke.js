const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const pokemonInput = document.getElementById('pokemonInput');
const card = document.getElementById('pokeCard');

//Colors to match Pokemon types
const typeColors = {
    fire: '#FDDFDF', grass: '#DEFDE0', electric: '#FCF7DE', water: '#DEF3FD',
    ground: '#f4e7da', rock: '#d5d5d4', fairy: '#fceaff', poison: '#98d7a5',
    bug: '#f8d5a3', dragon: '#97b3e6', psychic: '#eaeda1', flying: '#F5F5F5',
    fighting: '#E6E0D4', normal: '#F5F5F5'
};

searchBtn.addEventListener('click', () => {
    const pokemon = document.getElementById('pokemonInput').value.toLowerCase().trim();
    

    if (!pokemon) {
         alert("Please enter a name or ID");
         return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon not found! Try again.");
            return response.json();
        })
        .then(data => {
            // Outout Name
            document.getElementById('pokeName').innerText = data.name.toUpperCase();

            // Types String
                const typesArray = data.types.map(t => t.type.name);
                document.getElementById('pokeType').innerText = typesArray.join(' / ').toUpperCase();


            // Set Card Color Based on Pokemon Type
                const primaryType = typesArray[0];
                card.style.backgroundColor = typeColors[primaryType] || '#FFFFFF';
            
            
            // Pokemon Stats 
                // Convert Height
                 const meters = data.height / 10;
                 const inches = (meters * 39.37).toFixed(1);
                 document.getElementById('pokeHeight').innerText = `${meters} m / ${inches} in`;  
                 
                 // Convert Weight
                 const kg = data.weight / 10;
                 const lbs = (kg * 2.20462).toFixed(1);
                 document.getElementById('pokeWeight').innerText = `${kg} kg / ${lbs} lbs`; 


            // Show Image
                document.getElementById('pokeImage').src = data.sprites.front_default;
                card.classList.remove('hidden');
        })

        
        .catch(err => {
            alert(err.message);
            card.classList.add('hidden');
        });
});


clearBtn.addEventListener('click', () => {
    pokemonInput.value = '';    // Empty the text box
    card.classList.add('hidden');    // Hide the results card
    pokemonInput.focus();      // Put cursor in box for next search
});