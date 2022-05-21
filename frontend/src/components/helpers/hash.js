export const hash = (name, email) => {
    const context = `${name}${email}`;
    var hash = 0;
    for (var i = 0; i < context.length; i++) {
        var code = context.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash;
    }
    return Math.abs(hash);
}