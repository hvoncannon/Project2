$("#buttonBold").on("click", function() {
  document.execCommand("bold", false, null);
});
$("#buttonItalic").on("click", function() {
  document.execCommand("italic", false, null);
});
$("#buttonUnderline").on("click", function() {
  document.execCommand("underline", false, null);
});
$("#buttonStrike").on("click", function() {
  document.execCommand("strikethrough", false, null);
});
$("#buttonHyperlink").on("click", function() {
  document.execCommand("createLink", false, null);
});
$("#buttonOrderedList").on("click", function() {
  document.execCommand("insertOrderedList", false, null);
});
$("#buttonUnorderedList").on("click", function() {
  document.execCommand("insertUnorderedList", false, null);
});
// $(".fontValues").on("click", function() {
//   var grabFont = $(this).val();
//   console.log(grabFont);
//   document.execCommand("insertFontSize", false, grabFont);
// });

$("#submit").on("submit", function(event) {
  event.preventDefault();

  var newPost = {
    title: $("#post-title")
      .val()
      .trim(),
    description: $("#post-description")
      .val()
      .trim(),
    category: $("#dropdown-menu").val()
  };
  // Send the POST request.
  $.ajax("/", {
    type: "POST",
    data: newPost
  }).then(function(res) {
    console.log(res);
    // Reload the page to get the updated list
    location.reload("/");
  });
});
