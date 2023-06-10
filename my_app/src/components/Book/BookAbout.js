import "./BookList.css";
import { useLocation } from 'react-router';
import { CartContext, CartProvider } from '../Cart/CartContext';
import { useContext } from 'react';
const BookAbout = () => {
    const location = useLocation();
    const book = new URLSearchParams(location.search);
    // const { addToCart } = useContext(CartContext);
    const { cartItems, setCartItems } = useContext(CartContext);
    let cartItemss = {
        id: book.get('id'),
        title: book.get('title')
    }
    const addToCartClick = () => {
        console.log('Clicked on Add to Cart');
        setCartItems(cartItemss)
        console.log(cartItemss)
        // Có thể thêm các xử lý khác sau khi thêm sách vào giỏ hàng (ví dụ: hiển thị thông báo, chuyển hướng đến trang giỏ hàng, v.v.)
    };
    return (
        <div className='book-itemxx flex flex-column flex-sb' >
            <div className='book-item-img'>
                <img src={book.get('image') ? `image/${book.get('image')}` : 'image/default.png'} alt="cover" />
            </div>
            <div className='book-item-info text-center'>
                <div className='book-item-info-item title fw-7 fs-18'>
                    <span className='text-capitalize fw-7'>Tác phẩm: </span>
                    <span><b>{book.get('title').toUpperCase()}</b></span>
                </div>
                <div className='book-item-info-item author fs-20'>
                    <span className='text-capitalize fw-7'>Tác giả: </span>
                    <span>{book.get('author').toUpperCase()}</span>
                </div>
                <div className='book-item-info-item edition-count fs-15'>
                    <span className='text-capitalize fw-7'>Mô tả: </span>
                    <span>{book.get('about')}</span>
                </div>

                <div className='book-item-info-item publish-year fs-15'>
                    <span className='text-capitalize fw-7'>Năm phát hành: </span>
                    <span>{book.get('date')}</span>
                </div>
                <div className='button-cart'>
                    <button className='btn btn-success btn-cart' onClick={addToCartClick}>Thêm vào giỏ hàng</button>
                </div>

            </div>

        </div>

    )
}

export default BookAbout;