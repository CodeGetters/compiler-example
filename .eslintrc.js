module.exports = {
    root: true,
    globals: {
        FileReader: true,
    },
    extends: '@react-native-community',
    rules: {
        'react-native/no-inline-styles': 0,
        'comma-dangle': 0,
        indent: [
            2,
            4,
            {
                SwitchCase: 1,
            },
        ],
    },
};
