$( document ).ready(function() {
    $('#add-pokemon').click(function(){
        var pokemonName = $('#pokemon').val();
        if(pokemonName) {
            firebase.database().ref('pokemons').push({
                name: pokemonName
            });
            $('#pokemon').val('');
        }
    });

    firebase.database().ref('pokemons').on('value', function(snapshot) {
        $('#pokemon-list').empty();

        var pokemons = snapshot.val();
        for(var pokemon in pokemons) {
            $('#pokemon-list').append('<li>'+pokemons[pokemon].name+'</li>');
        }
        console.log(snapshot.val());
    });
});

