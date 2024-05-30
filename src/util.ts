export async function RequestData(url: string, data: object): Promise<object> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Use the provided data parameter
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as JSON and return it
    return response.json();
}
