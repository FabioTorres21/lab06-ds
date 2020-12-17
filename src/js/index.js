// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCCNhMaFS5cg6XeCgwX7pQVeQUk4Uf6yz8",
    authDomain: "lab6ds.firebaseapp.com",
    projectId: "lab6ds",
    storageBucket: "lab6ds.appspot.com",
    messagingSenderId: "448575868263",
    appId: "1:448575868263:web:e4a67818c380ec737073c2",
    measurementId: "G-M714DKBMFC"
}

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var idUser;

function valida() {
    var user = document.getElementById("inputUser").value;
    var pass = document.getElementById("inputPassword").value;

    var docRef = db.collection("usuarios").where("login","==",user);

    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            iduser = doc.id;
            db.collection("usuarios").doc(iduser).get().then(function(doc1) {
                const user = doc1.data();
                var claveDb = user.clave;
                var tipoDb = user.tipo;
                if (claveDb == pass) {
                    if (tipoDb == "profesor") {
                        location.href = `profesor.html`;
                    } if (tipoDb == "profesor") {
                        location.href = `alumno.html`;
                    }
                } else {
                    alert("User or password incorret, try again")
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
        });
    })
    .catch(function(error) {
        alert("User or password incorret, try again");
    });
}


function newUser() {
    var name = document.getElementById("inputName").value;
    var user = document.getElementById("inputUser").value;
    var code = document.getElementById("inputCode").value;
    var type = document.getElementById("inputType").value;
    var pass = document.getElementById("inputPassword").value;
    var passConf = document.getElementById("inputConfirmPassword").value;

    if (pass != passConf) {
        alert("Passwords don't match");
    } else {
        if (type == "-- Seleccionar --") {
            alert("Select a valid User Type");
        } else {
            // Add a new document with a generated id.
        db.collection("usuarios").add({
            nombres: name,
            login: user,
            codigo: code,
            clave: pass,
            tipo: type
        })
        .then(function(docRef) {
            alert("User successfully created!")
            document.getElementById("inputName").value = '';
            document.getElementById("inputUser").value = '';
            document.getElementById("inputCode").value = '';
            document.getElementById("inputType").value = '-- Seleccionar --';
            document.getElementById("inputPassword").value = '';
            document.getElementById("inputConfirmPassword").value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        }
        
    }
    
}