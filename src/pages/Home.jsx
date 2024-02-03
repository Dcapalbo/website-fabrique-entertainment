/** @format */

import FilterDataSelect from '../components/UI/select/filterDataSelect';
import CardContainer from '../components/UI/cardContainer/cardContainer';
import { dataSelectActions } from '../store/data-select-slice';
import Accordion from '../components/UI/accordion/accordion';
import FilmCard from '../components/UI/filmCard/filmCard';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { serverUrl } from '../utils/constants';
import Hero from '../components/hero/hero';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

const Home = () => {
	const [type, setType] = useState('');
	const dispatch = useDispatch();

	const sendTypeHandler = (event) => {
		const value = event.target.value;
		dispatch(dataSelectActions.setDataType(value));
		setType(value);
	};

	return (
		<>
			<Header />
			<Hero />
			<Accordion />
			<FilterDataSelect
				onChange={sendTypeHandler}
				type={type}
			/>
			<CardContainer
				component={FilmCard}
				fetchDataUrl={`${serverUrl}/get-films`}
			/>
			<Footer />
		</>
	);
};

export default Home;
