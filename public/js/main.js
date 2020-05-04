/*  Tutorial videos v1: https://www.youtube.com/watch?v=LHKu6oDyZwg&feature=youtu.be 
                    https://www.youtube.com/watch?v=LNGNJa0bCV8&feature=youtu.be 
                    
                    v2_FIREBASE: https://www.youtube.com/watch?v=LNGNJa0bCV8&feature=youtu.be*/

const app = new Vue({
    el: '#app',

    data: {
        user: '',
        token: '',
        error: {},
        // Get a reference to the database service
        database: firebase.database(), // se la pasamos a calc.js como prop "db"
        calcHistory: []
    },
    methods: {
        login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                /* recordar que dentro de una funcion "then", es como si estuvieramos fuera de Vue, por lo que hay que usar app.etc en vez de this.etc */
                app.token = result.credential.accessToken;
                // This gives you a Google Access Token. You can use it to access the Google API.
                app.user = result.user;
                // The signed-in user info.
                app.database.ref('/calc/' + app.user.uid).on("child_added", function(data) {
                    //turn on listener of database changes and add them every time a child is added
                    app.calcHistory.push(data.val())
                });

            }).catch(function(error) {
                // Handle Errors here.
                app.error = error;
                // ...
            });
        },
        logout() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                app.user = '';
                app.token = '';
                app.calcHistory = [];
            }).catch(function(error) {
                // An error happened.
                app.error = error;
            });
        }
    }
});