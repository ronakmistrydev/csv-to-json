import nextConnect, {NextHandler} from 'next-connect'
import multiparty from 'multiparty'
import {NextApiRequest, NextApiResponse} from "next";

interface MulterRequest extends NextApiRequest {
    files: any;
}

const middleware = nextConnect()

middleware.use(async (req: MulterRequest, res: NextApiResponse, next: NextHandler) => {
    const form = new multiparty.Form()

    await form.parse(req, function (err, fields, files) {
        req.body = fields
        req.files = files
        next()
    })
})

export default middleware
