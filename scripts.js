document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('month');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const transactionsTableBody = document.getElementById('transactionsTable').querySelector('tbody');
    const totalSaleAmountSpan = document.getElementById('totalSaleAmount');
    const totalSoldItemsSpan = document.getElementById('totalSoldItems');
    const totalNotSoldItemsSpan = document.getElementById('totalNotSoldItems');
    const barChartContainer = document.getElementById('barChartContainer');
    const pieChartContainer = document.getElementById('pieChartContainer');

    let currentPage = 1;

    const fetchTransactions = async () => {
        const month = monthSelect.value;
        const search = searchInput.value;
        const response = await fetch(`http://localhost:3000/api/transactions?month=${month}&search=${search}&page=${currentPage}&per_page=10`);
        const data = await response.json();
        updateTransactionsTable(data);
    };

    const fetchStatistics = async () => {
        const month = monthSelect.value;
        const response = await fetch(`http://localhost:3000/api/statistics?month=${month}`);
        const data = await response.json();
        updateStatistics(data);
    };

    const fetchBarChart = async () => {
        const month = monthSelect.value;
        const response = await fetch(`http://localhost:3000/api/barChart?month=${month}`);
        const data = await response.json();
        updateBarChart(data);
    };

    const fetchPieChart = async () => {
        const month = monthSelect.value;
        const response = await fetch(`http://localhost:3000/api/pieChart?month=${month}`);
        const data = await response.json();
        updatePieChart(data);
    };

    const updateTransactionsTable = (transactions) => {
        transactionsTableBody.innerHTML = '';
        transactions.forEach(txn => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${txn.title}</td>
                <td>${txn.description}</td>
                <td>${txn.price}</td>
                <td>${new Date(txn.dateOfSale).toLocaleDateString()}</td>
                <td>${txn.sold ? 'Yes' : 'No'}</td>
                <td>${txn.category}</td>
            `;
            transactionsTableBody.appendChild(row);
        });
    };

    const updateStatistics = (stats) => {
        totalSaleAmountSpan.textContent = stats.totalSaleAmount;
        totalSoldItemsSpan.textContent = stats.totalSoldItems;
        totalNotSoldItemsSpan.textContent = stats.totalNotSoldItems;
    };

    const updateBarChart = (data) => {
        barChartContainer.innerHTML = '';
        const chartData = Object.keys(data).map(key => ({ range: key, count: data[key] }));
        chartData.forEach(item => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.width = `${item.count * 10}px`;
            bar.textContent = `${item.range}: ${item.count}`;
            barChartContainer.appendChild(bar);
        });
    };

    const updatePieChart = (data) => {
        pieChartContainer.innerHTML = '';
        const total = Object.values(data).reduce((acc, value) => acc + value, 0);
        Object.keys(data).forEach(key => {
            const slice = document.createElement('div');
            slice.className = 'slice';
            slice.style.width = `${(data[key] / total) * 100}%`;
            slice.textContent = `${key}: ${data[key]}`;
            pieChartContainer.appendChild(slice);
        });
    };

    monthSelect.addEventListener('change', () => {
        currentPage = 1;
        fetchTransactions();
        fetchStatistics();
        fetchBarChart();
        fetchPieChart();
    });

    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        fetchTransactions();
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchTransactions();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        fetchTransactions();
    });

    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
    fetchPieChart();
});
