# moon-shine
A Multi segment node implementation using HTML5 Canvas codenamed moon-shine.

# example
<img alt="Places as Nodes" src="https://raw.githubusercontent.com/midhunhk/moon-shine/master/documentation/places-sample.png" />

# configuration
Edit the `data.js` file in the app directory and add your data in the below methods, then run index.html to see the changes.

```
  function createNodes() {
	  // create node format {title, id, x, y}
	  node0 = createNode("Boston", "node00", 658,348);
	  node1 = createNode("Nevada", "node01", 380,519);
	  node2 = createNode("Fort Worth", "node02", 509,14);
	}
	
	function createLinks() {
	  // Create a link from node0 to node1
	  createAndAttachSegment(node0, node1)
	  createAndAttachSegment(node0, node2)
	}
```

# note
This app is based on work by Matt King's(https://github.com/mattking17) html5-node-diagram repo, which has been heavily edited for my need. I was looking for a Multi node graph implementation, but could find only implementations with single segments between nodes. 
This project met my needs and I modified the files from that repo in private a few years ago. Since the modifications were large and I was not sure if my modifications would result in a reusable project, I did not fork the below repo.

https://github.com/boundary/html5-node-diagram

# license
Licensed under Apache License, Version 2.0 as per the above project.
