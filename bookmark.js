$(document).ready(function(){
var DATABASE = "Inohi7Atib34";
// Check browser support
if (typeof(Storage) !== "undefined") {
    allStorage();
}
else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}


$('#save').click(function(e){

    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store

        if($('#normal').is(":checked")){
            databaseID = 'normalID';
        } else {
            databaseID = 'importantID';
        }
        var name = $('#name').val();

        var bookmark = $('#bookmark').val();

        if(name === '' || bookmark === ''){
            return;
        }
        var id = name;

        var data = JSON.parse(localStorage.getItem(DATABASE));

        if(data == null) {
            var data = [];
            var newItem = {id: id, bookmark: bookmark, databaseID:databaseID}
            data.push(newItem);
        }
        else{
          var newItem = {id: id, bookmark: bookmark, databaseID:databaseID}
          data.push(newItem);
        }

        localStorage.setItem(DATABASE, JSON.stringify(data));

        clearInput();
        allStorage();
    }
    else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
});

$('#remove').click(function(e){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        //localStorage.clear();
        var obj = localStorage.getItem(DATABASE);
        var data = JSON.parse(obj);
        var name = $('#name').val();
        localStorage.removeItem(name);
        var i;
        for(i = 0; i < data.length; i++){
          if(data[i].id === name){
              data.splice(i,1);
          }
        }
        localStorage.setItem(DATABASE, JSON.stringify(data));
        allStorage();
        clearInput();
    }
    else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
});

function allStorage() {
    var obj = localStorage.getItem(DATABASE);
    var items = JSON.parse(obj);
    $('#normalID').html("");
    $('#importantID').html("");
    for(i in items){
      if(items[i].databaseID == "normalID"){
          setItem("#normalID",items[i].id, items[i].bookmark);
      } else{
          setItem("#importantID",items[i].id, items[i].bookmark);
      }
      console.log(items[i])

    }

}

function setItem(place, id, bookmark) {
  $(place).append("<span>" + id + ": </span>");
  $(place).append('<a target="_blank" href="' + bookmark + '">' + bookmark + '</a><br>');
}

function clearInput(){
  $('#name').val('');
  $('#bookmark').val('');
}

})
