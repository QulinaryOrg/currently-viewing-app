import React from 'react';
import PropTypes from 'prop-types';
import IpListItem from './IpListItem';

class IpList extends React.PureComponent {
  render() {
    const { ownIp, ips } = this.props;

    return (
      <ul className="IpList">
        {ips.map(ip => <IpListItem key={ip} ip={ip} you={ip === ownIp} />)}
      </ul>
    );
  }
}

IpList.propTypes = {
  ownIp: PropTypes.string.isRequired,
  ips: PropTypes.array.isRequired,
};

export default IpList;
