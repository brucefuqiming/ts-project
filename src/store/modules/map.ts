/**
 * map 数据按照list来取
 * map : {
 *  type: entry, country]
 *  data:
 * }
 */
const mapState: MapState = {
  year: 1949,
  years: [],
  map : {},
};
export const map = {
  namespaced: true,
  state: mapState,
  mutations: {
    setYear(state: MapState, payload: any) {
      state.year = payload;
    },
    setYears(state: MapState, payload: any) {
      state.years = payload;
    },
    setMap(state: MapState, payload: any) {
      state.map = payload;
    },
  },
};
