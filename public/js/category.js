$("#submit").on("submit", function(event) {
  event.preventDefault();
  
  var newCategory = {
    categoryName: $("#categoryName").val().trim(),
    categoryRules: $("#categoryRules").val().trim(),
  };
    // Send the POST request.
  $.ajax("/new/category", {
    type: "POST",
    data: newCategory
  }).then(function(res) {
    console.log(res);
    // Reload the page to get the updated list
    location.reload("/");
  });
});
  