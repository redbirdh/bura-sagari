var hanging = false;
$(function() {
    var INVERVAL = 800;
    var localState = "default";

    //var st = document.getElementById('statusBar');
    var test = 0;
    (function polling() {
        stateCheck();
        window.setTimeout(polling, INVERVAL);
    }());

    function stateCheck() {
        //st.innerHTML = localState;
        $.ajax({
            type : "GET",
            url : "getState",
            content : "application/json",
            dataType : "json",
        }).done(function(data) {
            localState = data["state"].sign;
            if (localState == "start" && hanging == false) {
                hanging = true;
                start();
            }else if (localState == "finish" && hanging == true){
                hanging = false;
                finish();
            }
            console.log("ajax : " + localState);
        }).fail(function(jqXHR, textStatus) {
            console.log("ajax ERROR");
            $("dd").text("error occured");
        });
    }
});
