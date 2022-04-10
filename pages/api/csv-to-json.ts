import nextConnect from 'next-connect';
import csvToJson from 'csvtojson';
import * as fs from 'fs';
import { MultiPartMiddleware } from '../../core';
import type { NextApiRequest, NextApiResponse } from 'next';

const FS = fs.promises;

type Data = Record<string, any> | Record<string, any>[];

interface MulterRequest extends NextApiRequest {
    files: any;
}

const handler = nextConnect();
handler.use(MultiPartMiddleware);

handler.post(async (request: MulterRequest, response: NextApiResponse<Data>) => {
    const csvFilePath = request.files.file[0].path;
    const data = await csvToJson().fromFile(csvFilePath);
    await FS.unlink(csvFilePath);
    response.status(200).json({ ...data });
});

export const config = { api: { bodyParser: false } };

export default handler
