const presets = [
    ["@babel/env", {
        targets: {
            edge: "17",
            firefox: "16",
            chrome: "67",
            safari: "11.1"
        }
    }]
]
module.exports = { presets }