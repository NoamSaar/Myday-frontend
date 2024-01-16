export const utilService = {
    readJsonFile,
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getFormatDate,
    getAcronym,
    capitalizeFirstLetter,
    getFullFormatDate,
    timeStampToDate,
    millisecondsToDays,
    isValidTimestamp,
    areObjsIdentical,
    hasTimePassed,
    timeSince,
    escapeRegExp,
}

function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getFormatDate(timestamp) {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'short' }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    return formatter.format(date)
}

function timeStampToDate(timeStamp) {
    const timelineToSave = new Date(timeStamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
    return timelineToSave
}

function millisecondsToDays(ms) {
    return Math.floor(ms / 86400000)
}

function isValidTimestamp(timestamp) {
    return !isNaN(new Date(timestamp).getTime())
}


function getFullFormatDate(timestamp) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone
    }

    const formattedDate = new Date(timestamp).toLocaleString('en-US', options)
    return formattedDate
}

function hasTimePassed(timestamp) {
    const currentTimestamp = Date.now();
    return timestamp < currentTimestamp;
}

function getAcronym(name) {
    const words = name.split(' ');

    if (words.length === 1) {
        return name.length > 1 ? name.slice(0, 2) : name[0];
    }

    return words[0][0] + words[1][0];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function areObjsIdentical(obj1, obj2) {
    //works only in case that props in both are in tje same order
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function timeSince(timeStamp) {
    let now = new Date(),
        secondsPast = (now.getTime() - timeStamp) / 1000
    if (secondsPast < 30) {
        return 'just now'
    }
    // if (secondsPast < 60) {
    //     return parseInt(secondsPast) + 's'
    // }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + 'm'
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + 'h'
    }
    if (secondsPast > 86400) {
        const date = new Date(timeStamp)
        const day = date.getDate()
        const month = date
            .toDateString()
            .match(/ [a-zA-Z]*/)[0]
            .replace(' ', '')
        const year = date.getFullYear() === now.getFullYear() ? '' : ' ' + date.getFullYear()
        return day + ' ' + month + year
    }
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


