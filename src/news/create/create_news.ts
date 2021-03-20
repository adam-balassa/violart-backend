import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-central-1' });
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { Id, UploadBodyRequest } from '../model';

async function generateId(): Promise<Id> {
    return {id: uuid()};
}

async function uploadNewsBodyToS3(newsBody: UploadBodyRequest ): Promise<string> {
    const s3 =  new AWS.S3();
    const {body, bucketName, prefix, id} = newsBody;

    const request: PutObjectRequest = { Bucket: bucketName, Key: `${prefix}/${id}`, Body: body };
    return s3.putObject(request)
        .promise()
        .then(() => `${bucketName}.s3.eu-central-1.amazonaws.com/${prefix}/${id}`);
}
