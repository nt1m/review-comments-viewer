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
        }, 
          createElement("span", {}, t.label),
          t.hasOwnProperty("badge") && createElement("span", { className: "badge" }, t.badge)
        )
      )),
      createElement("div", { className: "float-right" },
        createElement("button", {
          className: "btn btn-borderless icon reload",
          onClick({ target }) {
            setupGithub();
            target.classList.add("animated");
            setTimeout(() => target.classList.remove("animated"), 800)
          }
        }),
        createElement("button", {
          className: "btn btn-borderless icon settings",
          onClick() {
            stateManager.setState({ setupDone: false });
          }
        })
      )
    ),
    createElement("div", { className: "tab-panel" },
      selected.component
    )
  )
}