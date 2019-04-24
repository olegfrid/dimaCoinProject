$(document).ready(function () {
    $('#homeButton').on('click', function() {
        getAll();
      })
    $('#liveReportButton').on('click', function() {
        $('#results').load("../html/liveReport.html");
        console.log(checkedCoins);
        start();
      })
    getAll();
});
