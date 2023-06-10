import React, { useEffect, useState } from 'react';
import "./BookList.css";
import { useNavigate } from 'react-router';
const Book = (book) => {
    const bookAbout = book;
    const token = localStorage.getItem("token")
    // console.log(bookAbout)
    const navigate = useNavigate();
    const aboutbook = () => {
        const queryParams = new URLSearchParams(bookAbout).toString();

        (token && navigate(`/bookabout?${queryParams}`));
    }
    return (
        <div onClick={aboutbook} className='book-item flex flex-column flex-sb' >
            <div className='book-item-img'>
                <img src={book.image ? `image/${book.image}` : 'image/default.png'} alt="cover" />
            </div>
            <div className='book-item-info text-center'>
                <div className='book-item-info-item title fw-7 fs-18'>
                    <span className='text-capitalize fw-7'>Tác phẩm: </span>
                    <span><b>{book.title.toUpperCase()}</b></span>
                </div>
                <div className='book-item-info-item author fs-20'>
                    <span className='text-capitalize fw-7'>Tác giả: </span>
                    <span>{book.author.toUpperCase()}</span>
                </div>
                <div className='book-item-info-item edition-count fs-15'>
                    <span className='text-capitalize fw-7'>Đã bán: </span>
                    <span>{book.nsold}</span>
                </div>

                <div className='book-item-info-item publish-year fs-15'>
                    <span className='text-capitalize fw-7'>Năm phát hành: </span>
                    <span>{book.date}</span>
                </div>
            </div>

        </div>
    )
}

export default Book;