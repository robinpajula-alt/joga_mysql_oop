const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll();
        res.status(200).json({ articles: articles })
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        res.status(200).json({ article: article })
    }

    async createNewArticle(req, res) {
        const body = req.body || {}
        const newArticle = {
            name: body.name,
            slug: body.slug,
            image: body.image,
            body: body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with id ${articleId}`,
            article: { id: articleId, ...newArticle }
        })
    }

    async updateArticle(req, res) {
        const body = req.body || {}
        const id = req.params.id
        const existing = await articleModel.findById(id)
        if (!existing) {
            return res.status(404).json({ message: 'Article not found' })
        }
        const updatedData = {
            name: body.name,
            slug: body.slug,
            image: body.image,
            body: body.body,
            author_id: body.author_id
        }
        // jäta välja need väljad, mida päringus ei saadetud
        Object.keys(updatedData).forEach(k => updatedData[k] === undefined && delete updatedData[k])
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: 'No data to update' })
        }
        await articleModel.update(id, updatedData)
        res.status(200).json({
            message: `updated article with id ${id}`,
            article: { id: Number(id), ...updatedData }
        })
    }
}

module.exports = articleController