"use strict";
(window as any).DEBUG = true;
(window as any).ENVIRONMENTTYPE = 'Local';
(window as any).process = { env: { NODE_ENV: 'production' } };
(window as any).preloadedData = {
'clientSideApplicationId': '8be81a5c-af38-4bb2-af97-afa3b64dfbed',
//manifests: window.debugManifests.getManifests(),
spPageContextInfo: {
    listBaseTemplate: 119,
    cdnPrefix: 'test.sharepoint',
    CorrelationId: '00000000-0000-4000-b000-000000000000',
    currentCultureName: 'en-US',
    currentUICultureName: 'en-US',
    groupId: 0,
    groupType: 'Public',
    isAnonymousGuestUser: false,
    isAppWeb: true,
    isExternalGuestUser: false,
    isNoScriptEnabled: false,
    listId: '00000000-0000-4000-b000-000000000000',
    listPermsMask: { High: 0x7FFFFFFF, Low: 0xFFFFFFFF },
    listUrl: 'https://wwww.contoso.com/sites/workbench/lists/todo',
    listTitle: 'Todo List',
    pageItemId: -1,
    pagePermsMask: { High: 0x7FFFFFFF, Low: 0xFFFFFFFF },
    RecycleBinItemCount: -1,
    serverRequestPath: '/workbencch.aspx',
    siteAbsoluteUrl: 'https://wwww.contoso.com/',
    siteId: '00000000-0000-4000-b000-111111111111',
    siteClassification: 'ABC',
    sitePagesEnabled: true,
    siteServerRelativeUrl: '/',
    userDisplayName: 'User 1',
    userEmail: 'user1@contoso.com',
    userLoginName: 'user1@contoso.com',
    webAbsoluteUrl: 'https://wwww.contoso.com/sites/workbench',
    webId: '00000000-0000-4000-b000-222222222222',
    webLanguage: 'en-US',
    webLogoUrl: 'https://wwww.contoso.com/sites/workbench/test.jpg',
    webPermMasks: { High: 0x7FFFFFFF, Low: 0xFFFFFFFF },
    webServerRelativeUrl: '/sites/workbench',
    webTemplate: 'Blog',
    webTitle: 'Local Workbench',
},
contextWebInfo: {
    FormDigestTimeoutSeconds: 1800,
    FormDigestValue: 'Mock Digest'
}
};
(window as any)._spPageContextInfo=(window as any).preloadedData.spPageContextInfo;
