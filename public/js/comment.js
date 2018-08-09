$(".addBtn").on("click", function(e){
  e.preventDefault();
  
  var textToPass = {
    text: $("#comment").val()
  };

  $.ajax("/new/comment", {
    method: "POST",
    data: textToPass
  });
});