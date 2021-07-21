import { escapeString } from "../utils/escapeString";

const uploadingQueue = (state = {}, action) => {
  let temp_queue = {};
  console.log("uploadqueue", action);

  switch (action.type) {
    case "ADD_QUEUE":
      //copy value
      Object.assign(temp_queue, state.uploadingQueue);

      //editing
      if (action.id !== null) {
        let content;
        try {
          content = escapeString(action.para);
        } catch (e) {
          console.log(e);
        }

        //update uploading queue
        if (temp_queue[action.id] === undefined) {
          temp_queue[action.id] = {
            status: "update",
            content: { data: content },
          };
        } else {
          temp_queue[action.id]["content"] = { data: content };
        }
      }

      return Object.assign({}, state, {
        uploadingQueue: temp_queue,
      });

    case "CLEAR_QUEUE":
      return Object.assign({}, state, {
        uploadingQueue: {},
      });

    case "POP_QUEUE":
      Object.assign(temp_queue, state.uploadingQueue);

      delete temp_queue[action.id];
      console.log("popqueue", temp_queue);
      return Object.assign({}, state, {
        uploadingQueue: temp_queue,
      });

    default:
      return state;
  }
};

export default uploadingQueue;
