import React, { Component } from 'react';
import './treelist.css';
import { TreeList as TreeListNode } from '../../classes/treelist';

interface Props {
	data: TreeListNode;
}

class TreeNodeComponent extends Component<Props, any> {
	tree: TreeListNode;

	constructor(props: any) {
		super(props);
		this.tree = props.data;
	}

	render() {
		return (
			Array.isArray(this.tree?.nodes) && (
				<ul className='tree-node'>
					{this.tree.nodes.map((node, index) => (
						<li key={node.id || index}>
							{node.label}
							{Array.isArray(node.nodes) && (
            		<TreeNodeComponent data={node} />
          		)}
						</li>
					))}
				</ul>
			)
		)
	}
}

export default TreeNodeComponent;