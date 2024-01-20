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
function escapeCSV(field) {
    return '"' + String(field).replace(/"/g, '""') + '"'; 
}

function get_list() {
    var results = [];
    $(".fav-video-list > li > a.title").each(function() {
        var title = $(this).text().replace(/,/g, ''); 
        if (title !== "已失效视频") {  // Automatically filter out invalid videos
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
        setTimeout(main, 100); // Waiting duration, default is 100. If refresh is too fast causing issues, please adjust to 1000 or longer.
    }
}

main();
```

### Tips
If you do not need the automatic filtering feature, simply delete the if title part.

If the refresh is too fast and causes issues, adjust the waiting duration to 1000.

### ❤️ Thanks
The original fetching code comes from [快速导出B站收藏单节目列表 - 鱼肉真好吃](https://www.cnblogs.com/toumingbai/p/11399238.html). 

This script has been optimized for use cases involving export to Raindrop.

If you need to backup your entire Bilibili favorites folder in text format, you can also use this open-source project: [BiliBackup](https://github.com/sweatran/BiliBackup?tab=readme-ov-file)
