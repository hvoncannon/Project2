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


$("#post-submit").on("click", function(event) {
  event.preventDefault();
  console.log("test");
  // var newPost = {
  //   title: $("#post-title").val().trim(),
  //   text: $("#post-text").val().trim(),
  //   category: $("#dropdown-menu").val()
  // };
  // $.ajax("/new/post", {
  //   type: "POST",
  //   data: newPost
  // }).then(function (res) {
  //   console.log(res);
  // }
  // );
  // $.post("/new/post", newPost);
  // console.log(newPost);
});
