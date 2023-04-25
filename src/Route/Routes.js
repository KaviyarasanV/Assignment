import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Customer from '../Container/Customer/index';
import Header from '../Container/Header/Header';

function AppRouter() {

    return (
        <div>
            <Router>
            <Header/>
                <Routes>
                    <Route exact path="/" element={<Customer />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouter;