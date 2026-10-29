const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
  constructor() {
    super("article");
  }

  async findAll() {
    const articles = await super.findAll();
    return articles;
  }

  async findOne(slug) {
    const article = await super.findOne("slug", slug);
    return article;
  }

  async create(article) {
    const newArticleId = await super.create(article);
    return newArticleId;
  }

  async update(id, article) {
    const affectedRows = await super.update(id, article);
    return affectedRows;
  }
}

module.exports = ArticleModel;