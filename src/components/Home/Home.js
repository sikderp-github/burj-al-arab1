import React, { useState } from 'react';
import fakeData from '../../fakeData/fakeData';
import Room from '../Room/Room';


const Home = () => {
    const [suits] = useState(fakeData);
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
   
    return (
        <div style={style}>
            {/* {
                rooms.map(room => <Room key={room.bedType} room={room}></Room>)
            } */}
            {
                suits.map(room => <Room key={room.bedType} room={room}></Room>)
            }
        </div>
    );
};

export default Home;