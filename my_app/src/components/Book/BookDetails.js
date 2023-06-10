import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from 'react-router-dom';
import "./BookList.css";
import Footer from "../Footer/Footer";
import isEmpty from "validator/lib/isEmpty"
import Form from 'react-bootstrap/Form';
const BookDetail = (props) => {
    const params = useParams();
    const [book, setBook] = useState({});
    const id = params.id;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [about, setAbout] = useState('');
    const [date, setDate] = useState('');
    const [npage, setNpage] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [validationMsg, setValidationMsg] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        // Gọi API để lấy thông tin về book dựa trên id
        fetch(`http://localhost:8080/books/${id}`)
            .then(response => response.json())
            .then(data => {
                // Cập nhật state của book với thông tin lấy được
                setBook(data);
                console.log(data.image)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);
    const onSaveClick = async () => {
        const msg = {};
        const isValid = validateAll()
        if (!isValid) return false
        const count = Object.keys(book).length;
        console.log(count)
        if (window.confirm("Bạn muốn thêm sách ?")) {
            if (count > 0) {
                try {
                    const response = await fetch(`http://localhost:8080/books/${book.title}/${book.author}`);
                    const bookData = await response.json();
                    console.log("conga")
                    console.log(bookData)
                    if (bookData) {
                        msg.title = "Sách đã tồn tại"
                        msg.author = "Sách đã tồn tại"
                        setValidationMsg(msg)
                        return false
                    }

                }
                catch {

                }
                fetch(`http://localhost:8080/books/add`, {
                    method: "POST",
                    mode: "cors",

                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(book),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))
            } else {
                console.log("ga gaga")
            }
            console.log(isEditing)
            navigate('/admin')
        }


    };
    const onUpdateClick = () => {
        const msg = {};
        const isValid = validateAll()
        if (!isValid) return false
        fetch(`http://localhost:8080/books/update/${book.id}`, {
            method: 'PUT', // hoặc 'PATCH' tùy thuộc vào API của bạn
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then(response => response.json())
            .then(updatedBook => {
                // Xử lý kết quả trả về từ API nếu cần
                console.log('Book updated:', updatedBook);
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
        navigate('/admin')
    }
    function handleChange(e) {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;
        setBook(prevBook => ({
            ...prevBook,
            image: fileName,
            nsold: 0
        }));
        setFile(URL.createObjectURL(selectedFile));
    }

    const handleTitleChange = (e) => {
        const value = e.target.value;
        const valuetitle = value.toLowerCase();
        setTitle(valuetitle)
        const updatedBook = { ...book, title: valuetitle };
        console.log("new title", valuetitle)
        setBook(updatedBook);
    }

    const handleAuthorChange = (e) => {
        const value = e.target.value;
        const valueauthor = value.toLowerCase();
        setAuthor(valueauthor)
        const updatedBook = { ...book, author: valueauthor };
        setBook(updatedBook);
    }

    function handleAboutChange(e) {
        const value = e.target.value;
        setAbout(value)
        setBook(prevBook => ({
            ...prevBook,
            about: value
        }));
    }

    function handleDateChange(e) {
        const value = e.target.value;
        setDate(value)
        setBook(prevBook => ({
            ...prevBook,
            date: value
        }));
    }

    function handleNPageChange(e) {
        const value = e.target.value;
        setNpage(value)
        setBook(prevBook => ({
            ...prevBook,
            npage: value
        }));
    }

    function handleCategoryChange(e) {
        const value = e.target.value;
        setCategory(value)
        setBook(prevBook => ({
            ...prevBook,
            category: value
        }));
    }
    console.log(isEditing)
    function handleEditClick() {
        setIsEditing(true);
    }
    const validateAll = () => {
        const msg = {}
        if (isEmpty(title) && book.title == null) {
            msg.title = "Vui lòng tiêu đề sách"
        }
        if (isEmpty(author) && book.author == null) {
            msg.author = "Vui lòng nhập tên tác giả"
        }
        if (isEmpty(about) && book.about == null) {
            msg.about = "Vui lòng nhập mô tả sách"
        }
        if (isEmpty(npage) && book.npage == null) {
            msg.npage = "Vui lòng nhập số trang"
        }
        if (isEmpty(date) && book.date == null) {
            msg.date = "Vui lòng nhập ngày phát hành"
        }
        if (file == null && book.image == null) {
            msg.file = "Hãy tải ảnh lên"
        }
        if (isEmpty(category) && book.category == null) {
            msg.category = "Vui lòng nhập thể loại";
        }
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    return (
        <>
            <div className="container book-detail">
                <div className="book items-1 ">
                    <span className="text"><b>Tiêu đề</b></span>
                    <p className="text-notif">{validationMsg.title}</p>
                    <input
                        id='title'
                        name='title'
                        type="text"
                        className="text-input "
                        value={book.title || ''}
                        onChange={handleTitleChange}
                        disabled={!isEditing}
                    />

                </div>
                <div className="book items-2 ">
                    <span className="text"><b>Tác giả</b></span>
                    <p className="text-notif">{validationMsg.author}</p>
                    <input
                        id='author'
                        name='author'
                        type="text"
                        className="text-input "
                        value={book.author || ''}
                        onChange={handleAuthorChange}
                        disabled={!isEditing}
                    />

                </div>

                <div className="book items-3">
                    <div className="upload">
                        <label htmlFor='img' className="btn btn-danger btn-upload">Upload</label>
                        <input
                            id='img'
                            type="file"
                            onChange={handleChange}
                            hidden
                            defaultValue={book.image}
                            disabled={!isEditing}
                        />
                        <p className="text-notif">{validationMsg.file}</p>
                        <img className="img my-4" src={file ? file : `${process.env.PUBLIC_URL}/image/${book.image}`} />

                    </div>
                </div>
                <div className="book items-4">
                    <span><b>Mô tả về sách</b></span>
                    <p className="text-notif">{validationMsg.about}</p>
                    <textarea
                        type="text"
                        className="text-area my-2"
                        value={book.about || ''}
                        onChange={handleAboutChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="book items-5">
                    <span><b>Ngày phát hành</b></span>
                    <p className="text-notif">{validationMsg.date}</p>
                    <input
                        type="date"
                        className="text-input my-2"
                        value={book.date || ''}
                        onChange={handleDateChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="book items-6">
                    <span><b>Số trang</b></span>
                    <p className="text-notif">{validationMsg.npage}</p>
                    <input
                        type="number"
                        className="text-input my-2"
                        value={book.npage || ''}
                        onChange={handleNPageChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className="book items-7">
                    <span><b>Thể loại</b></span>
                    <p className="text-notif">{validationMsg.category}</p>
                    <select type="text"
                        className="text-input my-2"
                        value={book.category || ''}
                        onChange={handleCategoryChange}
                        disabled={!isEditing}>
                        <option>None</option>
                        <option>Truyện ngắn</option>
                        <option>Tình cảm</option>
                        <option>Trinh thám</option>
                        <option>Kiến trúc</option>
                        <option>Tâm lý</option>
                        <option>Văn học</option>
                    </select>
                    {/* <input
                        type="text"
                        className="text-input my-2"
                        value={book.category || ''}
                        onChange={handleCategoryChange}
                        disabled={!isEditing}
                    /> */}
                </div>
            </div>
            <Footer
                isEditing={isEditing}
                onEditClick={handleEditClick}
                onSaveClick={onSaveClick}
                onUpdateClick={onUpdateClick}
            />
        </>
    );
}

export default BookDetail;
