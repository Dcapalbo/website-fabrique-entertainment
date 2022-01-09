import { Fragment } from 'react';

import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import Hero from "../components/hero/hero";
import CardContainer from '../components/UI/card/cardContainer';
import Footer from '../components/footer/footer';

const Home = () => {
    return (
        <Fragment>
            <Header>
                <Navigation/>
            </Header>
            <Hero></Hero>
            <CardContainer/>
            <Footer/>
        </Fragment>
    )
}

export default Home;