const BASE_URL = "https://bibliosync-api.onrender.com/books";

export const bookService = {
    getAll: async () => {
        try {
            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error(`Status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            return []; // Returns empty array to prevent .filter() crashes
        }
    },
    // Add this inside your bookService object
payFine: (id) => 
    fetch(`${BASE_URL}/${id}/pay-fine`, { 
        method: 'PUT' 
    }).then(res => res.json()),

    search: (title) => 
        fetch(`${BASE_URL}/search?title=${encodeURIComponent(title)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []),

    filterByCategory: (category) => 
        fetch(`${BASE_URL}/category/${encodeURIComponent(category)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []),

    add: (book) => 
        fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(res => res.json()),

    issue: (id, borrowerName) => 
        fetch(`${BASE_URL}/${id}/issue?borrowerName=${encodeURIComponent(borrowerName)}`, { 
            method: 'PUT' 
        }).then(res => res.json()),

    return: (id) => 
        fetch(`${BASE_URL}/${id}/return`, { method: 'PUT' }).then(res => res.json()),

    remove: (id) => 
        fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(res => res.text())
};