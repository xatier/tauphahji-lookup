chrome.contextMenus.create({
    "title": "Liām hōo lín-pē thiann \"%s\" on 鬥拍字.意傳.台灣",
    "contexts": ['selection'],
    "onclick": function (info, tab) {
        var url = 'https://鬥拍字.意傳.台灣/講/'
            + encodeURIComponent(info.selectionText)
        chrome.tabs.create({ url : url });
    }
});
