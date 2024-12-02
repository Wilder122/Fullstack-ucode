function addWords(obj, wrds) {
    const wordsArray = obj.words.split(' ').filter(word => word !== '');
    const newWords = wrds.split(' ').filter(word => word !== '');
    obj.words = [...new Set([...wordsArray, ...newWords])].join(' ');
}

function removeWords(obj, wrds) {
    const wordsArray = obj.words.split(' ').filter(word => word !== '');
    const removeWordsSet = new Set(wrds.split(' ').filter(word => word !== ''));
    obj.words = wordsArray.filter(word => !removeWordsSet.has(word)).join(' ');
}

function changeWords(obj, oldWrds, newWrds) {
    const wordsArray = obj.words.split(' ').filter(word => word !== '');
    const oldWordsSet = new Set(oldWrds.split(' ').filter(word => word !== ''));
    const newWords = newWrds.split(' ').filter(word => word !== '');

    for (let i = 0; i < wordsArray.length; i++) {
        if (oldWordsSet.has(wordsArray[i])) {
            wordsArray[i] = newWords.shift() || '';
        }
    }
    obj.words = [...new Set(wordsArray)].join(' ');
}

const obj = { words: 'newspapers newspapers  books magazines' };
console.log(obj); // { words: "newspapers newspapers  books magazines" }

addWords(obj, 'radio newspapers');
console.log(obj); // { words: "newspapers books magazines radio" }

removeWords(obj, 'newspapers   radio');
console.log(obj); // { words: "books magazines" }

changeWords(obj, 'books radio  magazines', 'tv internet');
console.log(obj); // { words: "tv internet" }