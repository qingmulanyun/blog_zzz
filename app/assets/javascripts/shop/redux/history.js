import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import store from './configureStore';


const history = syncHistoryWithStore(browserHistory, store);

export default history