import { escapeString } from "../utils/escapeString";

const paras = (
  state = {
    paras: [],
  },
  action
) => {
  let temp_state = [];

  switch (action.type) {
    case "LOAD_PARAS":
      return Object.assign({}, state, {
        paras: action.data,
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

// export const paras = (state = {ids: [], paras: {}}, action) => {
//   switch (action.type) {
//     case "LOAD_PARAS":
//       let flatParas = action.data.flat(Infinity); // array
//       let keys = flatParas.map((x) => x.id);
//       let items = {};
//       keys.forEach((id) => {
//         let para = flatParas.find((obj) => {
//           return obj.id === id;
//         });
//         items[id] = para;
//       });

//       return {
//         ...state,
//         ids: keys,
//         paras: items,
//         status: action.status,
//         title: action.title,
//         id: action.id,
//       };

//     case "PARA_ONCHANGE":
//       if (action.id !== null) {
//         let para = state.paras[action.id];
//         let newPara = { ...para, content: { data: escapeString(action.para) } };
//         let newParas = {
//           ...state.paras,
//           [action.id]: newPara,
//         };
//         return { ...state, paras: newParas };
//       }
//       return { ...state };

//     default:
//       return state;
//   }
// };

export default paras;
