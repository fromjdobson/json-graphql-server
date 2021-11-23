module.exports = (URL) =>
    !/\s--noopen\s/.test(process.argv.join(' ') + ' ') &&
    require('child_process').exec(
        process.platform.replace('darwin', '').replace(/win32|linux/, 'xdg-') +
            'open ' +
            URL
    );
