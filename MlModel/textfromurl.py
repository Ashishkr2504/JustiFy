import requests
from bs4 import BeautifulSoup

# Function to scrape case law data from Indian Kanoon
def scrape_case_law(url):
    # Set headers to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # Send HTTP request to the page
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")  # Debugging line
    
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the main content (case law text)
        case_text = soup.find('div', {'class': 'judgments'})  # ID could vary, inspect the page source
        
        # Extract text and clean it
        if case_text:
            return case_text.get_text(separator="\n").strip()
        else:
            return "Case text not found."
    else:
        return "Failed to retrieve content."

# Example URL for a case from Indian Kanoon
url = "https://indiankanoon.org/doc/1674298/"  # Replace with actual case URL
case_data = scrape_case_law(url)
print(case_data)
