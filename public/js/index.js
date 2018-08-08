// When the user scrolls down 650px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
    $("#buttonScroll").css("display", "inline-block")
      .fadeIn("slow");
  } else {
    $("#buttonScroll").css("display", "none")
      .fadeOut("slow");
  }
}

// When the user clicks on the scroll up button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}