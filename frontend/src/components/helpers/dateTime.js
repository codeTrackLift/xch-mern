export const newTime = () => {
    return new Date().toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).replace(',','');
}

export const newDate = () => {
    return new Date().toLocaleDateString('en-US', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    });
}