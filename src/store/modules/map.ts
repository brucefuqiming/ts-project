/**
 * map 数据按照list来取
 * map : {
 *  type: entry, country]
 *  data:
 * }
 */

export const map = {
  namespaced: true,
  state: {
    year: 1949,
    years: [],
    map : {},
  },
  mutations: {
    setYear(state: any, payload: any) {
      console.log({payload});
      state.year = payload;
    },
    setYears(state: any, payload: any) {
      state.years = payload;
    },
    setMap(state: any, payload: any) {
      state.map = payload;
    },
  },
};
