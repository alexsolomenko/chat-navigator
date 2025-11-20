export interface ITreeListNode {
    id: string;
    label: string;
    preview?: string;
    nodes?: TreeListNode[];
}

export class TreeListNode implements ITreeListNode {
    id: string;
    label: string;
    preview?: string;
    nodes?: TreeListNode[];

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label; 
    }

    static fromObject(obj: ITreeListNode): TreeListNode {
        const instance = Object.setPrototypeOf(obj, TreeListNode.prototype);
        return instance;
    }
}

export class TreeList extends TreeListNode {

}