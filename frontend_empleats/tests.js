var BASE_URL = "https://localhost:5001/api/empleats/";

// check this to enable CORS policy from same origin
// https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-3.1


function show_employees() {
    //alert("Me has dado click!");
    $.ajax({
        type: "GET",
        url: BASE_URL,
        //data: data,
        success:
        function (response) {
            alert("Ha funcionado");
            //var lab = document.getElementById("show_all");
            //lab.value = response;
        },
        error:
        function (error) {
            console.log(error);
        },
        dataType: "json"
    });
}

function new_employee() {
    var nom = document.getElementById("Name").value;
    var cognom = document.getElementById("Surname").value;
    var carrec = document.getElementById("Job").value
    var sou = document.getElementById("Salary").value;
    if (nom == "" || cognom == "" || carrec == "" || sou == ""){
        alert("Please, fill all the fields :)");
    }
    else{
        sou = parseFloat(sou);
        if (isNaN(sou)) sou = 0.0;
        console.log("sou: " + sou);
        var data = {
            "Name": nom,
            "Cognom": cognom,
            "Carrec": carrec,
            "Sou": sou
        };

        /*var data = {          // test data
            "Name": "hola",
            "Cognom": "hola2",
            "Carrec": "hola3",
            "Sou": 10.2
        };*/

        $.ajax({
            type: "POST",
            url: BASE_URL,
            data: data,
            success:
            function (response) {
                alert("Ha funcionado");
            },
            error:
            function (error) {
                console.log(error);
            },
            dataType: "json"
        });
    }
    
}