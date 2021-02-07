

function deletar(event){    
    var user = firebase.auth().currentUser;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

      }).then((result) => {

        if (result.isConfirmed) {
            user.delete().then(function(){
                Swal.fire(
                    'Deletada!',
                    'Sua conta foi removida',
                    'success'
                )
            }).catch(function(error){
                var errorCode = error.code; 
                var errorMessage = error.message;
                Swal.fire(errorMessage);
            });  
            window.location="/index.html";
        }
      })

}