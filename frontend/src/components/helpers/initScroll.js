export const initScroll = () => {
    const exchangeRates = document.getElementById('exchangeRates');
    const exchangeRatesWidth = exchangeRates.scrollWidth;
    
    const scroll = () => {
        const first = document.querySelector('#exchangeRates p');
        
        if (!isElementInViewport(first)) {
            exchangeRates.appendChild(first);
            exchangeRates.scrollTo(exchangeRates.scrollLeft - first.offsetWidth, 0);
        }
    
        if (exchangeRates.scrollLeft !== exchangeRatesWidth) {
            exchangeRates.scrollTo(exchangeRates.scrollLeft + 1, 0);
        } 

    };
    
    clearInterval(scroll);
    setInterval(scroll, 15);
    
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.right > 0;
    }
}