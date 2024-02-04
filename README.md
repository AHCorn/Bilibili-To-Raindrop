<div align="center">

# 🚛 Bilibili-To-Raindrop

### **简体中文** / <a href="https://github.com/AHCorn/Bilibili-To-Raindrop/blob/main/README_EN.md"> English </a> 

导出哔哩哔哩收藏夹至 CSV 文件，以便转移至 Raindrop 或备份。

Export the Bilibili favorites folder to a CSV file for easy transfer to Raindrop or backup.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

</div>


## ⭐ 特性
1. 以更快的速度完成收藏夹的遍历及导出。
2. 自动过滤已失效视频内容。
3. 一键导出所有收藏夹的内容并分类。
4. 将导出后的收藏夹内容以 Raindrop 所要求格式完成编辑。
5. 任务完成后自动下载 CSV 文件。
<br>

## 💻 使用
油猴脚本尚在开发，发布后会以 .user.js 格式的脚本提交至仓库。

在哔哩哔哩收藏夹页面按下 F12，或右键网页选中检查，并将以下代码粘贴至浏览器控制台（console）中
```js
var delay = 2000; //等待时间
var gen = listGen();
var csvContent = "\uFEFF";
csvContent += "folder,title,url\n";

function getCSVFileName() {
    var userName = $("#h-name").text();
    return userName + "的收藏夹.csv";
}

function getFolderName() {
    return $("#fav-createdList-container .fav-item.cur a.text").text().trim();
}

function escapeCSV(field) {
    return '"' + String(field).replace(/"/g, '""') + '"';
}

function getVideosFromPage() {
    var results = [];
    var folderName = getFolderName().replace(/\//g, '\\'); // 替换 / 为 \ 避免 Raindrop 识别出错
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
    csvContent += getVideosFromPage() + '\n'; // 自动换行
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
        win.document.write('<a href="' + url + '" download="' + fileName + '">点击下载</a>');
        win.document.write('<script>document.querySelector("a").click();</script>');
        win.document.write('</body></html>');
        win.document.close();
    } else {
        alert('下载窗口被浏览器阻止，请先在设置里允许网页弹窗后重试。');
    }
}

changeList();

```
### 小贴士
如果您不需要自动过滤功能，直接删除 if title 部分即可。

如果出现刷新过快导致的问题，请将等待时常长修改为1000即可。

## ❤️ 感谢
原始获取代码来自于 [快速导出B站收藏单节目列表 - 鱼肉真好吃](https://www.cnblogs.com/toumingbai/p/11399238.html)

遍历所有收藏夹部分的代码来自于 [BiliBackup](https://github.com/sweatran/BiliBackup?tab=readme-ov-file)

本脚本针对导出至 Raindrop 的使用场景进行了优化。
