import React from "react";

import { setChannels } from "../../slices/channelSlice";
import { useGetChannelsQuery } from "../../services/channelApi";
import { useDispatch } from "react-redux";

import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const ChannelList = (props) => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  useDispatch(setChannels(data));

  if (isLoading) return null;

	return (
		<div className="flex-column">
			<Container className="justify-content-between">
				<b>Каналы</b>
				<Button onClick={() => console.log('yay')}>add</Button>
			</Container>
			<Container>
        <ListGroup>
          {data.map((channel) => (
            <ListGroup.Item action>
              {`# ${channel.name}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
			</Container>
		</div>
	);
};

export default ChannelList;