import React, { useState, useEffect  } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';


export default function AlertBox(prop) {
	return (
		<Alert status={prop.status}>
			<AlertIcon />
				{prop.title}
			<AlertTitle>
			</AlertTitle>
			<AlertDescription>
				{prop.description}
			</AlertDescription>
		</Alert>
	);
}
