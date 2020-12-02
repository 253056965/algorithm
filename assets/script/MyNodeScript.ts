
const { ccclass, property } = cc._decorator;
@ccclass
export default class MyNodeScript extends cc.Component {
    @property(cc.Label)
    numberLabel: cc.Label=null;

    @property(cc.Sprite)
    bgsprite:cc.Sprite=null;
    private _number: number = 0;
    start() {

        this.numberLabel.string = `${this._number}`
        this.bgsprite.node.height=this._number/100.0*400;
    }

    public set number(number: number) {
        this._number = number;
    }

    public get number(): number {
        return this._number;
    }
    // update (dt) {}
}
