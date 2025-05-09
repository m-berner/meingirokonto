import {} from 'vue';
import { useApp } from '@/pages/background';
import AddAccount from '@/components/dialogs/AddAccount.vue';
import DeleteAccount from '@/components/dialogs/DeleteAccount.vue';
import AddBookingType from '@/components/dialogs/AddBookingType.vue';
import DeleteBookingType from '@/components/dialogs/DeleteBookingType.vue';
import AddBooking from '@/components/dialogs/AddBooking.vue';
import ExportDatabase from '@/components/dialogs/ExportDatabase.vue';
import ImportDatabase from '@/components/dialogs/ImportDatabase.vue';
import ShowAccounting from '@/components/dialogs/ShowAccounting.vue';
import DeleteBooking from '@/components/dialogs/DeleteBooking.vue';
const { CONS, log } = useApp();
export default {
    install: (app) => {
        app.component(CONS.DIALOGS.ADD_ACCOUNT, AddAccount);
        app.component(CONS.DIALOGS.DELETE_ACCOUNT, DeleteAccount);
        app.component(CONS.DIALOGS.ADD_BOOKING_TYPE, AddBookingType);
        app.component(CONS.DIALOGS.DELETE_BOOKING_TYPE, DeleteBookingType);
        app.component(CONS.DIALOGS.ADD_BOOKING, AddBooking);
        app.component(CONS.DIALOGS.DELETE_BOOKING, DeleteBooking);
        app.component(CONS.DIALOGS.EXPORT_DATABASE, ExportDatabase);
        app.component(CONS.DIALOGS.IMPORT_DATABASE, ImportDatabase);
        app.component(CONS.DIALOGS.SHOW_ACCOUNTING, ShowAccounting);
    }
};
log('--- PLUGINS components.js ---');
