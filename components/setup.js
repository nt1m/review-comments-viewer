function SetupScreen() {
  return createElement("div", {
    className: "settings-container"
  },
    createElement("h1", {}, "Settings"),
    createElement("h2", {}, "Github configuration"),
    createElement("form", {
      onSubmit(e) {
        let form = e.target;
        stateManager.setState({ setupDone: true });
        for (let el of form.elements) {
          if (el.name) {
            Settings.set("github." + el.name, form.elements[el.name].value);
          }
        }
        setupGithub();
        e.preventDefault();
      }
    },
      createElement("button", {
        className: "settings-btn on",
        type: "submit",
      }),
      createElement("input", {
        placeholder: "Repo owner",
        name: "owner",
        type: "text",
        defaultValue: Settings.get("github.owner")
      }),
      createElement("input", {
        placeholder: "Repository",
        name: "repo",
        type: "text",
        defaultValue: Settings.get("github.repo")
      }),
      createElement("input", {
        placeholder: "Pull request #",
        name: "pr",
        type: "number",
        defaultValue: Settings.get("github.pr")
      }),
    )
  );
}