// import { useFeaturedBanners } from './utils/hooks/useFeaturedBanners';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HomepageContainer from './components/homepage/HomepageContainer';
import ProductListContainer from './components/products list/ProductListContainer';
import Header from './components/Header';
import Footer from './components/Footer';
import './stylesheets/homepage/header.scss';

function App() {
  // const { data, isLoading } = useFeaturedBanners();
  // console.log(data, isLoading);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomepageContainer />} />
        <Route path='/home' element={<HomepageContainer />} />
        <Route path='/products-list' element={<ProductListContainer />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
