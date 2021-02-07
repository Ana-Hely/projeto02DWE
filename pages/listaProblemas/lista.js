window.onload = loadPage;

function loadPage(){
    if(!localStorage.getItem('id')){
        tipo = 0
        hideButton('btnPerfil');
        hideButton('btnCadastro');
        hideButton('btnListar');
        hideButton('btnSair');    

        listaHeader = ['descricao', 'local', 'foto', 'status', 'resposta'];
        listProblems(tipo, listaHeader);        
    }
    else if(localStorage.getItem('id') == 'governo@gov.com'){
        tipo = 1;
        hideButton('btnLogar');
        hideButton('btnCadastro');
        hideButton('btnPerfil');  
        hideButton('btnListar');    

        listaHeader = ['descricao', 'local', 'foto', 'status', 'resposta', 'editar', 'apagar'];
        listProblems(tipo, listaHeader);
    }
    else if(localStorage.getItem('id')){
        tipo = 2;
        hideButton('btnLogar');    

        listaHeader = ['descricao', 'local', 'foto', 'status', 'resposta', 'editar', 'apagar'];
        listProblems(tipo, listaHeader);
    }

    document.getElementById('btnSair').addEventListener('click', () => {
        localStorage.setItem('id', null);
    })
}

function hideButton(id) {
    document.getElementById(id).style.display='none';
    document.getElementById(id).style.visibility='hidden';
}

function listProblems(tipo, lista) {
    let tabela = document.getElementById("table");
    let numLinha = tabela.rows.length;
    let linha = tabela.insertRow(numLinha);
    linha.className = "linhaB";
    i = 0;
    lista.forEach((head) => {
        let col = linha.insertCell(i);
        col.innerHTML = head;       
        i++;
    });
    let select = '';
   
    if(tipo == 2){
        db.collection("Problems").where("idUsuario", "==", localStorage.getItem('id')).get().then(function(querySnapshot) {    
            querySnapshot.forEach(function(doc) {
                let numLinha = tabela.rows.length;
                linha = tabela.insertRow(numLinha);
                linha.className = "linhaA";

                let col = linha.insertCell(0);
                col.innerHTML = "<input type='hidden' value='"+doc.id+"'></input>";
                col.style.display='none';
                col.style.visibility='hidden';

                for(let j=0; j<lista.length+1; j++){
                    
                    if(lista[j] == "descricao"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = '<textarea cols="25" rows="7" disabled>'+doc.data().desc+'</textarea>';
                    }
                    if(lista[j] == "local"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = '<textarea cols="25" rows="7" disabled>'+doc.data().local;+'</textarea>';
                    }
                    if(lista[j] == "foto"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = "<img id='"+doc.id+"' style='width: 290px; height: 200px; border-style: solid;'>";//doc.data().foto;
                        loadImgByName(doc.data().foto, doc.id);
                    }
                    if(lista[j] == "status"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = '<select disabled><option>'+doc.data().status+'</option></select>';
                    }
                    if(lista[j] == "resposta"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = '<textarea cols="25" rows="7" disabled>'+doc.data().resposta+'</textarea>'; 
                    }
                    if(lista[j] == "editar"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = "<button class='edit' onClick='editFields(tipo, this)'></button>";
                        
                        // if(tipo == 1){
                        //     col = linha.insertCell(j+1);
                        //     col.innerHTML = "<button class='edit' onClick='editUser(tipo, this)'></button>";
                        // }
                        // else if(tipo == 2){
                        //     col = linha.insertCell(j+1);
                        //     col.innerHTML = "<button class='edit' onClick='editFields(tipo, this)'></button>";
                        // }                        
                    }
                    if(lista[j] == "apagar"){
                        col = linha.insertCell(j+1);
                        col.innerHTML = "<button class='delete' onClick='removeLinha(this)'></button>"; 
                    }
                }
            });
        });
    }else{
        select = db.collection("Problems").get();
    }
    
}

function editUser(linha) {
    var id = linha.parentNode.parentNode.cells[0].getElementsByTagName('input')[0].value;
    alert(id);
    localStorage.setItem('idProblem', id);
    window.location = '../editProblema/edit.html';
}

function editFields(tipo, linha){

    if(tipo==1){
        select = linha.parentNode.parentNode.cells[4].getElementsByTagName('select')[0];
        select.innerHTML = '<option>Analisando</option><option>Concluido</option><option>Aguardando Resposta</option>';
        select.disabled = false;

        resposta = linha.parentNode.parentNode.cells[5].getElementsByTagName('textarea')[0];
        resposta.disabled = false;
    }
    else if(tipo==2){
        descricao = linha.parentNode.parentNode.cells[1].getElementsByTagName('textarea')[0];
        descricao.disabled = false;

        local = linha.parentNode.parentNode.cells[2].getElementsByTagName('textarea')[0];
        local.disabled = false;

        foto = linha.parentNode.parentNode.cells[3];
        foto.innerHTML = '<button type="button" onclick="escolherImg()">Escolher Imagem</button>'
    }
    salvar = linha.parentNode.parentNode.cells[6];
    salvar.innerHTML = '<button class="edit" onClick="editFields(tipo, this)">Salvar</button>';
}

function removeLinha(linha) {
    var i = linha.parentNode.parentNode;
    //document.getElementById('table').deleteRow(i.rowIndex);    
    var id = i.cells[0].getElementsByTagName('input')[0].value;

    event.preventDefault();
    db.doc('Problems/'+id).delete().then(function () {
        Swal.fire("problema deletado");
    }).catch(function(error){
        Swal.fire("erro ao tentar excluir: ", error);
    })    
}

function listProblem(event) {
    event.preventDefault();

    var query = db.collection("problems").where("local", "==", "Jundiaí");
    console.log(query);
}

function loadImgByName(name, id){
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangRef = storageRef.child('images/' + name);
    tangRef.getDownloadURL().then(function(url){
        document.getElementById(id).src = url;
    });
}

