import { check, body } from 'express-validator';

import validation from './validation.js';

const fileUploadValidator = validation([
  check('file').custom((value, { req }) => {
    const { file } = req;

    if (file === undefined) {
      throw new Error('message=No file sent;type=NO_FILE');
    }

    // Only allow jpeg, png, gif, or webp
    if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype) === false) {
      throw new Error('message=Invalid file mimetype;type=MIMETYPE');
    }

    // Limit the file size to 5 MB
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('message=File size limit exceedde;type=SIZE');
    }

    return true;
  })
]);

const fileDeleteValidator = validation([
  body('fileName').notEmpty().withMessage('message=No file name;type=NO_FILENAME')
]);

export { fileUploadValidator, fileDeleteValidator };
