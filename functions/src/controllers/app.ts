/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as xml from 'xml';
import * as admin from 'firebase-admin';
import * as util from '../utils/constans';
import * as functions from 'firebase-functions';

import * as cors from 'cors';
const corsHandler = cors({origin: true});


const getAppXML = async (req:functions.https.Request, res: functions.Response) => {
    const header = req.headers;
    const xBinu = header['x-binu'] ?? '';

    let indexOfDid = xBinu.indexOf('did');
    indexOfDid = indexOfDid + 4;
    let indexOfAppId = xBinu.indexOf('appId');
    indexOfAppId = indexOfAppId - 2;
    const uid = xBinu.toString().substring(indexOfDid, indexOfAppId);

    const doc = await admin.firestore()
        .collection(util.FunctionsConstants.Users)
        .doc(uid)
        .get();

    const app = [{
        app: [
            {
                _attr: {
                    styleurl: '',
                    showfree: false,
                    title: util.FunctionsConstants.UmtuWam,
                },
            },
            {
                bottom_nav: [
                    {
                        menuItem: [
                            {
                                _attr: {
                                    default: true,
                                    img: 'https://umtuwam.web.app/logo.png',
                                    href: doc.exists ?`https://us-central1-umtuwam.cloudfunctions.net/getProspectiveDatesXML?id=${uid}` : `https://us-central1-umtuwam.cloudfunctions.net/getStartup?id=${uid}`,
                                },
                            },
                            util.FunctionsConstants.Home,
                        ],
                    },
                    {
                        menuItem: [
                            {
                                _attr: {
                                    img: 'https://umtuwam.web.app/chat_logo.png',
                                    href: doc.exists ?`https://us-central1-umtuwam.cloudfunctions.net/getChatsView?id=${uid}` : `https://us-central1-umtuwam.cloudfunctions.net/getStartup?id=${uid}`,
                                },
                            },
                            util.FunctionsConstants.Chats,
                        ],
                    },
                    {
                        menuItem: [
                            {
                                _attr: {
                                    img: 'https://umtuwam.web.app/settings.png',
                                    href: doc.exists ?`https://us-central1-umtuwam.cloudfunctions.net/getPreferencesView?id=${uid}` : `https://us-central1-umtuwam.cloudfunctions.net/getStartup?id=${uid}`,
                                },
                            },
                            util.FunctionsConstants.PreferencesCapital,
                        ],
                    },
                    {
                        menuItem: [
                            {
                                _attr: {
                                    img: 'https://umtuwam.web.app/profile_logo.png',
                                    href: doc.exists ?`https://us-central1-umtuwam.cloudfunctions.net/getProfileView?id=${uid}` : `https://us-central1-umtuwam.cloudfunctions.net/getStartup?id=${uid}`,
                                },
                            },
                            util.FunctionsConstants.Profile,
                        ],
                    },
                ],
            },
            {
                menu: [
                    {
                        menuItem: [
                            {
                                _attr: {
                                    action: util.FunctionsConstants.Usage,
                                },
                            },
                            util.FunctionsConstants.About,
                        ],
                    },
                    {
                        menuItem: [
                            {
                                _attr: {
                                    action: util.FunctionsConstants.Share,
                                },
                            },
                            util.FunctionsConstants.ShareMoya,
                        ],
                    },
                    {
                        menuItem: [
                            {
                                _attr: {
                                    action: util.FunctionsConstants.Rate,
                                },
                            },
                            util.FunctionsConstants.RateMoya,
                        ],
                    },
                ],
            },
            {
                share: {
                    _attr: {
                        action: util.FunctionsConstants.Send,
                        title: util.FunctionsConstants.Moya,
                        text: util.FunctionsConstants.MoyaShareText,
                        subject: util.FunctionsConstants.MoyaSubjectText,
                    },
                },
            },
        ],
    }];

    corsHandler(req, res, async () => {
        res.status(200).send(xml(app, true));
        return;
    });
};

