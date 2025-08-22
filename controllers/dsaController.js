// controllers/dsaController.js
const Stack = require("../models/Stack");
const Queue = require("../models/queue");
const ArrayModel = require("../models/array");
const LinkedList = require("../models/ll");
const TreeNode = require("../models/tree");

// ================= Tree =================
exports.getTreePage = async (req, res) => {
  try {
    const nodes = await TreeNode.findAll();
    // simple array representation
    const treeData = nodes.map(node => node.value);

    res.render("dsa/tree", {
      title: "Tree Visualizer",
      treeData,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading Tree page");
  }
};

exports.addTreeNode = async (req, res) => {
  try {
    const { value, parent } = req.body;

    await TreeNode.create({
      value,
      parent: parent || null,
    });

    res.redirect("/dsa/tree");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding tree node");
  }
};

// ================= Stack =================
exports.getStackPage = async (req, res) => {
  try {
    const operations = await Stack.findAll();
    res.render("dsa/stack", {
      title: "Stack Visualizer",
      operations,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading Stack page");
  }
};

exports.addStackOperation = async (req, res) => {
  const { operation } = req.body;
  try {
    await Stack.create({ operation });
    res.redirect("/dsa/stack");
  } catch (err) {
    console.error(err);
    res.send("Error performing stack operation");
  }
};

// ================= Queue =================
exports.getQueuePage = async (req, res) => {
  try {
    const operations = await Queue.findAll();
    res.render("dsa/queue", {
      title: "Queue Visualizer",
      operations,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading Queue page");
  }
};

exports.addQueueOperation = async (req, res) => {
  const { operation } = req.body;
  try {
    await Queue.create({ operation });
    res.redirect("/dsa/queue");
  } catch (err) {
    console.error(err);
    res.send("Error performing queue operation");
  }
};

// ================= Array =================
exports.getArrayPage = async (req, res) => {
  try {
    const operations = await ArrayModel.findAll();

    // Initialize fixed array size (10 slots)
    let arr = Array(10).fill(null);

    // Apply saved operations
    operations.forEach((op) => {
      let idx = op.index;
      if (op.operation === "insert" || op.operation === "update") {
        arr[idx] = op.value;
      } else if (op.operation === "delete") {
        arr[idx] = null;
      }
      // search does not modify array
    });

    res.render("dsa/array", {
      title: "Array Visualizer",
      arrayData: arr,
      operations,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading Array page");
  }
};

exports.addArrayOperation = async (req, res) => {
  try {
    const { index, value, operation } = req.body;

    await ArrayModel.create({
      index,
      value,
      operation,
    });

    res.redirect("/dsa/array");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding array operation");
  }
};


// const LinkedList = require("../models/ll");

// ================= Linked List =================
exports.getLLPage = async (req, res) => {
  try {
    const nodes = await LinkedList.findAll();

    // Build linked list data for frontend
    let llData = [];
    nodes.forEach((node) => {
      if (node.operation === "insert") {
        llData.splice(node.index ?? llData.length, 0, node.value);
      } else if (node.operation === "delete") {
        if (node.index < llData.length) llData.splice(node.index, 1);
      }
    });

    res.render("dsa/ll", {
      title: "Linked List Visualizer",
      llData,
      nodes,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading Linked List page");
  }
};

exports.addLLOperation = async (req, res) => {
  try {
    const { index, value, operation } = req.body;

    await LinkedList.create({
      index: index || null,
      value,
      operation,
    });

    res.redirect("/dsa/ll");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding linked list operation");
  }
};
