/* eslint-disable no-unused-vars */
chrome.contextMenus.create({
    "title": "Liām hōo lín-pē thiann \"%s\" on 臺語媠聲",
    "contexts": ['selection'],
    "onclick": function (info, tab) {
        var url = 'https://suisiann.ithuan.tw/講/'
            + encodeURIComponent(info.selectionText)
        chrome.tabs.create({ url : url });
    }
});
