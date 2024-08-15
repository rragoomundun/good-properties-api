import httpStatus from 'http-status-codes';

/**
 * @api {POST} /file Upload file
 * @apiGroup File
 * @apiName FileUpload
 *
 * @apiDescription Upload a file to S3. File size is limited to 5 MB.
 *
 * @apiBody {File{5}} file The file to be uploaded.
 * @apiBody {String} [fileName] The name of the file.
 *
 * @apiError (Error (400)) UPLOAD_FAILED Cannot upload file
 * @apiError (Error (400)) LIMIT The file exceeds the 5 MB limit
 *
 * @apiPermission Private
 */

const upload = async (req, res, next) => {
  res.status(httpStatus.OK).end();
};

export { upload };
