import { useApp } from '@/composables/useApp';
const initStorageLocal = async () => {
    console.log('BACKGROUND: initStorageLocal');
    const { CONS } = useApp();
    const storageLocal = await browser.storage.local.get();
    if (storageLocal.skin === undefined) {
        await browser.storage.local.set({ skin: CONS.DEFAULTS.STORAGE.skin });
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
                const requestCreateAccountStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.ACCOUNTS.NAME, {
                    keyPath: CONS.DB.STORES.ACCOUNTS.FIELDS.ID,
                    autoIncrement: true
                });
                const requestCreateBookingStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKINGS.NAME, {
                    keyPath: CONS.DB.STORES.BOOKINGS.FIELDS.ID,
                    autoIncrement: true
                });
                const requestCreateBookingTypeStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKING_TYPES.NAME, {
                    keyPath: CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID,
                    autoIncrement: true
                });
                requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk1`, CONS.DB.STORES.ACCOUNTS.FIELDS.ID, { unique: true });
                requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk2`, CONS.DB.STORES.ACCOUNTS.FIELDS.N, { unique: true });
                requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID, { unique: true });
                requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk2`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.N, { unique: true });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_uk1`, CONS.DB.STORES.BOOKINGS.FIELDS.ID, { unique: true });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k1`, CONS.DB.STORES.BOOKINGS.FIELDS.DAT, { unique: false });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k2`, CONS.DB.STORES.BOOKINGS.FIELDS.T, { unique: false });
                requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k3`, CONS.DB.STORES.BOOKINGS.FIELDS.AN, { unique: false });
            };
            const updateDB = () => {
                console.log('BACKGROUND: onInstall: onUpgradeNeeded: updateDB');
            };
            if (ev.oldVersion === 0) {
                createDB();
            }
            else {
                updateDB();
                await browser.storage.local
                    .remove(CONS.SYSTEM.STORAGE_OLD);
            }
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
