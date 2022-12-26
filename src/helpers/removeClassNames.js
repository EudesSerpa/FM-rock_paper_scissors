/**
 * Function that removes the classes from the specified nodes.
 * @param {Array| NodeList} nodes - target nodes.
 * @param {Array<String>} classNames - classes to delete.
 */
export const removeClassNames = ({ nodes, classNames }) => {
  nodes.forEach((el) => {
    el.classList.remove(...classNames);
  });
};
