submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("Clicked!")
    resultCont.innerHTML = `<img width="123" src="img/loading.svg" alt="">`
    
    let key = "ema_live_ITkV5Pqq40WNdMLdjqMZlNcb4AEBrNvWiSFd1MYE"
    let email = document.getElementById("username").value 
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`
    let res = await fetch(url)
    let result = await res.json()
    
    // Start constructing the table
    let str = `<table border="1" cellspacing="0" cellpadding="5"><tr><th>Key</th><th>Value</th></tr>`
    let csvContent = "data:text/csv;charset=utf-8,Key,Value\n"  // Initializes CSV content

    for (key of Object.keys(result)) {
        if(result[key] !== "" && result[key] !== " ") { 
            str += `<tr><td>${key}</td><td>${result[key]}</td></tr>`
            csvContent += `${key},${result[key]}\n`  // Append data to CSV content
        }
    }

    str += `</table>`  // End the table

    console.log(str)
    resultCont.innerHTML = str

    // Add a download button
    let downloadBtn = document.createElement("button")  // Creates a new button element
    downloadBtn.innerText = "Download as CSV"  // Sets the button text
    downloadBtn.style.marginTop = "10px"  // Adds some margin for spacing
    downloadBtn.addEventListener("click", () => {  // Adds an event listener to handle the CSV download
        let encodedUri = encodeURI(csvContent)  // Encodes the CSV data for download
        let link = document.createElement("a")  // Creates a new anchor element
        link.setAttribute("href", encodedUri)  // Sets the download link
        link.setAttribute("download", "email_validation_result.csv")  // Sets the download file name
        document.body.appendChild(link)  // Appends the anchor to the document
        link.click()  // Simulates a click to start the download
        document.body.removeChild(link)  // Removes the anchor after download
    })

    resultCont.appendChild(downloadBtn)  // Adds the download button to the result container
})

// the explanation
// graph TD
//     A[Start] --> B[Add event listener to submit button]
//     B --> C{Button Clicked?}
//     C -->|Yes| D[Prevent default form submission]
//     D --> E[Log 'Clicked!' to console]
//     E --> F[Display loading image]
//     F --> G[Get API key and email]
//     G --> H[Construct API URL]
//     H --> I[Fetch data from API]
//     I --> J[Parse JSON response]
//     J --> K[Initialize HTML table string]
//     K --> L[Loop through result object]
//     L --> M{Is value not empty?}
//     M -->|Yes| N[Add key-value pair to table]
//     M -->|No| L
//     N --> L
//     L -->|Loop Complete| O[Close HTML table]
//     O --> P[Log final HTML string to console]
//     P --> Q[Update resultCont with HTML table]
//     Q --> R[End]
//     C -->|No| S[Wait for click]
//     S --> C

// e.preventDefault()
// Explanation: This prevents the default behavior of the button's click event, which in this case would likely be submitting a form and reloading the page. By calling preventDefault(), we ensure that the form does not reload the page, allowing the JavaScript code to handle the submission asynchronously.

// Example: If the button is part of a form, without this line, clicking the button would cause a page refresh, which would interrupt the JavaScript functionality.
