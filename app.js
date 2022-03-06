/* eslint-disable no-unused-vars */
chrome.contextMenus.create({
    title: 'Liām hōo lín-pē thiann "%s" on 臺語媠聲',
    contexts: ['selection'],
    onclick: function (info, tab) {
        var url =
            'https://suisiann.ithuan.tw/講/' +
            encodeURIComponent(info.selectionText)
        chrome.tabs.create({ url: url })
    },
})

// https://twitter.com/bcrypt/status/1500348547887079424
const speakIn = (text, lang) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    speechSynthesis.speak(u)
}

;[
    ['English', 'en-US'],
    ['日本語', 'ja-JP'],
    ['中文', 'zh-TW'],
    ['廣東話', 'zh-HK'],
].forEach(([lang, code]) => {
    chrome.contextMenus.create({
        title: `Speak in ${lang}`,
        contexts: ['selection'],
        onclick: function (info, tab) {
            speakIn(info.selectionText, code)
        },
    })
})
