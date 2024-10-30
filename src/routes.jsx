

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Coin from './components/Coin'
import Favorites from './components/Favorites'
const RouterFunction = () => {
    return(
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/coin/:id' element={<Coin />} />
                <Route path='/favorites' element={<Favorites />} />
            </Routes>
        </Router>
    )
}

export default RouterFunction