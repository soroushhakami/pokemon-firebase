$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $('#loginStatus').text('user is logged in');
        } else {
            $('#loginStatus').text('user is logged out');
        }
    });

    $('#add-pokemon').click(function () {
        var pokemonName = $('#pokemon').val();
        if (pokemonName) {
            firebase.database().ref('pokemons').push({
                name: pokemonName
            });
            $('#pokemon').val('');
        }
    });

    firebase.database().ref('pokemons').on('value', function (snapshot) {
        $('#pokemon-list').empty();

        var pokemons = snapshot.val();
        for (var pokemon in pokemons) {
            $('#pokemon-list').append('<li>' + pokemons[pokemon].name + '</li>');
        }
    });

    $('#login').click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });

    $('#logout').click(function () {
        firebase.auth().signOut().then(function () {
            console.log('signed out');
        }, function (error) {
            // An error happened.
        });
    })


});

