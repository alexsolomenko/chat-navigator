import { ITreeListNode, TreeListNode } from "./treelist";

export class ChatModel {
    static getChatData(): ITreeListNode {
        switch(window.location?.hostname) {
            case 'chat.deepseek.com': return this.getDeepseekData();
        }
        return null;
    }

    private static getDeepseekData(): ITreeListNode {
        const result = new TreeListNode();
        document.querySelectorAll('[data-um-id]').forEach(node => {
            result.addNode((node as HTMLElement).innerText);
            const next = node.nextElementSibling;
            if (next) {
                document.querySelectorAll('h1, h2, h3, h4, h5').forEach(h => {

                });
            }
        });
        return result;
    }
}