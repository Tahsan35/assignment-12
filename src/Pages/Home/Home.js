import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Parts from './Parts';
import Reviews from './Reviews';
import Services from './Services';
import StaredToday from './StaredToday';

const Home = () => {
    return (
        <div>
            <Banner />
            <Parts />
            <BusinessSummary />
            <Reviews />
            <StaredToday />
            <Services />
            <Footer />
        </div>
    );
};

export default Home;