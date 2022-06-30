import React, { useState, useEffect  } from 'react';
import { VStack, Box, Button, Input } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import AlertBox from './AlertBox';
import axios from 'axios';


export default function Login() {
	const [id, setId] = useState();
	const [pw, setPw] = useState();
	const [response, setResponse] = useState();
	const [error, setError] = useState(false);
	const [sent, setSent] = useState(false);

	const Login = () => {
		const fetch = async () => {
			const res = await axios.post('http://localhost:8000/login', {
				"id": id,
				"password": pw
			});
			setResponse(res.data);
			setSent(true);
			setError(!res.data.success);
		}
		fetch();
	};

	return (
		<Box maxW='md' borderWidth='1px' borderRadius='lg' mr='auto' ml='auto' p={5}>
			<VStack spacing={5}>
				{ sent ? ( error ? 
							<AlertBox status='error' description={response.message} /> :
							<AlertBox status='success' description={response.message} />) : ""
				}
				<Input placeholder='id' onChange={(e) => { setId(e.target.value) }} />
				<PasswordInput onChange={(e) => { setPw(e.target.value) }} />
				<Button onClick={Login}>Login</Button>
			</VStack>
		</Box>
	);
}

