$(".addBtn").on("click", function(e){
  e.preventDefault();
  
  var textToPass = {
    text: $("#comment").val(),
    id: $(".addBtn").attr("data-value")
  };

  $.ajax("/new/comment", {
    method: "POST",
    data: textToPass,
  }).then(function() {
    window.location.reload();
  });
});