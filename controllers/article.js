import httpStatus from 'http-status-codes';
import { Sequelize } from 'sequelize';

import Article from '../models/Article.js';

import ErrorResponse from '../classes/ErrorResponse.js';

/**
 * @api {GET} /article/all Get Articles
 * @apiGroup Article
 * @apiName ArticleGetAll
 *
 * @apiDescription Get all articles
 *
 * @apiSuccessExample Success Example
 * [
 *   {
 *     "id": 12,
 *     "title": "Title of the article",
 *     "content": "Lorem ipsum odor amet, consectetuer adipiscing elit...",
 *     "image": "https://img.website.com/abcd.jpg",
 *     "author": "Tom Boss",
 *     "date": "2024-10-16T14:07:55.370Z"
 *   }
 * ]
 *
 * @apiPermission Public
 */
const getAllArticles = async (req, res, next) => {
  const articles = await Article.findAll({
    attributes: [
      'id',
      'title',
      [Sequelize.literal('CONCAT(LEFT("content", 250), \'...\')'), 'content'],
      'image',
      'author',
      'date'
    ],
    order: [['date', 'DESC']]
  });

  res.status(httpStatus.OK).json(articles);
};

/**
 * @api {GET} /article/:articleId Get Article
 * @apiGroup Article
 * @apiName ArticleGet
 *
 * @apiDescription Get a single article.
 *
 * @apiParam {Number} articleId The article id
 *
 * @apiSuccessExample Success Example
 * {
 *   "id": 12,
 *   "title": "Title of the article",
 *   "content": "Lorem ipsum odor amet, consectetuer adipiscing elit",
 *   "image": "https://img.website.com/abcd.jpg",
 *   "author": "Tom Boss",
 *   "date": "2024-10-16T14:07:55.370Z"
 * }
 *
 * @apiError (Error (404)) NOT_FOUND Cannot find article
 * @apiPermission Public
 */
const getArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await Article.findAll({ where: { id: articleId } });

  if (article.length === 0) {
    return next(new ErrorResponse('Cannot find article', httpStatus.NOT_FOUND, 'NOT_FOUND'));
  }

  res.status(httpStatus.OK).json(article);
};

export { getAllArticles, getArticle };
