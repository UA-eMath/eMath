import { escapeString } from "../utils/escapeString";

const pageParas = {
  paras: [],
  status: null,
  title: null,
  id: null,
};

const paras = (state = pageParas, action) => {
  let temp_state = [];

  switch (action.type) {
    case "LOAD_PARAS":
      return Object.assign({}, state, {
        paras: action.data,
        status: action.status,
        title: action.title,
        id: action.id,
      });

    case "LOAD_PARAS_ERROR":
      return Object.assign({}, state, {
        state: action.status,
      });

    case "PARA_ONCHANGE":
      //copy value
      Object.assign(temp_state, state.paras);

      //editing
      if (action.id !== null) {
        //find and replace
        let flat_state = temp_state.flat(Infinity);
        let target_para =
          flat_state[flat_state.findIndex((i) => i.id === action.id)];

        try {
          target_para.content.data = escapeString(action.para);
        } catch (e) {
          console.log(e);
        }
      }

      return Object.assign({}, state, {
        paras: temp_state,
      });

    default:
      return state;
  }
};

export default paras;
