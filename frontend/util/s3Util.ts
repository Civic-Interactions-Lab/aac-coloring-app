// TODO: implement https://stackoverflow.com/questions/1077041/refresh-image-with-a-new-one-at-the-same-url/22429796#22429796
export function getS3ObjectByKey(key: string) {
    return `${process.env.NEXT_PUBLIC_S3_URL}/${key}`;
}
