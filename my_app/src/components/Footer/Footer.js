import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import "./Footer.css"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function Footer({ isEditing, onEditClick, onSaveClick, onUpdateClick }) {
    const location = useLocation();
    const path = location.pathname;
    const [isToggled, setIsToggled] = useState(isEditing)
    const isEditBook = path.includes('/bookdetail');
    const isAddBook = path.includes('/addbook')
    console.log("ngu")
    useEffect(() => {
        if (isAddBook) {
            onEditClick();
        }
    }, [isAddBook]);

    const clickEdit = () => {
        onEditClick();
        if (isToggled) {
            onUpdateClick();
        } else {
            setIsToggled(true);
        }
    }
    return (
        <div className="footer">
            {isAddBook && (
                <Button onClick={onSaveClick} className="btn btn-danger">Add
                </Button>
            )}
            {isEditBook && (
                <Button onClick={clickEdit} className='btn btn-danger'>{isToggled ? 'Save' : 'Edit'}</Button>
            )

            }
        </div>
    );






}

export default Footer;
