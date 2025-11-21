export interface ITreeListNode {
    id: string;
    label: string;
    preview?: string;
    nodes?: ITreeListNode[];
}

export class TreeListNode implements ITreeListNode {
    id: string;
    label: string;
    preview?: string;
    nodes?: TreeListNode[];

    constructor() {
        this.id = 'root';
    }

    addNode(label?: string) {
        if (!this.nodes) {
            this.nodes = [];
        }
        this.nodes.push(Object.setPrototypeOf(
            { 
                id: this.id + '-' + (this.nodes.length + 1).toString(),
                label: label
            }, TreeListNode.prototype));
    }

    static fromObject(obj: ITreeListNode): TreeListNode {
        const instance = Object.setPrototypeOf(obj, TreeListNode.prototype);
        return instance;
    }
}

export class TreeList extends TreeListNode {

}