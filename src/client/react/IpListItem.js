import React from 'react';
import PropTypes from 'prop-types';

class IpListItem extends React.PureComponent {
  render() {
    const { you, ip } = this.props;

    if (you) {
      return (
        <li className="IpListItem you">
          <img src="/img/waypoint-you.svg" alt="" />
          <span className="label">
            IP <span className="you-text">(You)</span>:
          </span>
          <span className="ip">{ip}</span>
        </li>
      );
    }

    return (
      <li className="IpListItem">
        <img src="/img/waypoint.svg" alt="" />
        <span className="label">IP:</span>
        <span className="ip">{ip}</span>
      </li>
    );
  }
}

IpListItem.propTypes = {
  you: PropTypes.bool.isRequired,
  ip: PropTypes.string.isRequired,
};

export default IpListItem;
