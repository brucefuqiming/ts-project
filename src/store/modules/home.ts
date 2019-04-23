const homeState: HomeState = {
  page: 1,
  totalPage: 1,
  pageSize: 20,
  loadmore: true,
};

export const home = {
  namespaced: true,
  state: homeState,
  mutations: {
    setPage(state: HomeState, payload: any) {
      state.page = payload.page;
    },
    setTotalPage(state: HomeState, payload: any) {
      state.totalPage = payload.totalPage;
    },
  },
};
