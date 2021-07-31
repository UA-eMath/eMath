import { escapeString } from "../utils/escapeString";

export const paras = (state = { ids: [], idsLevel: [], paras: {} }, action) => {
  switch (action.type) {
    case "LOAD_PARAS":
      // get all paraID
      let flatParas = action.data.flat(Infinity); // array
      let keys = flatParas.map((x) => x.id);
      // map paraID to its para
      let items = {};
      keys.forEach((id) => {
        let para = flatParas.find((obj) => {
          return obj.id === id;
        });
        items[id] = para;
      });
      // get levelID to keep data structure
      let levelIDs = action.data.map((x) => {
        if (Array.isArray(x)) {
          let para = x.find((e) => e.para_parent);
          console.log("paras: ", x, para);
          let levelID = para.para_parent.id;
          items[levelID] = x;
          return levelID;
        } else {
          return x.id;
        }
      });

      return {
        ...state,
        ids: keys,
        idsLevel: levelIDs,
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
