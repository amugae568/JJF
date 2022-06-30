import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Text } from '@chakra-ui/react';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Setting from './pages/Setting';

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/Register" element={<Register />} />
					<Route path="/setting" element={<Setting />} />
					<Route path="*" element={<div>Page not found</div>} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