const getStartup = async (req:functions.https.Request, res: functions.Response) => {
    try {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();
        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    webview: [
                        {
                            _attr: {
                                style: '',
                                layout: 'relative',
                                href: `https://umtuwam.web.app/Startup.html?did=${uid}`,
                            },
                        },
                    ],
                },
            ],
        }];

        res.send(xml(doc, true));
        return;
    } catch (error) {
        console.error(util.ErrorMessages.ErrorText, error);
        res.status(404).send(util.ErrorMessages.UnexpectedExrror);
        return;
    }
};

const getChatsView = async (req:functions.https.Request, res: functions.Response) => {
    try {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();
        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    webview: [
                        {
                            _attr: {
                                style: '',
                                layout: 'relative',
                                href: `https://umtuwam.web.app/Chats.html?did=${uid}`,
                            },
                        },
                    ],
                },
            ],
        }];

        res.send(xml(doc, true));
        return;
    } catch (error) {
        console.error(util.ErrorMessages.ErrorText, error);
        res.status(404).send(util.ErrorMessages.UnexpectedExrror);
        return;
    }
};

const getPreferencesView = async (req:functions.https.Request, res: functions.Response) => {
    try {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();
        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    webview: [
                        {
                            _attr: {
                                style: '',
                                layout: 'relative',
                                href: `https://umtuwam.web.app/Filters.html?did=${uid}`,
                            },
                        },
                    ],
                },
            ],
        }];

        res.send(xml(doc, true));
        return;
    } catch (error) {
        console.error(util.ErrorMessages.ErrorText, error);
        res.status(404).send(util.ErrorMessages.UnexpectedExrror);
        return;
    }
};

const getProfileView = async (req:functions.https.Request, res: functions.Response) => {
    try {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();
        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    webview: [
                        {
                            _attr: {
                                style: '',
                                layout: 'relative',
                                href: `https://umtuwam.web.app/Profile.html?did=${uid}`,
                            },
                        },
                    ],
                },
            ],
        }];

        res.send(xml(doc, true));
        return;
    } catch (error) {
        console.error(util.ErrorMessages.ErrorText, error);
        res.status(404).send(util.ErrorMessages.UnexpectedExrror);
        return;
    }
};

const viewUserProfile = async (req:functions.https.Request, res: functions.Response) => {
    try {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();
        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    webview: [
                        {
                            _attr: {
                                style: '',
                                layout: 'relative',
                                href: `https://umtuwam.web.app/ViewProfile.html?did=${uid}`,
                            },
                        },
                    ],
                },
            ],
        }];

        res.send(xml(doc, true));
        return;
    } catch (error) {
        console.error(util.ErrorMessages.ErrorText, error);
        res.status(404).send(util.ErrorMessages.UnexpectedExrror);
        return;
    }
};

const getMembershipPageXML = async (req:functions.https.Request, res: functions.Response) => {
    corsHandler(req, res, async () => {
        const queryId = req.query.id ?? '';
        const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
        const uid = formattedId.toString();

        const userDocument = await admin.firestore().collection(util.FunctionsConstants.Users).doc(uid).get();

        if (!userDocument.exists) res.status(500).send(util.ErrorMessages.NoUserError);

        const doc = [{
            doc: [
                {
                    _attr: {
                        title: util.FunctionsConstants.UmtuWam,
                    },
                },
                {
                    list: [
                        {
                            item: [
                                {
                                    _attr: {
                                        style: '',
                                        href: '',
                                        layout: 'relative',
                                    },
                                },
                                {
                                    md: util.FunctionsConstants.Membership,
                                },
                            ],
                        },
                        {
                            item: [
                                {
                                    _attr: {
                                        style: '',
                                        href: '',
                                        layout: 'relative',
                                    },
                                },
                                {
                                    md: `${util.FunctionsConstants.Chatting}: ${util.FunctionsConstants.ClickToPayChats}`,
                                },
                            ],
                        },
                        {
                            item: [
                                {
                                    _attr: {
                                        style: '',
                                        href: '',
                                        layout: 'relative',
                                    },
                                },
                                {
                                    md: `${util.FunctionsConstants.Featured} ${util.FunctionsConstants.ClickToPayFeatured}`,
                                },
                            ],
                        },
                        {
                            item: [
                                {
                                    _attr: {
                                        style: '',
                                        href: '',
                                        layout: 'relative',
                                    },
                                },
                                {
                                    md: `${util.FunctionsConstants.SeeAllPhotos} ${util.FunctionsConstants.ClickToPayPhotos}`,
                                },
                            ],
                        },
                        {
                            item: [
                                {
                                    _attr: {
                                        style: '',
                                        href: '',
                                        layout: 'relative',
                                    },
                                },
                                {
                                    md: `${util.FunctionsConstants.Verified} ${util.FunctionsConstants.ClickToPayVerified}`,
                                },
                            ],
                        },
                    ],
                },
            ],
        }];

        res.status(200).send(xml(doc, true));
        return;
    });
};

