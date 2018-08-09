import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Introductions from '../components/introduction/intro';

const Introductionspage = (props) => {
    return (
        <div className="App">
            <Sidebar />
            <h1 className="pageHeader">Introductions</h1>
            <Introductions />
        </div>
    );
}