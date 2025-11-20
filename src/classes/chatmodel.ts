import { ITreeListNode, TreeListNode } from "./treelist";

export class ChatModel {
    static getChatData(): ITreeListNode {
        switch(window.location?.hostname) {
            case 'chat.deepseek.com': return this.getDeepseekData();
        }
        return null;
    }

    private static getDeepseekData(): ITreeListNode {
        const responses = Array.from(document.querySelectorAll('[data-um-id] .ds-message'))
            .map(el => (el as HTMLElement)?.innerText)
            .filter(Boolean);
        return null;
    }
}