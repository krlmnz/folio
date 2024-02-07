document.addEventListener('DOMContentLoaded', function() {
    fetchSheetData();
});

async function fetchSheetData() {
    try {
        // Fetch data from your API endpoint that interacts with Google Sheets
        const response = await fetch('/api/sheetData');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        // Select the container where the data will be displayed
        const sheetDataContainer = document.getElementById('sheetData');
        // Clear previous content
        sheetDataContainer.innerHTML = '';

        // Dynamically create and append elements for each item in the data
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'sheet-item';
            itemElement.innerHTML = `
                <h2>${item['Column 1']}</h2>
                <p>${item['Column 2']}</p>
            `;
            sheetDataContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        document.getElementById('sheetData').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}
