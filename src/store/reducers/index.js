// IMPORT MODULE FILES
import { home } from "./home";
import { orderShip } from "./orderShip";
import { tracking } from "./tracking";
import { product } from "./product";
import { order } from "./order";
import { qna } from "./qna";
import { settlement } from "./settlement";
import { statistic } from "./statistic";
import { authentication } from "./authentication";
import { profile } from './profile'
import { setAlerts } from "./alerts";
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    // MODULES VARIABLE
	home,
    orderShip,
    tracking,
	product,
	order,
	qna,
	settlement,
    statistic,
    authentication,
    profile,
    setAlerts
})

export default rootReducers
