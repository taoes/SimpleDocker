import axios from "axios";
import {formatDate, parseId} from "../utils/index";

export default {
  state: {
    currentMenuKey: []
  },
  mutations: {
    setCurrentMenuKey: function (state, payload) {
      state.currentMenuKey = [payload]
    }
  }

};


