function escapeCSV(field) {
    return '"' + String(field).replace(/"/g, '""') + '"'; 
}

function get_list() {
    var results = [];
    $(".fav-video-list > li > a.title").each(function() {
        var title = $(this).text().replace(/,/g, ''); 
        if (title !== "已失效视频") {  //自动过滤已失效视频
            var url = 'https:' + $(this).attr("href");
            results.push(escapeCSV(title) + "," + escapeCSV(url)); 
        }
    });
    return results.join('\n');
}

var csvContent = "\uFEFF"; 
csvContent += "title,url\n"; 

function main() {
    csvContent += get_list() + '\n';
    if ($(".be-pager-next:visible").length == 0) {
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);

        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "my_favorites.csv");
        document.body.appendChild(link);

        link.click();
    } else {
        $(".be-pager-next").click();
        setTimeout(main, 100); //等待时长，默认为 100，若因刷新太快导致问题，请自行修改为 1000 或更长。
    }
}

main();
