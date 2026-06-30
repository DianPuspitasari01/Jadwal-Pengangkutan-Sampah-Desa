import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../../utils/api';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await articlesAPI.getAll();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">📚 Artikel Edukasi Sampah</h1>

      {selectedArticle ? (
        <div className="card mb-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="btn btn-secondary mb-4"
          >
            ← Kembali ke Daftar
          </button>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <h2 className="text-3xl font-bold mb-2">{selectedArticle.title}</h2>
          <p className="text-gray-600 mb-6">
            Oleh: <span className="font-semibold">{selectedArticle.author}</span> | {new Date(selectedArticle.createdAt).toLocaleDateString('id-ID')}
          </p>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedArticle.content}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="card cursor-pointer hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold mb-2 text-primary">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-2">Oleh: {article.author}</p>
              <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
              <p className="text-gray-500 text-xs">
                {new Date(article.createdAt).toLocaleDateString('id-ID')}
              </p>
              <button className="btn btn-primary mt-4 w-full">Baca Selengkapnya →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
