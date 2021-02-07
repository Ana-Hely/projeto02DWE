function createUser(){
    event.preventDefault();
    //var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("senha").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        Swal.fire("Usuário criado com sucesso!");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire(errorMessage);
    });
}

// const storeUser = (event) => {
//     //event.preventDefault();
//     let nome = document.getElementById("nome").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("senha").value;

//     db.collection("User").add({
//         userNome: nome,
//         userEmail: email,
//         password: password
//     })
//     .then(function (docRef) {
//         Swal.fire("Usuário criado com sucesso!");
//     })
//     .catch(function (error){
//         Swal.fire("Erro ao cadastrar o usuário: ", error.message);
//     });

// }