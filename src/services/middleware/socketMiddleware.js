export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    let reconnectTimer = 0;
    let url = undefined;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onClosed, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        url = payload;
        socket = new WebSocket(url);

        socket.onopen = (event) => {
          console.log("Соединение WebSocket открыто");
          dispatch({ type: onOpen, payload: "" });
        };

        socket.onerror = (event) => {
          console.log("Ошибка WebSocket");
          dispatch({ type: onError, payload: "" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          const { success, ...restParsedData } = parsedData;
          if (
            restParsedData.message === "Invalid or missing token" ||
            restParsedData.message === "jwt expired"
          ) {
            console.log("Ошибка: токен недействителен");
            dispatch({ type: onError, payload: restParsedData.message });
          } else {
            console.log("Получены данные от WebSocket");
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = (event) => {
          console.log("Соединение WebSocket закрыто");
          if (event.code !== 1000) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsInit, payload: url });
            }, 10000);
          }

          dispatch({ type: onClosed, payload: { code: event.code, reason: event.reason } });
        };
      } else if (type === onClose && socket) {
        socket.close(1000, "CLOSE_NORMAL");
        socket = null;
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
      }

      next(action);
    };
  };
};
