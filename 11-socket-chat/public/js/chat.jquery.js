var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


function renderizarUsuarios(personas){

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+params.get('sala')+'</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        const element = personas[i];
        
        html +='<li>';
        html +='    <a data-id="'+element.id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+element.nombre+' <small class="text-success">online</small></span></a>';
        html +='</li>';
    }

    html += '<li class="p-20"></li>';
    divUsuarios.html(html);

}

function renderizarMensaje(mensaje, yo){

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':'+fecha.getMinutes();
    
    if(yo){
        html += '<li class="animated fadeIn reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img">';
        html += '        <img src="assets/images/users/5.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }else{

        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-img">';
        html += '        <img src="assets/images/users/1.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-info">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }
    
    divChatbox.append(html);
    scrollBottom();
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsuarios.on('click','a', function(){
    var id = $(this).data('id');

    if(id){
        console.log(id);
    }
});

formEnviar.on('submit', function(e){
    e.preventDefault();

    if(txtMensaje.val().trim().length === 0){
       return; 
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val(),
    }, function(mensaje){
        txtMensaje.val("").focus();
        renderizarMensaje(mensaje,true);
    })
})
