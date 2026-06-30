const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all articles
router.get('/', (req, res) => {
  try {
    const articles = db.articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article by id
router.get('/:id', (req, res) => {
  try {
    const article = db.articles.find(a => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article (admin only)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan konten artikel diperlukan' });
    }

    const newArticle = {
      id: db.nextIds.article++,
      title,
      content,
      author: req.user.username,
      image: image || 'https://via.placeholder.com/300x200?text=Artikel',
      createdAt: new Date()
    };

    db.articles.push(newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article (admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const { title, content, image } = req.body;

    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    if (title) article.title = title;
    if (content) article.content = content;
    if (image) article.image = image;

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const articleId = parseInt(req.params.id);

    const articleIndex = db.articles.findIndex(a => a.id === articleId);
    if (articleIndex === -1) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    db.articles.splice(articleIndex, 1);
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
