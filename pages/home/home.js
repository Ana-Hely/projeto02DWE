var files = [];

function escolherImg() {
    var reader;
    var input = document.createElement('input');
    input.type = 'file';
    input.click();
    
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("imgPreview").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
        /*ref = firebase.storage().ref().child('kenitikataoka.png');
        ref.put(reader).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });*/
        document.getElementById('foto').value = files[0].name;
    }
    input.click;
}

function uploadImagem() {
    var storageRef = firebase.storage().ref();

    var imgName = document.getElementById("foto").value;
    var upload = storageRef.child("images/" + imgName).put(files[0]);
    
}


function cadastrar() {
    event.preventDefault();
    uploadImagem();
    let local = document.getElementById("local").value;
    let foto = document.getElementById("foto").value;
    let desc = document.getElementById("descricao").value;

    if(local.length > 0 && desc.length > 0){
        if(local.length < 100){
            if(desc.length < 500){
                db.collection("Problems").add({
                    idUsuario: localStorage.getItem('id'),
                    local: local,
                    foto: foto,
                    desc: desc,
                    status: 'aguardando resposta',
                    resposta: ''

                })
                .then(function (docRef) {
                    Swal.fire("Problema cadastrado com sucesso!");
                })
                .catch(function (error){
                    Swal.fire("Erro ao cadastrar: ", error.message);
                });
            }else {
                Swal.fire("A descrição ultrapassou o limite de caracteres!");
            }
        }else{
            Swal.fire("O local ultrapassou o limite de caracteres!");
        }        
    }else{
        Swal.fire("Os campos Local e Descrição devem estar preenchidos!");
    }

}


/*window.onload = getUser;

function getUser(){
    var user = firebase.auth().currentUser.uid;
    //alert(user);
    event.preventDefault();
    document.getElementById("email").innerHTML = user;
}*/

/*function abrirMenu() {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('conteudo').style.marginLeft = '250px';
}

function fecharMenu() {
    document.getElementById('menu').style.width = '0px';
    document.getElementById('conteudo').style.marginLeft = '0px';
}*/

