import React from 'react';
import HeroSection from './herosection/HeroSection';
import AllBranch from './AllBranch';
import HomeCatalog from './home/HomeCatalog';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <HomeCatalog/>
            <AllBranch/>
        </div>
    );
};

export default Home;
