// Code from: https://web.dev/building-a-tooltip-component/#javascript

/* Checking if the browser supports the `:has()` selector. If it does not, it adds a class to the
parent element of the tooltip and adds a style to the head of the document. */
if (!CSS.supports("selector(:has(*))")) {
  document
    .querySelectorAll("tool-tip")
    .forEach((tooltip) => tooltip.parentNode.classList.add("has_tool-tip"));

  const styles = document.createElement("style");
  styles.textContent = `
    .has_tool-tip {
      position: relative;
    }
    .has_tool-tip:is(:hover, :focus-visible, :active) > tool-tip {
      opacity: 1;
      transition-delay: 200ms;
    }
  `;
  document.head.appendChild(styles);
}
