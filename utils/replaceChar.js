const replaceChar = (str) => {

    if (typeof str != 'string') return '';
    const match = /[?"'\\]/img;
    const res = str.replace(match, ' ');
    if (res.trim() === '') return '未知';
    return res;
}

export default replaceChar;