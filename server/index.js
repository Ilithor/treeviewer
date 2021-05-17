const express = require("express");
const nodes = require('./hierarchy.js').nodes;
const data = require('./hierarchy.js').data;

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/nodes', (_req, res) => {
    res.send(nodes.slice(0, 3));
});

app.get('/api/nodes/:nodeId', (req, res) => {
    let { nodeId } = req.params; 
    let node = nodes.filter(n => n.id === nodeId);

    if(node.length === 0) {
        res.status(404).send(`Node with Id ${nodeId} was not found`);
    } else {
        res.send(node[0]);
    }
});

app.get('/api/data/:nodeId', (req, res) => {
    let { nodeId } = req.params;
    let nodeData = data[nodeId];

    if(nodeData === undefined) {
        res.status(404).send(`There is no data for node with Id ${nodeId}`);
    } else {
        res.send(nodeData);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});