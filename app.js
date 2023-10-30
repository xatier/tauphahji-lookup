/* eslint-disable no-unused-vars */
chrome.contextMenus.create({
    title: 'Liām hōo lín-pē thiann "%s" on 臺語媠聲',
    contexts: ['selection'],
    onclick: function (info, tab) {
        var url =
            'https://suisiann.ithuan.tw/講/' +
            encodeURIComponent(info.selectionText)
        chrome.tabs.create({ url: url, index: tab.index + 1 })
    },
})

// https://stackoverflow.com/a/59786665
const allVoicesObtained = new Promise(function (resolve, reject) {
    let voices = speechSynthesis.getVoices()
    if (voices.length !== 0) {
        resolve(voices)
    } else {
        speechSynthesis.addEventListener('voiceschanged', function () {
            voices = speechSynthesis.getVoices()
            resolve(voices)
        })
    }
})

// https://twitter.com/bcrypt/status/1500348547887079424
const speakIn = async (text, lang, name) => {
    const voices = await allVoicesObtained
    const u = new SpeechSynthesisUtterance(text)

    // to pick a new voice
    // console.log('available voices')
    // console.log(voices.filter((v) => v.lang === lang))

    u.lang = lang
    u.voice = voices.filter((v) => v.lang === lang && v.name.includes(name))[0]
    speechSynthesis.speak(u)
}

;[
    ['English', 'en-US', 'Microsoft Aria Online'],
    ['日本語', 'ja-JP', 'Microsoft Nanami Online'],
    ['中文', 'zh-TW', 'Microsoft HsiaoChen Online'],
    ['廣東話', 'zh-HK', 'Microsoft HiuGaai Online'],
].forEach(([lang, code, name]) => {
    chrome.contextMenus.create({
        title: `Speak in ${lang}`,
        contexts: ['selection'],
        onclick: async function (info, tab) {
            speakIn(info.selectionText, code, name)
        },
    })
})
