export default [() => {
  let socket = null;

  const connectToSocket = () => {
    socket = io.connect('http://' + location.host);

    return socket; 
  }

  const isConnected = () => { 
    return socket ? true : false; 
  };

  const getSocket = () => {
    return socket;
  };

  return {
    isConnected: isConnected,
    getSocket: getSocket,
    connectToSocket: connectToSocket
  }
}];