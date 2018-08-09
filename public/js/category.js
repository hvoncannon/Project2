$("#submitCat").on("click", function(event) {
  event.preventDefault();
  console.log("!!!!!!!!!Test");
  console.log($("#categoryName").val());
  var categoryName = $("#categoryName").val().trim();
  var categoryDescription = $("#category-description").val().trim();
  var newCategory = {
    categoryName: categoryName,
    categoryDescription: categoryDescription,
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
  