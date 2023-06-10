import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
const TableBook = (number) => {
    number = 0
    const [data, setData] = useState([]);
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const booksPerPage = 5
    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .then((err) => console.log(err));
    }, []);
    useEffect(() => {
        setBooks(data);
        setTotalBooks(data.length)
    }, [data])
    const DeleteBook = (id) => {
        if (window.confirm("Bạn muốn xóa quyển sách này ?"))
            fetch(`http://localhost:8080/books/delete/` + id, {
                method: "DELETE",

            }).then((res) => {
                alert('Xóa thành công!')
                window.location.reload()
            })
    }
    const addBook = () => {
        if (window.confirm("Bạn muốn thêm sách ?"))
            window.location.href = "/addbook";
    }
    return (<>

        <div className="d-grid gap-2 my-3">
            <Link onClick={addBook} className='btn btn-success mx-3' size="lg">Add Book</Link>
        </div>
        <Table striped bordered hover variant="black">
            <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Ngày phát hành</th>
                    <th>Số trang</th>
                    <th>Số lượng đã bán</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* filter((book) => book.id <= (number + 5) && book.id > number). */}
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title.toUpperCase()}</td>
                        <td>{book.author.toUpperCase()}</td>
                        <td>{book.category}</td>
                        <td>{book.date}</td>
                        <td>{book.npage}</td>
                        <td>{book.nsold}</td>
                        <td>
                            <Link to={`/bookdetail/${book.id}`} className="btn btn-warning mx-3">View</Link>
                            <button className='btn btn-danger mx-3' onClick={() => DeleteBook(book.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

    </>
    );
}

export default TableBook;