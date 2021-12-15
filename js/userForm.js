let urlBase = "http://144.22.57.165:8096/api/user";
function saveUser() {
    let data = {
        identification: $("#identificationUser").val(),
        name: $("#nameUser").val(),
        birthday: $("#birthDayUser").val(),
        monthBirthtDay: $("#monthBirthtDayUser").val(),
        address: $("#addressUser").val(),
        cellPhone: $("#cellPhoneUser").val(),
        email: $("#emailUser").val(),
        password: $("#passwordUser").val(),
        zone: $("#zoneUser").val(),
        type: $("#typeUser").val(),
    };

    console.log(user);

    if (camposLlenos(user)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(user),
            url: urlBase + "/new",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        alert("Se registró el usuario correctamente, por seguridad ingresa nuevamente su correo electrónico y contraseña");
                        window.location.href = "login.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor ingresa con su correo electrónico y contraseña");
                let opc = confirm('¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor verifica si ese es tu correo electrónico y haz clic en Aceptar, de lo contrario haz clic en Cancelar y registrate con un correo electrónico y contraseña nuevos');
                    if (opc) {
                        window.location.href = "registrar.html";
                    } else {
                        email.focus();
                        return 0;
                    }
                window.location.href = "login.html";
            }
        });
    }
};