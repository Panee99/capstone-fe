import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import appUserReducer from './slices/appUser';
import warehouseReducer from './slices/warehouse';
import customerReducer from './slices/customer';
import categoryReducer from './slices/category';
import productReducer from './slices/product';
import beginningVoucherReducer from './slices/beginningVoucher';
import userGroupReducer from './slices/userGroup';
import receiveVoucherRequestReducer from './slices/receiveVoucherRequest';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  appUser: appUserReducer,
  warehouse: warehouseReducer,
  customer: customerReducer,
  category: categoryReducer,
  product: productReducer,
  beginningVoucher: beginningVoucherReducer,
  userGroup: userGroupReducer,
  receiveVoucherRequest: receiveVoucherRequestReducer,

  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
});

export { rootPersistConfig, rootReducer };
