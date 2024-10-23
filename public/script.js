document.addEventListener('DOMContentLoaded', function () {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById('data-container');
            
            // Clear the data container
            dataContainer.innerHTML = '';

            // Display the received data
            if (data.data && data.data.length > 0) {
                data.data.forEach(item => {
                    const dataItem = document.createElement('p');
                    dataItem.textContent = item;
                    dataContainer.appendChild(dataItem);
                });
            } else {
                dataContainer.textContent = 'No data received yet.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
