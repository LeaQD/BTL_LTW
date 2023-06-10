import React from 'react';
import Book from "../Book/Book";
// import coverImg from "../../images/cover_not_found.jpg";
import "../Book/BookList.css"
import { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .then((err) => console.log(err));
    }, []);
    useEffect(() => {
        setBooks(data);
        // setTotalBooks(data.length)
    }, [data])
    const booksWithCovers = books.map((book) => {
        return {
            ...book,

        }
    });

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='booklist-content grid'>
                    {
                        booksWithCovers.map((book) => {
                            return (
                                <Book key={book.id} {...book} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Home