import { useApp } from '@/composables/useApp';
const initStorageLocal = async () => {
    console.log('BACKGROUND: initStorageLocal');
    const { CONS } = useApp();
    const storageLocal = await browser.storage.local.get();
    if (storageLocal.service === undefined) {
        await browser.storage.local.set({
            service: CONS.DEFAULTS.STORAGE.service
        });
    }
    if (storageLocal.skin === undefined) {
        await browser.storage.local.set({ skin: CONS.DEFAULTS.STORAGE.skin });
    }
    if (storageLocal.indexes === undefined) {
        await browser.storage.local.set({
            indexes: CONS.DEFAULTS.STORAGE.indexes
        });
    }
    if (storageLocal.materials === undefined) {
        await browser.storage.local.set({
            materials: CONS.DEFAULTS.STORAGE.materials
        });
    }
    if (storageLocal.markets === undefined) {
        await browser.storage.local.set({
            markets: CONS.DEFAULTS.STORAGE.markets
        });
    }
    if (storageLocal.exchanges === undefined) {
        await browser.storage.local.set({
            exchanges: CONS.DEFAULTS.STORAGE.exchanges
        });
    }
    if (storageLocal.sAccountActiveId === undefined) {
        await browser.storage.local.set({
            sAccountActiveId: -1
        });
    }
    if (storageLocal.items_per_page_stocks === undefined) {
        await browser.storage.local.set({
            items_per_page_stocks: CONS.DEFAULTS.STORAGE.items_per_page_stocks
        });
    }
    if (storageLocal.items_per_page_transfers === undefined) {
        await browser.storage.local.set({
            items_per_page_transfers: CONS.DEFAULTS.STORAGE.items_per_page_transfers
        });
    }
};
const useListener = () => {
    const { CONS } = useApp();
    const appUrls = { url: browser.runtime.getURL(CONS.RESOURCES.INDEX) + '*' };
    const onClick = async () => {
        console.log('BACKGROUND: onClick');
        const start = async () => {
            console.log('BACKGROUND: onClick: start');
            const foundTabs = await browser.tabs.query(appUrls);
            if (foundTabs.length === 0) {
                await browser.tabs.create({
                    url: browser.runtime.getURL(CONS.RESOURCES.INDEX),
                    active: true
                });
            }
            else {
                await browser.windows.update(foundTabs[0].windowId ?? 0, {
                    focused: true
                });
                await browser.tabs.update(foundTabs[0].id ?? 0, { active: true });
            }
        };
        await start();
    };
    const onRemove = (permissions) => {
        console.warn('BACKGROUND: onRemove');
        const { notice } = useApp();
        notice(['Online data might not be available.', JSON.stringify(permissions)]);
    };
    const onInstall = () => {
        console.log('BACKGROUND: onInstall');
        const onSuccess = (ev) => {
            console.log('BACKGROUND: onInstall: onSuccess');
            ev.target.result.close();
        };
        const onError = (err) => {
            console.error('BACKGROUND: onError: ', err.message);
        };
        const onUpgradeNeeded = async (ev) => {
            console.info('BACKGROUND: onInstall: onUpgradeNeeded', ev.oldVersion);
            const createDB = () => {
                console.log('BACKGROUND: onInstall: onUpgradeNeeded: createDB');
                const requestCreateAccountStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.ACCOUNT, {
                    keyPath: 'cID',
                    autoIncrement: true
                });
                const requestCreateBookingStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKING, {
                    keyPath: 'cID',
                    autoIncrement: true
                });
                const requestCreateAccountFrameStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKING_TYPE, {
                    keyPath: 'cID',
                    autoIncrement: true
                });
                requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNT}_uk1`, 'cID', { unique: true });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_uk1`, 'cID', { unique: true });
                requestCreateAccountFrameStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPE}_uk1`, 'cID', { unique: true });
                requestCreateAccountFrameStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPE}_k1`, 'cName', { unique: true });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_k1`, 'cAccountID', { unique: false });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_k2`, 'cAccountTypeID', { unique: false });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_k3`, 'cDate', { unique: false });
            };
            const updateDB = () => {
                console.log('BACKGROUND: onInstall: onUpgradeNeeded: updateDB');
            };
            const updateStorageLocal = async () => {
                const storageKeys = Object.keys(CONS.DEFAULTS.STORAGE);
                const storageValues = Object.values(CONS.DEFAULTS.STORAGE);
                const storage = await browser.storage.local.get(storageKeys);
                for (let i = 0; i < storageKeys.length; i++) {
                    if (storage[storageKeys[i]] === undefined) {
                        await browser.storage.local.set({
                            [storageKeys[i]]: storageValues[i]
                        });
                    }
                }
            };
            if (ev.oldVersion === 0) {
                createDB();
            }
            else {
                updateDB();
                await browser.storage.local
                    .remove(CONS.SYSTEM.STORAGE_OLD);
            }
            await updateStorageLocal();
        };
        const dbOpenRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION);
        dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
        dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
        dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE);
    };
    return { onClick, onRemove, onInstall };
};
const { onClick, onRemove, onInstall } = useListener();
if (!browser.runtime.onInstalled.hasListener(onInstall)) {
    browser.runtime.onInstalled.addListener(onInstall);
}
if (!browser.action.onClicked.hasListener(onClick)) {
    browser.action.onClicked.addListener(onClick);
}
if (!browser.permissions.onRemoved.hasListener(onRemove)) {
    browser.permissions.onRemoved.addListener(onRemove);
}
await initStorageLocal();
console.info('--- background.js ---', window.location.href);
