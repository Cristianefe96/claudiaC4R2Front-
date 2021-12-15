let urlBaseUser = "http://144.22.57.165:8096:8096/api/user";
$(document).ready(getUser);
function getUser() {
    $("#info").removeAttr("style");
    $.ajax({
        dataType: 'json',
        url: urlBaseUser + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;

            for (let i = 0; i < misItems.length; i++) {
                $("#allItemsUser").append("<tr>");
                $("#allItemsUser").append("<td>" + misItems[i].id + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].identification + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].name + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].address + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].cellPhone + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].email + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].password + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].zone + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].type + "</td>");
                $("#allItemsUser").append('<td><button class="btn btn-outline-danger" onclick="deleteUser(' + misItems[i].id + ')">Borrar Usuario</button>');
                $("#allItemsUser").append('<td><button class="btn btn-outline-info" onclick="getUserById(' + misItems[i].id + ')">Actualizar Usuario</button>');
                $("#allItemsUser").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getUserById(id) {
    console.log("Ver id: " + id);
    $("#actualizarUser").removeAttr("style");
    $("#tipousuario").attr("style", "display:none");
    $("#tipoproducto").attr("style", "display: none");
    $("#btncrearCliente").attr("style", "display: none");

    let opc = confirm('Recuerde que solo puede actualizar el nombre, edad y contraseña del cliente. / Remember that you just can update the client\'s name, age, password.');
    if (opc) {
        console.log("hola")
        $.ajax({
        dataType: 'json',
        url: urlBaseUser + "/" + id,
        type: "GET",
        headers: {
            "Content-Type": "application/json"
        },
            success: function (response) {
                console.log(response);

                    var item = response;
                    $('#idUser').val(item.id),
                    $('#identificationUser').val(item.identification),
                    $("#nameUser").val(item.name);
                    $("#addressUser").val(item.address);
                    $("#cellPhoneUser").val(item.cellPhone);
                    $("#emailUser").val(item.email),
                    $("#passwordUser").val(item.password);
                    $("#zoneUser").val(item.zone);
                    $("#typeUser").val(item.type);
                    var elemento = {
                    id: $('#id').val(item.id),
                    identification: $('#identificationUser').val(),
                    name: $("#nameUser").val(),
                    address: $("#addressUser").val(),
                    cellPhone: $("#cellPhoneUser").val(),
                    email: $("#emailUser").val(),
                    password: $("#passwordUser").val(),
                    zone: $("#zoneUser").val(),
                    type: $('#typeUser').val(item.type)
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}


function putUser() {
    console.log("ejecutando funcion para actualizar");
    var elemento = {
        id: $('#idUser').val(),
        identification: $('#identificationUser').val(),
        name: $("#nameUser").val(),
        address: $("#addressUser").val(),
        cellPhone: $("#cellPhoneUser").val(),
        email: $("#emailUser").val(),
        password: $("#passwordUser").val(),
        zone: $("#zoneUser").val(),
        type: $('#typeUser').val()
    };
    console.log(elemento);
    var dataToSend = JSON.stringify(elemento);
    if (camposLlenos(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar este Usuario?\n Are you sure that you want update this User?');
        if (opc) {
            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseUser + "/update",
                type: "PUT",
                success: function (response) {
                    console.log(response);
                    alert("¡Cliente editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}


function deleteUser(id) {
    console.log(id);
    let opc = confirm('¿Está seguro que desea eliminar este usuario?\n Are you sure that you want delete this user?');
    if (opc) {
        $.ajax({

            dataType: 'json',
            url: urlBaseUser + "/" + id,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{

                        alert('Se ha eliminado el usuario');
                        getUser();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function validarRegistro() {
    let user = {
        id: $("#idUser").val(),
        identification: $("#identificationUser").val(),
        name: $("#nameUser").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhoneUser").val(),
        email: $("#emailUser").val(),
        zone: $("#zoneUser").val(),
        type:$("#typeUser").val(),
        password: $("#passwordUser").val(),
    };
    console.log(user);
    if (camposLlenos(user)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(user),
            url: urlBaseUser + "/new",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        alert("Se registró el usuario correctamente, por seguridad indicale al usuario ingresar su correo electrónico y contraseña");
                        window.location.href = "Administrador.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor ingresa con su correo electrónico y contraseña");
                let opc = confirm('¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor verifica si el correo electrónico es el correcto y haz clic en Aceptar, de lo contrario haz clic en Cancelar y registrate con un correo electrónico y contraseña nuevos');
                    if (opc) {
                        window.location.href = "registrarUser.html";
                    } else {
                        email.focus();
                        return 0;
                    }
                window.location.href = "Administrador.html";
            }
        });
    }
}

function camposLlenos(user){
    const id= document.getElementById('idUser');
    console.log(id.value)
    const identification= document.getElementById('identificationUser');
    console.log(identification.value)
    const name = document.getElementById('nameUser');
    console.log(name.value)
    const address= document.getElementById('addressUser');
    console.log(address.value)
    const cellPhone= document.getElementById('cellPhoneUser');
    console.log(cellPhone.value)
    const email = document.getElementById('emailUser');
    console.log(email.value)    
    const zone= document.getElementById('zoneUser');
    console.log(zone.value)   
    const type= document.getElementById('typeUser');
    console.log(type.value)   
    const password = document.getElementById('passwordUser');
    console.log(password.value)
    
    if (id.value.length !=0 && identification.value.length !=0 && name.value.length !=0 && address.value.length !=0 && cellPhone.value.length !=0 && email.value.length !=0 && zone.value.length !=0 && type.value.length !=0 && password.value.length !=0){
        console.log("Campos Llenos");
        if(validarEmail()){
            console.log("campos OK");
            return true;
        }else{
            return false;
        }
        
    }else {
        if (id.value.length==0 && identification.value.length==0 && name.value.length==0 && address.value.length==0 && cellPhone.value.length==0 && email.value.length==0 && zone.value.length==0 && type.value.length==0 && password.value.length==0){
            alert("Recuerde que todos los campos son obligatorios, por favor escriba los datos del usuario");
            identification.focus();
            return false;
        }else{
            if (id.value.length==0){
                alert("Recuerde que todos los campos son obligatorios, por favor escriba el id del usuario.");
                id.focus();
                return false;
            }else{
                if (identification.value.length==0){
                    alert("Recuerde que todos los campos son obligatorios, por favor escriba su identificación.");
                    identification.focus();
                    return false;
                }else{
                    if (name.value.length==0){
                        alert("Recuerde que todos los campos son obligatorios, por favor escriba su nombre.");
                        name.focus();
                        return false;
                    }else{
                        if (address.value.length==0){
                            alert("Recuerde que todos los campos son obligatorios, por favor escriba su dirección.");
                            address.focus();
                            return false;
                        }else{
                            if (cellPhone.value.length==0){
                                alert("Recuerde que todos los campos son obligatorios, por favor escriba su número de teléfono celular.");
                                cellPhone.focus();
                                return false; 
                            }else{
                                if(email.value.length ==0){
                                    alert("Recuerde que todos los campos son obligatorios, por favor escriba su correo electrónico.");
                                    email.focus();
                                    return false;
                                }else {
                                    if(zone.value.length ==0){
                                        alert("Recuerde que todos los campos son obligatorios, por favor escriba la zona correspondiente.");
                                        zone.focus();
                                        return false;
                                    }else {
                                        if(type.value.length ==0){
                                            alert("Recuerde que todos los campos son obligatorios, por favor escriba el puesto del usuario.");
                                            type.focus();
                                            return false;
                                        }else {
                                            if(password.value.length ==0){
                                                alert("Recuerde que todos los campos son obligatorios, por favor escriba la contraseña.");
                                                password.focus();
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }   
                }
            }
        }
    }
}

function validarEmail(){
    const emailC = document.getElementById('emailUser');
    const expRegemail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    console.log("Ejecutandose la funcion validar Email")
    if (expRegemail.test(emailC.value)==false) {
        alert("Tiene que escribir un email válido")
        emailC.focus()
        return false;        
    }else{
        console.log("Email ok")  
        return true;  
    }
}

function validarPassword(){
    const passwordC = document.getElementById('passwordC');
    console.log(passwordC.value)
    const passwordCC = document.getElementById('passwordCC');
    console.log(passwordCC.value)
    console.log("Ejecutandose la funcion validar contraseñas")
    if (passwordC.value != passwordCC.value) {
        alert("Las contraseñas NO coinciden, por favor verifique su contraseña")
        mostrarPassword();
        mostrarPasswordVerification();
        passwordCC.focus()
        return 0;        
    }else{
        console.log("Password ok")  
        return true;  
    }
}

function mostrarPassword() {
    var cambio = document.getElementById("passwordC");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$(document).ready(function () { // CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});

function mostrarPasswordVerification() {
    var cambio = document.getElementById("passwordCC");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$(document).ready(function () { // CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});