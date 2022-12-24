export const removeClassNames = ({ nodes, classNames }) => {
  nodes.forEach((el) => {
    el.classList.remove(...classNames);
  });
};