const getProspectiveDates = async (req:functions.https.Request, res: functions.Response) => {
    corsHandler(req, res, async () => {
        try {
            const queryId = req.query.id ?? '';
            const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
            const uid = formattedId.toString();

            await admin.firestore().collection(util.FunctionsConstants.Preferences).doc(uid).get()
            .then(async (doc) => {
                if (!doc.exists) {
                    res.status(500).send(util.ErrorMessages.NoUserError);
                    return;
                }

                await admin.firestore().collection(util.FunctionsConstants.Users)
                    .where(util.FunctionsConstants.Gender, '==', doc.data()?.gender)
                    .where(util.FunctionsConstants.Age, '>=', doc.data()?.ageMin)
                    .where(util.FunctionsConstants.Age, '<=', doc.data()?.ageMax)
                    .where(util.FunctionsConstants.Location, '==', doc.data()?.location)
                    .orderBy(util.FunctionsConstants.Age, 'asc')
                    .orderBy(util.FunctionsConstants.Points, 'desc')
                    .startAt(doc.data()?.currentIndex)
                    .limit(20)
                    .get()
                    .then(async (docs) => {
                        if (docs.empty) {
                            doc.ref.update({currentIndex: 0});
                            res.status(500).send(util.ErrorMessages.NoDatesMessage);
                            return;
                        } else {
                            const docsArray = [];
                            for (const doc of docs.docs) {
                                docsArray.push(doc.data());
                            }

                            const currentIndex = doc.data()?.currentIndex + docs.docs.length;

                            await doc.ref.update({
                                currentIndex: currentIndex,
                            });


                            res.status(200).send(docsArray);
                            return;
                        }
                    });
            });
        } catch (error) {
            console.error(util.ErrorMessages.ErrorText, error);
            res.status(404).send(util.ErrorMessages.UnexpectedExrror);
            return;
        }
    });
};

