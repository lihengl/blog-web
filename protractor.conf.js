exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    cucumberOpts: {
        format: 'json',
        steps: [
            './steps/**/*.js'
        ]
    },
    framework: 'cucumber',
    specs: [
        './specs/**/*.feature'
    ]
};
