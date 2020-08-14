// IMPORT MODULE FILES
import {RequestHome} from "./epicHome";
import {RequestTracking} from "./epicTracking";
import {RequestProduct} from "./epicProduct";
import {RequestProductCategories} from "./epicProductCategories";
import {RequestProductStockUpdate} from "./epicProductStockUpdate"
import {RequestOrderExt} from "./epicOrderExt";
import {RequestOrder} from "./epicOrder";
import {RequestOrderShip} from "./epicOrderShip";
import {RequestQna} from "./epicQna";
import {RequestSettlement} from "./epicSettlement";
import {RequestStatistic} from "./epicStatistic";
import {RequestAuthentication} from "./epicAuthentication";
import {RequestProfile} from "./epicProfile";
import {combineEpics} from "redux-observable";

const setupEpic = combineEpics(
	// MODULES VARIABLE
	RequestHome,
	RequestTracking,
	RequestProduct,
	RequestProductCategories,
	RequestProductStockUpdate,
	RequestOrderExt,
	RequestOrder,
	RequestQna,
	RequestSettlement,
	RequestStatistic,
	RequestAuthentication,
	RequestProfile,
	RequestOrderShip
)

export default setupEpic