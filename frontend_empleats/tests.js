var BASE_URL = "https://localhost:5001/api/empleats";
//var BASE_URL = "http://localhost:5000/api/empleats";

// check this to enable CORS policy from same origin
// https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-3.1


function show_employees() {
    //alert("Me has dado click!");
    $.ajax({
        type: "GET",
        url: BASE_URL,
        //data: data,
        success:
        //complete: // mostra molta mes info que el success (inclou: dades enviades...)
        function (response) {
            //alert("Ha funcionado");
            var json = JSON.stringify(response);
            //console.log("JSON: "+json);
            document.getElementById("show_all").innerHTML = json;
        },
        error:
        function (error) {
            console.log(error);
            alert("El servidor no està actiu.");
        },
        dataType: "json"
    });
}

function clear_fields() {
    document.getElementById("Name").value = "";
    document.getElementById("Surname").value = "";
    document.getElementById("Job").value = "";
    document.getElementById("Salary").value = "";
}

function new_employee() {
    var nom = document.getElementById("Name").value;
    var cognom = document.getElementById("Surname").value;
    var carrec = document.getElementById("Job").value;
    var sou = document.getElementById("Salary").value;
    if (nom == "" || cognom == "" || carrec == "" || sou == ""){
        alert("Please, fill all the fields :)");
    }
    else{
        sou = parseFloat(sou);
        if (isNaN(sou)) sou = 0.0;
        //console.log("sou: " + sou);
        var data = {
            "Nom": nom,
            "Cognom": cognom,
            "Carrec": carrec,
            "Sou": sou
        };

        /*var data = {          // test data
            "Nom": "hola",
            "Cognom": "hola2",
            "Carrec": "hola3",
            "Sou": 10.2
        };*/

        $.ajax({
            type: "POST",
            url: BASE_URL,
            data: JSON.stringify(data),
            complete:
            function (response) {
                var json = JSON.stringify(response);
                console.log("JSON: "+json);
            },
            success:
            function (response) {
                var json = JSON.stringify(response);
                console.log("JSON: "+json);
                alert("Ha funcionado!\n"+json);
            },
            error:
            function (error) {
                console.log(error);
            },
            dataType: "json",
            headers: {                              // sense dona 415
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    
}