import React, {useEffect} from "react";

import { Avatar, CardHeader } from "@material-ui/core";

import { i18n } from "../../translate/i18n";

const http = require('https');

const TicketInfo = ({ contact, ticket, onClick }) => {
	
	const [tags, setTags] = React.useState([]);

	const ZDGGetTags = (() => {
		const init = {
		host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
		path: '/getZDGUserTags/' + contact.number,
		method: 'GET',
		};
		const callback = function(response) {
		let result = Buffer.alloc(0);
		response.on('data', function(chunk) {
			result = Buffer.concat([result, chunk]);
		});
		
		response.on('end', function() {
			let myArray = JSON.parse(result);
			setTags(myArray)
		});
	};
	const req = http.request(init, callback);
	req.end();
	})

	useEffect(() => {
		ZDGGetTags();
		// eslint-disable-next-line
	}, []);

	return (
		<CardHeader
			onClick={onClick}
			style={{ cursor: "pointer" }}
			titleTypographyProps={{ noWrap: true }}
			subheaderTypographyProps={{ noWrap: true }}
			avatar={<Avatar src={contact.profilePicUrl} alt="contact_image" />}
			title={`${contact.name} #${ticket.id}`}
			subheader={ 
				<p>{ticket.user && `${i18n.t("messagesList.header.assignedTo")} ${ticket.user.name}`}
				<br></br>{`Tags: ` + tags}</p>
			}
		/>
	);
};

export default TicketInfo;
