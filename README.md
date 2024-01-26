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
3. 将导出后的收藏夹内容以 Raindrop 所要求格式完成编辑。
4. 任务完成后自动下载 CSV 文件。
<br>

## 💻 使用
在哔哩哔哩收藏夹页面按下 F12，或右键网页选中检查，并将以下代码粘贴至浏览器控制台（console）中
```js
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

```
### 小贴士
如果您不需要自动过滤功能，直接删除 if title 部分即可。

如果出现刷新过快导致的问题，请将等待时常长修改为1000即可。

## ❤️ 感谢
原始获取代码来自于 [快速导出B站收藏单节目列表 - 鱼肉真好吃](https://www.cnblogs.com/toumingbai/p/11399238.html)，本脚本针对导出至 Raindrop 的使用场景进行了优化。

如果您需要以文本方式备份整个B站收藏夹，也可使用这个开源项目：[BiliBackup
](https://github.com/sweatran/BiliBackup?tab=readme-ov-file)
