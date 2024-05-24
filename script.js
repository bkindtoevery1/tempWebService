document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndRender();
});

async function fetchDataAndRender() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        document.getElementById('total-score').textContent = `${data.totalScore}점`;
        document.getElementById('increase-percentage').textContent = `${data.increasePercentage}% 증가`;

        // Keywords
        const keywordsContainer = document.getElementById('keywords');
        data.keywords.forEach(keyword => {
            const div = document.createElement('div');
            div.classList.add('keyword');
            div.textContent = keyword;
            keywordsContainer.appendChild(div);
        });

        // Disease Risks
        const diseaseRisksContainer = document.getElementById('disease-risks');
        data.diseaseRisks.forEach(risk => {
            const div = document.createElement('div');
            div.classList.add('disease-risk');
            div.innerHTML = `<p>${risk.name}</p><p>${risk.percentage}%</p>`;
            diseaseRisksContainer.appendChild(div);
        });

        // Render Charts
        renderChart1(data.chart1Data);
        renderChart2(data.chart2Data);
        renderPieChart(data.pieChartData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderChart1(data) {
    const ctx = document.getElementById('chart1').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function renderChart2(data) {
    const ctx = document.getElementById('chart2').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function renderPieChart(data) {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

