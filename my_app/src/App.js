import './App.scss';
import TableBook from './components/Book/TableBook';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';
import BookDetail from './components/Book/BookDetails';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import BookAbout from './components/Book/BookAbout';
import CartPage from './components/Cart/CartPage';
import { CartProvider } from './components/Cart/CartContext.js';
function App() {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  return (
    <CartProvider>
      <div className='holder'>
        <Header />
        <Routes>
          <Route path='/cartpage' element={((token) ? <CartPage /> : <Login />)} />
          <Route path='/bookabout' element={(token && <BookAbout />)} />
          <Route path='register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin' element={((role == 'admin') ? <TableBook /> : <Login />)} />
          <Route path='login' element={<Login />} />
          <Route path='/addbook' element={((role == 'admin') ? <BookDetail /> : <Login />)} />
          <Route path='/bookdetail/:id' element={((role == 'admin') ? <BookDetail /> : <Login />)} />
          <Route path='/footer' element={((role == 'admin') ? <Footer /> : <Login />)} />
        </Routes>
      </div >
    </CartProvider>

  );
}

export default App;
