import React, { useState, useEffect  } from 'react';
import { VStack, Box, Button, Input } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import AlertBox from './AlertBox';
import axios from 'axios';


export default function Register() {
	const [id, setId] = useState();
	const [pw, setPw] = useState();
	const [response, setResponse] = useState();
	const [error, setError] = useState(false);
	const [sent, setSent] = useState(false);

	const Register = () => {
		const reg = async () => {
			const res = await axios.post('http://localhost:8000/register', {
				"id": id,
				"password": pw
			});
			setResponse(res.data);
			setSent(true);
			setError(!res.data.success)
		}
		reg();
	};

	return (
		<Box maxW='md' borderWidth='1px' borderRadius='lg' mr='auto' ml='auto' p={5}>
			<VStack spacing={5}>
				{ sent ? ( error ?
						<AlertBox status='error' description={response.message} /> :
						<AlertBox status='success' description={response.message} />) : "" }
				<Input placeholder='id' onChange={(e) => {setId(e.target.value)}}/>
				<PasswordInput onChange={(e) => {setPw(e.target.value)}}/>
				<Button onClick={Register}>Register</Button>
			</VStack>
		</Box>
	);
}
