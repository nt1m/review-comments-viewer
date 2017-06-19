function Tabs({ tabs, selectedTab }) {
  let selected = tabs.find(t => t.id == selectedTab);
  return createElement("div", {},
    createElement("ul", {
      className: "tabs"
    },
      ...tabs.map(t => createElement("li", {
        className: selectedTab == t.id ? "selected" : null,
      },
        createElement("a", {
          href: "#",
          onClick() {
            stateManager.setState({ selectedTab: t.id })
          }
        }, t.label)
      )),
      createElement("button", {
        className: "settings-btn",
        onClick() {
          stateManager.setState({ setupDone: false });
        }
      })
    ),
    createElement("div", { className: "tab-panel" },
      selected.component
    )
  )
}