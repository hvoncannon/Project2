$(".upvoteButton").on("click", function () {
  var postId = {
    id: $(this).data("postid")
  };
  $.post("/upvote", postId).then(function () {
    window.location.reload();
  });
});

$(".downvoteButton").on("click", function () {
  var postId = {
    id: $(this).data("postid")
  };
  $.post("/downvote", postId).then(function () {
    window.location.reload();
  });
});