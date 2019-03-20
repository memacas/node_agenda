function obtenerDataInicial() {
    let url = '/users/init'
    //let url = '/';
    $.post(url, (response) => {
        console.log(response)
    })
    /*
    url = '/events/all'
    $.get(url, (response) => {
      $.each(response, function(i, user) {
        console.log(user);
      })
    })
    */

}


obtenerDataInicial()
