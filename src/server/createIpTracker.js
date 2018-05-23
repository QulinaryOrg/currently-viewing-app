const createIpTracker = onChange => {
  const ips = {};

  const getIps = () => Object.keys(ips).reverse();

  const handleConnect = (ip, socket) => {
    if (ips[ip]) {
      ips[ip].connections += 1;
    } else {
      ips[ip] = {
        ip: ip,
        connections: 1,
      };
      if (onChange) {
        onChange(getIps(), socket);
      }
    }
  };

  const handleDisconnect = (ip, socket) => {
    if (!ips[ip]) {
      // handle disconnect an ip which isn't connected
      return;
    }

    if (ips[ip].connections > 1) {
      ips[ip].connections -= 1;
    } else {
      delete ips[ip];
      if (onChange) {
        onChange(getIps(), socket);
      }
    }
  };

  return {
    getIps,
    handleConnect,
    handleDisconnect,
  };
};

export default createIpTracker;
