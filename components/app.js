function App({ setupComponent }) {
  const state = stateManager.getState();
  return state.setupDone ? Tabs({
    selectedTab: state.selectedTab,
    tabs: [{
      id: "opened",
      label: "Opened",
      component: Comments({ comments: state.opened }),
    }, {
      id: "resolved",
      label: "Resolved",
      component: Comments({ comments: state.resolved }),
    }]
  }) : setupComponent();
}