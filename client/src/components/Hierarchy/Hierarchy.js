import _ from "lodash";

const Hierarchy = ({ nodes, selectedNodeId, handleSelectNode }) => {
  /* Task: Fill out Hierarchy component implementation. */
  return _.map(nodes, (node) => {
    return (
      <button key={node.id} onClick={() => handleSelectNode(node.id)}>
        {node.displayName}
      </button>
    );
  });
};

export default Hierarchy;
