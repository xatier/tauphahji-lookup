/* eslint-disable no-unused-vars */
chrome.contextMenus.create({
    id: `tauphahji-lookup`,
    title: 'Liām hōo lín-pē thiann "%s" on 臺語媠聲',
    contexts: ['selection'],
})

const SEPARATOR = '--'

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'tauphahji-lookup') {
        const url =
            'https://suisiann.ithuan.tw/講/' +
            encodeURIComponent(info.selectionText)
        chrome.tabs.create({ url: url, index: tab.index + 1 })
    } else {
        const [_, lang, code, name] = info.menuItemId.split(SEPARATOR)
        speakIn(info.selectionText, code, name)
    }
})

// https://stackoverflow.com/a/59786665
const allVoicesObtained = new Promise((resolve, reject) => {
    let voices = chrome.tts.getVoices()
    if (voices.length !== 0) {
        resolve(voices)
    } else {
        chrome.tts.onVoicesChanged.addEventListener(() => {
            voices = chrome.tts.getVoices()
            resolve(voices)
        })
    }
})

// https://twitter.com/bcrypt/status/1500348547887079424
const speakIn = async (text, lang, name) => {
    const voices = await allVoicesObtained

    // to pick a new voice
    // console.log('available voices')
    // console.log(voices.filter((v) => v.lang === lang))
    voice = voices.filter(
        (v) => v.lang === lang && v.voiceName.includes(name),
    )[0]
    chrome.tts.speak(text, { lang: lang, voiceName: voice.voiceName })
}

;[
    ['English', 'en-US', 'Microsoft Aria Online'],
    ['日本語', 'ja-JP', 'Microsoft Nanami Online'],
    ['中文', 'zh-TW', 'Microsoft HsiaoChen Online'],
    ['廣東話', 'zh-HK', 'Microsoft HiuGaai Online'],
].forEach(([lang, code, name]) => {
    chrome.contextMenus.create({
        id: ['tauphahji-lookup', lang, code, name].join(SEPARATOR),
        title: `Speak in ${lang}`,
        contexts: ['selection'],
    })
})
