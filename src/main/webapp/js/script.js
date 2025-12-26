// Simulate price updates
document.addEventListener('DOMContentLoaded', () => {
    const watchlistItems = document.querySelectorAll('.watchlist-item');
    const mainPriceElement = document.querySelector('.ticker-price');
    const mainChangeElement = document.querySelector('.price-change');

    let currentMainPrice = 150.25;

    // Simulate random price updates every 2 seconds for watchlist
    setInterval(() => {
        watchlistItems.forEach(item => {
            if (Math.random() > 0.7) { // Only update some items
                updateItem(item);
            }
        });

        // Update main ticker
        if (Math.random() > 0.5) {
            updateMainTicker();
        }
    }, 1000);

    function updateItem(item) {
        const priceEl = item.querySelector('.price');
        const changeEl = item.querySelector('.change');

        let currentPrice = parseFloat(priceEl.innerText);
        const change = (Math.random() - 0.5) * 2; // Random small change
        let newPrice = currentPrice + change;

        priceEl.innerText = newPrice.toFixed(2);

        // Update visual change
        const changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
        changeEl.innerText = (changePercent > 0 ? '+' : '') + changePercent.toFixed(2) + '%';

        if (changePercent >= 0) {
            changeEl.classList.remove('price-down');
            changeEl.classList.add('price-up');
            priceEl.style.color = 'var(--text-color)';
        } else {
            changeEl.classList.remove('price-up');
            changeEl.classList.add('price-down');
            priceEl.style.color = 'var(--text-color)';
        }
    }

    function updateMainTicker() {
        const change = (Math.random() - 0.5) * 1;
        currentMainPrice += change;

        mainPriceElement.innerText = currentMainPrice.toFixed(2);

        const changePercent = (change / currentMainPrice) * 100;
        mainChangeElement.innerText = (change > 0 ? '+' : '') + change.toFixed(2) + ' (' + (changePercent > 0 ? '+' : '') + changePercent.toFixed(2) + '%)';

        if (change >= 0) {
            mainPriceElement.classList.remove('price-down');
            mainPriceElement.classList.add('price-up');
            mainChangeElement.classList.remove('price-down');
            mainChangeElement.classList.add('price-up');
        } else {
            mainPriceElement.classList.remove('price-up');
            mainPriceElement.classList.add('price-down');
            mainChangeElement.classList.remove('price-up');
            mainChangeElement.classList.add('price-down');
        }
    }

    // Interactive Candles (just resizing randomly)
    const candles = document.querySelectorAll('.candle');
    setInterval(() => {
        const randomCandle = candles[Math.floor(Math.random() * candles.length)];
        const newHeight = 20 + Math.random() * 100;
        randomCandle.style.height = `${newHeight}px`;
        // Randomly flip color
        if (Math.random() > 0.5) {
            randomCandle.classList.toggle('red');
        }
    }, 800);
});
