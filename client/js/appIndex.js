function obtenerDataInicial() {
    let url = '/users/init'
    $.post(url, (response) => {
      $.each(response, function(i, user) {
        console.log(user);
      })
    })

    url = '/events/all'
    $.get(url, (response) => {
      $.each(response, function(i, user) {
        console.log(user);
      })
    })

}


obtenerDataInicial()
