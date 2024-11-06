import React from 'react';

function BookItem({ book }) {
  const { title, author, year, coverId } = book;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://via.placeholder.com/150?text=No+Image';

  return (
    <div className="book-item">
      <img src={coverUrl} alt={`${title} cover`} />
      <h2>{title}</h2>
      <p><strong>Author:</strong> {author || 'N/A'}</p>
      <p><strong>Publication Year:</strong> {year || 'N/A'}</p>
    </div>
  );
}

export default BookItem;
