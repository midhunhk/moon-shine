/**
 *	data.js
 * 	The data for displaying the graph are defined in this file
 **/

/**
 * Creates all the nodes. All created nodes are public. 
 * Generated code can be placed in this method and the links should be added in
 * the createLinks() method
 */
function createNodes() {
	// These nodes are defined as global variables intentionally
	// so that they can be accessed in other functions
	node0 = createNode("boston", "node00", 658,348);
	node1 = createNode("nevada", "node01", 380,519);
	node2 = createNode("fort worth", "node02", 509,14);
	node3 = createNode("san jose", "node03", 508,174);
	node4 = createNode("new york", "node04", 809,127);
	node5 = createNode("dallas", "node05", 978,175);
	node6 = createNode("chicago", "node06", 800,250);
	node7 = createNode("cincinatti", "node07", 100,350);
	node8 = createNode("florida", "node08", 867,19);
	node9 = createNode("washington", "node09", 257,249);
	node10 = createNode("seattle", "node10", 625,250);
}
 
/**
 * Cretes the links between the nodes
 */
function createLinks() {
	createAndAttachSegment(node0, node1)
	createAndAttachSegment(node4, node2)
	createAndAttachSegment(node5, node3)
	createAndAttachSegment(node1, node7)
	createAndAttachSegment(node0, node7)
	createAndAttachSegment(node3, node2)
	createAndAttachSegment(node8, node2)
	createAndAttachSegment(node9, node2)	
}
