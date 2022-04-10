import multiparty from 'multiparty';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextHandler } from 'next-connect';

interface MulterRequest extends NextApiRequest {
    files: any;
}

const middleware = nextConnect();

middleware.use(async (request: MulterRequest, res: NextApiResponse, next: NextHandler) => {
    await new multiparty.Form().parse(request, function (err, fields, files) {
        request.body = fields;
        request.files = files;
        next();
    })
})

export default middleware;
