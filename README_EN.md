<div align="center">

# 🚛 Bilibili-To-Raindrop

### <a href="https://github.com/AHCorn/Bilibili-To-Raindrop"> **简体中文** </a>  /  English 

Export the Bilibili favorites folder to a CSV file for easy transfer to Raindrop or backup.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

</div>

## ⭐ Features
1. Traverse and export favorites faster.
2. Automatically filter out invalid video content.
3. Edit the exported favorites content in the format required by Raindrop.
4. Automatically download the CSV file upon task completion.
<br>

## 💻 Usage
Press F12 on the Bilibili favorites page, or right-click the webpage and select inspect, then paste the following code into the browser console (console)

```js
var delay = 2000; // Waiting time
var gen = listGen();
var csvContent = "\uFEFF";
csvContent += "folder,title,url\n";

function getCSVFileName() {
    var userName = $("#h-name").text();
    return userName + "'s Favorites.csv";
}

function getFolderName() {
    return $("#fav-createdList-container .fav-item.cur a.text").text().trim();
}

function escapeCSV(field) {
    return '"' + String(field).replace(/"/g, '""') + '"';
}

function getVideosFromPage() {
    var results = [];
    var folderName = getFolderName().replace(/\//g, '\\'); // Replace / with \
    $(".fav-video-list > li > a.title").each(function() {
        var title = $(this).text().replace(/,/g, '');
        if (title !== "已失效视频") {
            var url = 'https:' + $(this).attr("href");
            results.push(escapeCSV(folderName) + ',' + escapeCSV(title) + ',' + escapeCSV(url));
        }
    });
    return results.join('\n');
}

function processVideos() {
    csvContent += getVideosFromPage() + '\n'; // Add a newline after each page of videos
    if ($(".be-pager-next:visible").length == 0) {
        setTimeout(changeList, delay);
    } else {
        $(".be-pager-next").click();
        setTimeout(processVideos, delay);
    }
}

function* listGen() {
    for (var list of $("#fav-createdList-container .fav-item a").get()) {
        yield list;
    }
}

function changeList() {
    var list = gen.next().value;
    if (list) {
        list.click();
        setTimeout(processVideos, delay);
    } else {
        downloadCSV();
    }
}

function downloadCSV() {
    var fileName = getCSVFileName();
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);

    var win = window.open();
    if (win) {
        win.document.open();
        win.document.write('<html><body>');
        win.document.write('<a href="' + url + '" download="' + fileName + '">Click to download.</a>');
        win.document.write('<script>document.querySelector("a").click();</script>');
        win.document.write('</body></html>');
        win.document.close();
    } else {
        alert('The download window is blocked by the browser. Please enable pop-ups in the settings and try again.');
    }
}

changeList();

```

### Tips
If you do not need the automatic filtering feature, simply delete the if title part.

If the refresh is too fast and causes issues, adjust the waiting duration to 1000.

## ❤️ Thanks
The original fetching code comes from [快速导出B站收藏单节目列表 - 鱼肉真好吃](https://www.cnblogs.com/toumingbai/p/11399238.html). 

This script has been optimized for use cases involving export to Raindrop.

If you need to backup your entire Bilibili favorites folder in text format, you can also use this open-source project: [BiliBackup](https://github.com/sweatran/BiliBackup?tab=readme-ov-file)
