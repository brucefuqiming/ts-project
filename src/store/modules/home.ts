export const home = {
  namespaced: true,
  state: {
    page: 1,
    totalPage: 1,
    pageSize: 20,
    loadmore: true,
  },
  mutations: {
    setPage(state: any, payload: any) {
      state.page = payload.page;
    },
    setTotalPage(state: any, payload: any) {
      state.totalPage = payload.totalPage;
    },
  },
};
