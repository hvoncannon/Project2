$(".momentjs").each(function(k) {
  var that = moment($(this).text());
  $(this).text(that.format("MMMM Do YYYY, h:mm:ss a"));
});