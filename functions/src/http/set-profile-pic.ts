import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as util from '../utils/constants';
import * as functions from 'firebase-functions';

const corsHandler = cors({ origin: true });

export default functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const queryId = req.query.id ?? '';
            const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
            const uid = formattedId.toString();

            const data = JSON.parse(req.body);
            const updateObject = {};
            Object.assign(updateObject, {
                images: data.newArr,
            });

            await admin.firestore().collection(util.FunctionsConstants.Users).doc(uid).update(updateObject);

            res.status(200).send(util.SuccessMessages.SuccessMessage);
            return;
        } catch (error) {
            console.error(error);

            res.status(500).send(util.ErrorMessages.UnexpectedError);
            return;
        }
    });
});
