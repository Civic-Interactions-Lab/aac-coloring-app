export function getS3ObjectByKey(key: string) {
    return `${process.env.NEXT_PUBLIC_S3_URL}/${key}`;
}
