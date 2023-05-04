const path = require('path');

const project = (() => {
    try {
        const { androidManifestPath } = require('react-native-test-app');
        return {
            android: {
                sourceDir: path.join('example', 'android'),
                manifestPath: androidManifestPath(
                    path.join(__dirname, 'example', 'android')
                ),
            },
            ios: {
                sourceDir: 'example/ios',
            },
        };
    } catch (_) {
        return undefined;
    }
})();

module.exports = {
    ...(project ? { project } : undefined),
    dependencies: {
        '@react-native-community/blur': {
            root: __dirname,
        },
    },
};
