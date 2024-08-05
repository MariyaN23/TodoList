import React from 'react';
import errorImg from './404image.png'

export const Error404 = () => {
    return (
        <div>
            <div >
                <img style={{width: '600px', height: '250px'}} src={errorImg} alt={'Page not found'}/>
            </div>
            <b>
                Sorry, the page not found
            </b>
        </div>
    );
};