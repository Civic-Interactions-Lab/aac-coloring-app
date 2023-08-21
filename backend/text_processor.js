function removeNonAlpha(str) {
    return str.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
}

function tokenize(str) {
    return str.split(" ").map((token) => token.toUpperCase());
}

module.exports = {
    processString(str) {
        str = removeNonAlpha(str);
        return tokenize(str);
    },
};
