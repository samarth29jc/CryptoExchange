import React from 'react';
import Home from './website/Home';
import AuthPage from './website/AuthPage';
import './website/styles.css';
import { Routes, Route } from 'react-router-dom';
import 

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<AuthPage />} />
				

			</Routes>
		</div>
	);
}

export default App;