function logar(){
    var email = document.getElementById("email");
    var password = document.getElementById("senha");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((user) => {
        localStorage.setItem('id', firebase.auth().currentUser.email);
        window.location="/pages/listaProblemas/lista.html";   
    })
    .catch((error) => { 
        var errorCode = error.code; 
        var errorMessage = error.message;
        Swal.fire(errorMessage);
    });

}



//const pass_field = document.getElementsByClassName("password");
//const show_btn = document.getElementById("eye");

//alert(pass_field);

/*
document.getElementById('eye').addEventListener("click", function(){
    if(pass_field.type === "password"){
        pass_field.type = "text";
    }else{
        //pass_field.type = "password";
    }
});*/