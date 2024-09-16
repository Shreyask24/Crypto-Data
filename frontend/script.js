async function fetchCryptos() {
    try {
        const response = await fetch('http://localhost:3300/api/cryptos');
        const data = await response.json();

        const tableBody = document.getElementById('crypto-table-body');
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>₹ ${crypto.last}</td>
                <td>${crypto.buy}</td>
                <td>${crypto.sell}</td>
                <td>${crypto.volume}</td>
                <td>${crypto.base_unit}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching cryptos:', error);
    }
}

fetchCryptos();