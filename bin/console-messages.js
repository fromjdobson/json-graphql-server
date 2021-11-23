const Y = '\x1b[33m';
const G = '\x1b[32m';
const W = '\x1b[0m';
const U = '\x1b[4m';
function c(m) {
    process.stdout.write('\n' + m + W + '\n');
    return true;
}
module.exports = {
    STARTING: () => c(
        'Starting Json GraphQL Server...'
    ),
    DATAFROM: (dataPath) => c(
        `Data from ${U}file://${dataPath}`
    ),
    BROWSEROPEN: () => c(
        'Opening Browser... \nrun with --noopen flag to disable opening browser on start.'
    ),
    REJECTION: (reason, p) => c(
        'Unhandled Rejection at: Promise', p, 'reason:', reason
    ),
    STARTED: (URL) => c(
        `${G}GraphQL server running at ${Y+U}${URL}`
    ),
};