const getProspectiveDatesXML = async (req:functions.https.Request, res: functions.Response) => {
    corsHandler(req, res, async () => {
        try {
            const queryId = req.query.id ?? '';
            const formattedId = Array.isArray(queryId) ? queryId[0] : queryId;
            const uid = formattedId.toString();

            console.log(uid);

            await admin.firestore().collection(util.FunctionsConstants.Preferences).doc(uid).get()
            .then(async (document) => {
                if (!document.exists) {
                    res.status(500).send(util.ErrorMessages.NoUserError);
                    return;
                }

                let docs;
                if (document.data()?.currentIndex == '') {
                    docs = await admin.firestore().collection(util.FunctionsConstants.Users)
                    .where(util.FunctionsConstants.Gender, '==', document.data()?.gender)
                    .where(util.FunctionsConstants.Age, '>=', document.data()?.ageMin)
                    .where(util.FunctionsConstants.Age, '<=', document.data()?.ageMax)
                    .where(util.FunctionsConstants.Location, '==', document.data()?.location)
                    .orderBy(util.FunctionsConstants.Age, 'asc')
                    .orderBy(util.FunctionsConstants.Points, 'desc')
                    .limit(2)
                    .get();
                } else {
                    const lastVisible = await admin.firestore().collection(util.FunctionsConstants.Users).doc(document.data()?.currentIndex).get();

                    if (!lastVisible.exists) {
                        res.status(500).send(util.ErrorMessages.NoUserError);
                        return;
                    }

                    docs = await admin.firestore().collection(util.FunctionsConstants.Users)
                    .where(util.FunctionsConstants.Gender, '==', document.data()?.gender)
                    .where(util.FunctionsConstants.Age, '>=', document.data()?.ageMin)
                    .where(util.FunctionsConstants.Age, '<=', document.data()?.ageMax)
                    .where(util.FunctionsConstants.Location, '==', document.data()?.location)
                    .orderBy(util.FunctionsConstants.Age, 'asc')
                    .orderBy(util.FunctionsConstants.Points, 'desc')
                    .startAfter(lastVisible)
                    .limit(2)
                    .get();
                }

                const usersList: any = [];

                for (const doc of docs.docs) {
                    const item = {
                        item: [
                            {
                                _attr: {
                                    style: '',
                                    href: `https://us-central1-umtuwam.cloudfunctions.net/viewUserProfile?id=${doc.id}`,
                                    layout: 'relative',
                                },
                            },
                            {
                                img: {
                                    _attr: {
                                        url: doc.data().images.length > 0 ? doc.data().images[0] : util.FunctionsConstants.DefualtImage,
                                    },
                                },
                            },
                            {
                                md: [
                                    {
                                        _attr: {
                                            style: '',
                                        },
                                    },
                                   `${doc.data().name} ${doc.data().age}
                                    ${doc.data().location}
                                   `,
                                ],
                            },
                        ],
                    };
                    usersList.push(item);
                }

                if (docs.docs.length == 2) {
                    const currentIndex = docs.docs[docs.docs.length - 1].id;
                    await document.ref.update({currentIndex: currentIndex});
                } else {
                    await document.ref.update({currentIndex: ''});
                }

                const newUsersList = addNextButtonItemXML(usersList, uid);

                const docXML = [{
                    doc: [
                        {
                            _attr: {
                                title: util.FunctionsConstants.Binu,
                            },
                        },
                        {
                            list: [
                                ...newUsersList,
                            ],
                        },
                    ],
                }];

                res.status(200).send(xml(docXML, true));
                return;
            });
        } catch (error) {
            console.error(util.ErrorMessages.ErrorText, error);
            res.status(404).send(util.ErrorMessages.UnexpectedExrror);
            return;
        }
    });
};

function addNextButtonItemXML(itemsArray:any [], uid: string) {
    const item = {
        item: [
            {
                img: {
                    _attr: {
                        url: 'https://firebasestorage.googleapis.com/v0/b/umtuwam.appspot.com/o/logos%2Fnext_button.png?alt=media&token=cc78d78b-dac0-4d58-b1a4-f8173ab6846a',
                    },
                },
            },
            {
                _attr: {
                    style: '',
                    href: `http://localhost:5001/umtuwam/us-central1/getProspectiveDatesXML?id=${uid}`,
                    layout: 'relative',
                },
            },
            {
                md: [
                    {
                        _attr: {
                            style: '',
                        },
                    },
                    util.FunctionsConstants.Next,
                ],
            },
        ],
    };
    itemsArray.push(item);
    return itemsArray;
}

export {
    getAppXML,
    getStartup,
    getChatsView,
    getProfileView,
    viewUserProfile,
    getPreferencesView,
    getProspectiveDates,
    getMembershipPageXML,
    getProspectiveDatesXML,
};

                                // {
                                //     item: [
                                //         {
                                //             _attr: {
                                //                 style: '',
                                //                 href: `https://us-central1-umtuwam.cloudfunctions.net/likeUser?uid=${doc.id}`,
                                //                 layout: 'relative',
                                //             },
                                //         },
                                //     ],
                                // },
