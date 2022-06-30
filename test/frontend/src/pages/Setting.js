import React, { useState, useEffect  } from 'react';
import { VStack, HStack, Box, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { PhoneIcon, CalendarIcon } from '@chakra-ui/icons';
import PasswordInput from './PasswordInput';
import AlertBox from './AlertBox';
import axios from 'axios';


export default function Setting() {
	const [id, setId] = useState();
	const [pw, setPw] = useState();
	const [phone, setPhone] = useState();
	const [name, setName] = useState();
	const [response, setResponse] = useState();
	const [error, setError] = useState(false);
	const [sent, setSent] = useState(false);

	const Update = () => {
		const reg = async () => {
			const res = await axios.post('http://localhost:8000/setting', {
				"id": id,
				"password": pw,
				"phone":phone,
				"name":name
			});
			setResponse(res.data);
			setSent(true);
			setError(!res.data.success);
		}
		reg();
	};

	const Delete = () => {
		const del = async () => {
			const res = await axios.post('http://localhost:8000/delete', {
				"id":id,
				"password": pw
			});
			setResponse(res.data);
			setSent(true);
			setError(!res.data.success);
		}
		del();
	}

	return (
		<Box maxW='md' borderWidth='1px' borderRadius='lg' mr='auto' ml='auto' p={5}>
			<VStack spacing={5}>
				{ sent ? ( error ?
						<AlertBox status='error' description={response.message} /> :
						<AlertBox status='success' description={response.message} />) : "" }
				<Input placeholder='id' onChange={(e) => {setId(e.target.value)}} />
				<PasswordInput onChange={(e) => {setPw(e.target.value)}}/>
				<Input placeholder='name' onChange={(e) => { setName(e.target.value) }} />
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<PhoneIcon color='gray.300' />} />
					<Input type='tel' placeholder='Phone number' 
						onChange={(e) => { setPhone(e.target.value) }} />
				</InputGroup>
				<HStack>
					<Button onClick={Update}>Update</Button>
					<Button onClick={Delete} colorScheme='red'>Delete</Button>
				</HStack>
			</VStack>
		</Box>
	);
}
