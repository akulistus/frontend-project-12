import React, { useEffect } from "react";

import { setChannels, setSelected } from "../../slices/channelSlice";
import { useGetChannelsQuery } from "../../services/channelApi";
import { useDispatch } from "react-redux";

import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const ChannelList = (props) => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  const dispath = useDispatch();

  useEffect(() => {
    dispath(setChannels(data));
  }, []);

  const handleSelect = (eventKey) => {
    const selected = data.find((channel) => channel.name === eventKey);
    dispath(setSelected(selected));
  };

  if (isLoading) return null;

	return (
		<div className="d-flex flex-column bg-dark-subtle border-end h-100">
			<Container className="d-flex justify-content-between p-4 mt-1 mb-2 pe-2">
				<b>Каналы</b>
				<Button onClick={() => console.log('yay')}>add</Button>
			</Container>
			<Container className="h-100">
        <Nav as='ul' variant="pills" className="flex-column" onSelect={handleSelect}>
          {data.map((channel) => (
            <Nav.Item action as='li'>
              <Nav.Link eventKey={channel.name}>{`# ${channel.name}`}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
			</Container>
		</div>
	);
};

export default ChannelList;