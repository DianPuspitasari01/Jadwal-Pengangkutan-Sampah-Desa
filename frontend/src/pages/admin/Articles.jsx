import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../../utils/api';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { data } = await articlesAPI.update(editingId, formData);
        setArticles(articles.map(a => (a.id === editingId ? data : a)));
      } else {
        const { data } = await articlesAPI.create(formData);
        setArticles([...articles, data]);
      }

      setFormData({ title: '', content: '', image: '' });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      alert('Gagal menyimpan artikel');
    }
  };

  const handleEdit = (article) => {
    setFormData(article);
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        await articlesAPI.delete(id);
        setArticles(articles.filter(a => a.id !== id));
      } catch (error) {
        alert('Gagal menghapus artikel');
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-title">Kelola Artikel Edukasi</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({ title: '', content: '', image: '' });
            }
          }}
          className="btn btn-primary"
        >
          {showForm ? 'Batal' : '+ Tambah Artikel'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Judul</label>
              <input
                type="text"
                className="input"
                placeholder="Judul artikel"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Konten</label>
              <textarea
                className="input"
                placeholder="Isi artikel"
                rows="6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">URL Gambar</label>
              <input
                type="url"
                className="input"
                placeholder="https://contoh.com/gambar.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {editingId ? 'Perbarui' : 'Simpan'}
            </button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map(article => (
          <div key={article.id} className="card">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Oleh: {article.author}</p>
            <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(article)}
                className="btn btn-primary flex-1 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="btn btn-danger flex-1 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
