module.exports = process.argv.reduce((p, c, i, a) => {
    const key = a[i - 1];
    const value = /--\w/.test(key) && c;
    return value ? { ...p, [key.slice(2)]: value } : p;
}, {});
