import AWS, { DynamoDB } from 'aws-sdk';
AWS.config.update({ region: 'eu-central-1' });
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import { DynamoDbTableName, GetBodyRequest, NewsBody, NewsMetadata } from './model';

export async function getBodyFromS3(request: GetBodyRequest): Promise<NewsBody> {
    const {id, bucketName, prefix} = request;
    const s3 =  new AWS.S3();
    const getObject: GetObjectRequest = { Bucket: bucketName, Key: `${prefix}/${id}` };
    return s3.getObject(getObject)
        .promise()
        .then(getResult => ({ body: getResult.Body?.toString() || '' }));
}

export async function getAllNewsMetadata(table: DynamoDbTableName): Promise<NewsMetadata[]> {
    const { tableName } = table;
    const db = new DynamoDB.DocumentClient();

    const params: DynamoDB.DocumentClient.ScanInput = { TableName: tableName };
    return db.scan(params)
        .promise()
        .then(scanResult => scanResult.Items?.map((item: DynamoDB.DocumentClient.AttributeMap) => ({
            backgroundColor: item['backgroundColor'],
            createdAt: item['createdAt'],
            id: item['id'],
            name: item['name'],
            bucketName: item['bucketName'],
            prefix: item['prefix']
        })) || [] );
}
