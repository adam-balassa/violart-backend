export interface BucketName {
    bucketName: string;
    prefix: string;
}

export interface DynamoDbTableName {
    tableName: string;
}


export interface Id {
    id: string;
}

export interface NewsBody {
    body: string;
}

export interface NewsMetadata extends Id, BucketName {
    name: string;
    createdAt: number;
    backgroundColor: string;
}

export type UploadBodyRequest = BucketName & Id & NewsBody;

export type GetBodyRequest = BucketName & Id;
