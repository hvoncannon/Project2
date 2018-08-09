$("#submitCat").on("click", function(event) {
  event.preventDefault();
  console.log("!!!!!!!!!Test");
  var newCategory = {
    categoryName: $("#categoryName").val().trim(),
    categoryDescription: $("#categoryDescription").val().trim(),
  };
    // Send the POST request.
  $.ajax("/new/category", {
    type: "POST",
    data: newCategory
  }).then(function(res) {
    console.log(res);
    window.location.replace("/");
    // Reload the page to get the updated list
    // location.reload("/");
  });
});
  