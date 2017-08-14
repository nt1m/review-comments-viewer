function App({ setupComponent }) {
  const state = stateManager.getState();
  return state.setupDone ? Tabs({
    selectedTab: state.selectedTab,
    tabs: [{
      id: "opened",
      label: "Opened",
      badge: state.opened.length,
      component: Comments({ comments: state.opened }),
    }, {
      id: "resolved",
      label: "Resolved",
      badge: state.resolved.length,
      component: Comments({ comments: state.resolved }),
    }]
  }) : setupComponent();
}