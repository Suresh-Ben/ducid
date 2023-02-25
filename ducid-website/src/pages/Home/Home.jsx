import React from 'react';

import './Home.css';
import Footer from '../../componenets/requires/Footer';
import Head from '../../componenets/Home/Head';
import About from '../../componenets/Home/About';
import Dev from '../../componenets/Home/Dev';

function Home() {
    return (
        <div>
            <Head/>
            <About/>
            <Dev/>
            <Footer/>
        </div>
    );
}

export default Home;