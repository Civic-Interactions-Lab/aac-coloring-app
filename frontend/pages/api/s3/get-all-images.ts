import type { NextApiRequest, NextApiResponse } from "next";
import AWS, { S3 } from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});

var params = {
    Bucket: "aac-coloring-book-images",
};

const s3 = new S3();

const hasSVGExtensionRegex = /^.+\.svg$/;

export interface GetAllImagesResponse {
    message: string;
    data?: Array<string>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetAllImagesResponse>) {
    const s3GetPromise = new Promise<S3.ListObjectsV2Output>((resolve, reject) => {
        s3.listObjectsV2(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else resolve(data);
        });
    });

    let data: S3.ListObjectsV2Output;

    try {
        data = await s3GetPromise;
    } catch (err) {
        return res.status(500).json({ message: "AWS Error" });
    }

    if (!data.Contents) return res.status(500).json({ message: "no contents received from s3" });

    const keys: Array<string> = [];

    data.Contents.forEach((item) => {
        if (item.Key && hasSVGExtensionRegex.test(item.Key)) keys.push(item.Key);
    });

    res.status(200).json({
        data: keys,
        message: "OK",
    });
}
