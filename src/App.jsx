import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (query) => {
    if (!query) return;
    
    setIsLoading(true);  // Start loading
    setError(null);  // Clear any previous errors
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      if (data.docs.length === 0) {
        setError('No results found. Try another search.');
      } else {
        const booksData = data.docs.map(book => ({
          title: book.title,
          author: book.author_name?.[0],
          year: book.first_publish_year,
          coverId: book.cover_i
        }));
        setBooks(booksData);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setIsLoading(false);  // End loading
    }
  };

  const retrySearch = () => {
    setBooks([]);
    setError(null);
    searchBooks();
  };

  return (
    <div className="App">
      <h1>Book Finder</h1>
      <SearchBar onSearch={searchBooks} />
      
      {isLoading && <div className="loading">Searching...</div>}

      {error && (
        <div className="error-message">
          {error}
          {error === 'Error fetching data. Please try again later.' && (
            <button className="retry-button" onClick={retrySearch}>Retry</button>
          )}
        </div>
      )}

      {!isLoading && !error && books.length === 0 && (
        <div className="no-results">No books found. Try searching for another title.</div>
      )}

      {!isLoading && !error && books.length > 0 && <BookList books={books} />}
    </div>
  );
}

export default App;
