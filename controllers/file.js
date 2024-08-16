import httpStatus from 'http-status-codes';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import ErrorResponse from '../classes/ErrorResponse.js';

/**
 * @api {POST} /file Upload file
 * @apiGroup File
 * @apiName FileUpload
 *
 * @apiDescription Upload a file to S3. File size is limited to 5 MB.
 *
 * @apiBody {File{5}} file The file to be uploaded.
 *
 * @apiSuccessExample Success Example
 * {
 *   "link": "img.bucketname.net/abc/22/1723795173514.jpeg"
 * }
 *
 * @apiError (Error (400)) INVALID_PARAMETERS The file parameter is invalid
 * @apiError (Error (500)) UPLOAD_FAILED Cannot upload file
 *
 * @apiPermission Private
 */

const uploadFile = async (req, res, next) => {
  const { file } = req;

  const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  const params = {
    Bucket: process.env.AWS_S3_IMAGE_BUCKET_NAME,
    Key: `${process.env.AWS_S3_IMAGE_BUCKET_FOLDER}/${req.user.id}/${Date.now()}.${file.mimetype.split('/')[1]}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    await s3.send(new PutObjectCommand(params));

    res.status(httpStatus.OK).json({
      link: `${params.Bucket}/${params.Key}`
    });
  } catch {
    next(new ErrorResponse('Upload failed', httpStatus.INTERNAL_SERVER_ERROR, 'UPLOAD_FAILED'));
  }
};

export { uploadFile };
