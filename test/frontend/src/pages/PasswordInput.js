import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';


export default function PasswordInput(prop) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<InputGroup size='md'>
			<Input type={show ? 'text' : 'password'}
				placeholder='password'
				onChange={prop.onChange}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}
