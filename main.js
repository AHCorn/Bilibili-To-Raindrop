(function() {
    var csvContent = "\uFEFFtitle,url\n"; 
    var delay = 1000;  //等待时间，可自行修改以加快速度

    function escapeCSV(field) {
        return '"' + String(field).replace(/"/g, '""') + '"';
    }

    function collectData() {
        $(".fav-video-list > li > a.title").each(function() {
            var title = $(this).text().replace(/,/g, '');
            if (title !== "已失效视频") {
                var url = 'https:' + $(this).attr("href");
                csvContent += escapeCSV(title) + "," + escapeCSV(url) + "\n";
            }
        });
    }

    function processPage() {
        collectData();

        if ($(".be-pager-next").length > 0 && $(".be-pager-next").is(":visible")) {
            $(".be-pager-next").click();
            setTimeout(processPage, delay);
        } else {
            downloadCSV();
        }
    }

    function downloadCSV() {
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var dataWindow = window.open("", "_blank");

        dataWindow.document.write('<a href="' + url + '" download="bilibili_favorites.csv">Download CSV</a>');
        dataWindow.document.querySelector('a').click();
    }

    processPage();
})();
