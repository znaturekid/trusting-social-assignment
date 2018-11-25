import React, {
    Component
} from 'react';
import {
    Provider
} from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/home';
import DetailPage from './pages/detail';
class App extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <Provider store = {store}>
                <Router>
                    <div>
                        <Route exact path='/detail/' component={DetailPage} />
                        <Route path='/' component={HomePage} />
                    </div>
            </Router>
            </Provider>
        );
    }
}

export default App;