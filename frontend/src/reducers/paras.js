import { escapeString } from "../utils/escapeString";

export const paras = (state = { ids: [], paras: {} }, action) => {
  switch (action.type) {
    case "LOAD_PARAS":
      let flatParas = action.data.flat(Infinity); // array
      let keys = flatParas.map((x) => x.id);
      let items = {};
      keys.forEach((id) => {
        let para = flatParas.find((obj) => {
          return obj.id === id;
        });
        items[id] = para;
      });

      return {
        ...state,
        ids: keys,
        paras: items,
      };

    case "PARA_ONCHANGE":
      if (action.id !== null) {
        let para = state.paras[action.id];
        let newPara = { ...para, content: { data: escapeString(action.para) } };
        let newParas = {
          ...state.paras,
          [action.id]: newPara,
        };
        return { ...state, paras: newParas };
      }
      return { ...state };

    default:
      return state;
  }
};

export default paras;
