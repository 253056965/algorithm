import MyNodeScript from "../MyNodeScript";

export enum OptionalEnum {
    GET = 1, // 获取
    compare = 2, // 比较
    exchange = 3 // 交换

}

export default class OptionalEntry {
    private _optional: OptionalEnum;
    private _nodeArray: Array<MyNodeScript>;
    public constructor(_optional: OptionalEnum, _nodeArray: Array<MyNodeScript>) {
        this._optional = _optional;
        this._nodeArray = _nodeArray;
    }

    public action(callback: () => void) {
        console.log("=======================")
        switch (this._optional) {
            case OptionalEnum.GET: this.getAction(callback); break;
            case OptionalEnum.compare: this.compareAction(callback); break;
            case OptionalEnum.exchange: this.exchangeAction(callback); break;
        }
    }


    private getAction(callback: () => void) {

        for (let i = 0; i < this._nodeArray.length; i++) {
            let action = cc.blink(1,1)
            let sequ = null;
            if (i == this._nodeArray.length - 1) {
                let callfunc = cc.callFunc(() => {
                    callback();
                });
                sequ = cc.sequence(action, callfunc)
            } else {
                sequ = action;
            }
            this._nodeArray[i].node.runAction(sequ);
        }
    }

    private compareAction(callback: () => void) {

        callback();
    }

    private exchangeAction(callback: () => void) {
        let n1 = this._nodeArray[0];
        let n2 = this._nodeArray[1];
        let p1 = n1.node.getPosition();
        let p2 = n2.node.getPosition();

        n1.node.runAction(cc.moveTo(0.5, p2))
        let sq = cc.sequence(cc.moveTo(0.5, p1), cc.callFunc(() => {
            callback()
        }))
        n2.node.runAction(sq)
    }

}