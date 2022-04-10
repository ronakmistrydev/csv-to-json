import middleware from '../../middleware/middleware'
import nextConnect from 'next-connect'
import csvToJson from 'csvtojson';
const fs = require('fs').promises;

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    console.log(req.body)
    console.log(req.files)

    const csvFilePath = req.files.file[0].path;

    let payload = []
    await csvToJson()
        .fromFile(csvFilePath)
        .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
            payload = jsonArrayObj;
        })

    await fs.unlink(csvFilePath);

    res.status(200).json({ payload })
    //...
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler
