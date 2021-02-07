function resetarSenha(event){
    var auth = firebase.auth();
    var emailAddress = document.getElementById("email").value;

    auth.sendPasswordResetEmail(emailAddress).then(function() { 
        Swal.fire("Email enviado!");
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire(errorMessage);
    })
}