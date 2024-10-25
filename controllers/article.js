import httpStatus from 'http-status-codes';
import { Sequelize } from 'sequelize';

import Article from '../models/Article.js';

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
    order: [['date', 'DESC']],
    logging: console.log
  });

  res.status(httpStatus.OK).json(articles);
};

export { getAllArticles };
