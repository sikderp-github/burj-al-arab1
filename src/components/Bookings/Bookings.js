import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    //to load changeable data from backend server
    const [bookings, setBookings] = useState([]);
    const [loggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/bookings?email=' + loggedInUser.email, {
            method: 'GET', // get data from sessionStorage
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        })

            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length} bookings. </h3>
            {
                bookings.map(book => <li key={book._id}>{book.name} from: {new Date(book.checkIn).toDateString('dd/MM/yy')} to: {new Date(book.checkOut).toDateString('dd/MM/yy')}</li>)
            }
        </div>
    );
};

export default Bookings;