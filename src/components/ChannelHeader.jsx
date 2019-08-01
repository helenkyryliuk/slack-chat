import React from 'react';
import connect from '../connect';
import { currentChannelSelector } from '../selectors';

const mapStateToProps = state => ({
  currentChannel: currentChannelSelector(state),
});

  @connect(mapStateToProps)

class ChannelHeader extends React.Component {
    render() {
      const {
        currentChannel,
      } = this.props;
      return (
        <div>{currentChannel.map(({ name, id }) => <h3 key={id}>{name}</h3>)}</div>
      );
    }
  }

export default ChannelHeader;
