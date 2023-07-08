// Fetch JSON data
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    // Variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalItems = jsonData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Function to render data for the current page
    function renderPage(page) {
      // Clear previous data
      const container = document.getElementById('data-container');
      container.innerHTML = '';

      // Calculate the start and end indexes for the current page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Iterate through the data for the current page and display it
      for (let i = startIndex; i < endIndex; i++) {
        if (jsonData[i]) {
          const item = jsonData[i];

          // Create table row
          const row = document.createElement('tr');

          // Create and append table cells
          const idCell = document.createElement('td');
          idCell.textContent = item.id;
          row.appendChild(idCell);

          const emailCell = document.createElement('td');
          emailCell.textContent = item.email;
          row.appendChild(emailCell);

          const nameCell = document.createElement('td');
          nameCell.textContent = item.name;
          row.appendChild(nameCell);

          // Append the row to the table body
          container.appendChild(row);
        }
      }
    }

    // Function to go to the previous page
    function goToPreviousPage() {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    }

    // Function to go to the next page
    function goToNextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    }

      // Attach event listeners to the previous and next buttons
      const previousButton = document.getElementById('previous-button');
      previousButton.addEventListener('click', function() {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      });
  
      const nextButton = document.getElementById('next-button');
      nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        }
      });

        // Function to handle pagination button click
  
        const buttons = document.querySelectorAll("span[id^='range-']");
        const tbody = document.getElementById("data-container");
        const handleRangeClick = (event) => {
            const rangeId = event.target.id;
            const rangeNumber = parseInt(rangeId.split("-")[1]);
            const startRange = (rangeNumber - 1) * 10 + 1;
            const endRange = rangeNumber * 10;
        
            if (tbody.innerHTML.length > 0) {
            tbody.innerHTML = "";
        
            jsonData.filter(listItem => {
                if (listItem.id >= startRange && listItem.id <= endRange) {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                tr.append(td, td1, td2);
                tbody.append(tr);
                td.innerText = listItem.id;
                td1.innerText = listItem.email;
                td2.innerText = listItem.name;
                }
            });
            }
        };
        
        buttons.forEach(button => {
            button.addEventListener("click", handleRangeClick);
        });
  
    
    // Initial rendering
    renderPage(currentPage);
  });
