import React from "react";

export default props => (
  <ul className="menu lang-switcher">
    <li className={props.activeLang === "en" ? "active" : ""}>
      <a href="en" onClick={props.onSwitchLang}>
        en
      </a>
    </li>
    <li className={props.activeLang === "fr" ? "active" : ""}>
      <a href="fr" onClick={props.onSwitchLang}>
        fr
      </a>
    </li>
  </ul>
);
