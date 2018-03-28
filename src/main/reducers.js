import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form' 
//dentro de redux há um elemento reducer, que estou renomeando para formReducer

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'

const rootReducer = combineReducers({
	dashboard: DashboardReducer,
	tab: TabReducer,
	billingCycle: BillingCycleReducer,
	form: formReducer
})

export default rootReducer