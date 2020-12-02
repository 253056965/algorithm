import OptionalEntry, { OptionalEnum } from "./dto/OptionalEntry";
import MyNodeScript from "./MyNodeScript";
import RandomUtil from "./util/RandomUtil";

const { ccclass, property } = cc._decorator;
@ccclass
export default class BubbleScript extends cc.Component {
    @property(cc.Prefab)
    myNodeprefab: cc.Prefab = null;
    @property(cc.Node)
    content: cc.Node = null;
    private myNodeArray: Array<MyNodeScript> = null;
    private myNodeWidth = 30;
    private myNodeSpace = 10;
    private numberCount = 20;
    private actionArray: Array<OptionalEntry> = null;
    private actionIndex = 0;
    start() {
        this.randomMyNode()
    }
    public clickEvent() {

        console.log("--------------111111111111-")
        //cc.director.pause()
        //cc.director.resume()
        this.bubbleSort();
        this.runAction();
    }
    public doublePlay(){
        cc.director.getScheduler().setTimeScale(5)
    }
    private bubbleSort() {
        this.actionArray = new Array()
        this.actionIndex = 0;
        for (let i = 0; i < this.myNodeArray.length; i++) {
            for (let j = 0; j < this.myNodeArray.length - 1 - i; j++) {
                let n1 = this.myNodeArray[j];
                let n2 = this.myNodeArray[j + 1];
                {
                    // 取出操作
                    let ogetArray = [n1, n2];
                    let op1: OptionalEntry = new OptionalEntry(OptionalEnum.GET, ogetArray);
                    this.actionArray.push(op1);
                }
                if (n1.number > n2.number) {
                    {
                        // 比较操作
                        let cArray = [n1, n2];
                        let op1: OptionalEntry = new OptionalEntry(OptionalEnum.compare, cArray);
                        this.actionArray.push(op1);
                    }
                    this.myNodeArray[j] = n2;
                    this.myNodeArray[j + 1] = n1;
                    {
                        // 交换操作
                        let cArray = [n1, n2];
                        let op1: OptionalEntry = new OptionalEntry(OptionalEnum.exchange, cArray);
                        this.actionArray.push(op1);
                    }
                }
            }
        }
    }


    public randomMyNode() {
        let array: Array<number> = new Array();
        for (let i = 0; i < this.numberCount; i++) {
            let randomNumber = RandomUtil.random(0, 100);
            array.push(randomNumber)
        }
        this.createUI(array);
    }

    public createUI(array: Array<number>) {
        if (this.myNodeArray == null) {
            this.myNodeArray = new Array();
        } else {
            this.myNodeArray.forEach((v) => {
                v.node.destroy();
            })
            this.myNodeArray=new Array();
        }
        for (let i = 0; i < array.length; i++) {
            let n = cc.instantiate(this.myNodeprefab);
            let myNodeScript = n.getComponent(MyNodeScript);
            myNodeScript.number = array[i];
            this.myNodeArray.push(myNodeScript);
            // //屏幕中间是0
            if (i == 0) {
                n.x = 0 + this.myNodeWidth / 2;
            } else {
                n.x = i * this.myNodeSpace + i * this.myNodeWidth + this.myNodeWidth / 2
            }
            this.content.addChild(n)
        }
        let total = (array.length - 1) * (this.myNodeSpace) + array.length * this.myNodeWidth
        let k = total / 2
        console.log("当前总长度是", total);
        this.content.x = -k;
    }

    public runAction() {
        let self = this;
        if (self.actionIndex == this.actionArray.length) {
            console.log("执行完毕了")
            return
        }
        this.actionArray[this.actionIndex].action(() => {
            self.actionIndex = self.actionIndex + 1;
            self.runAction();
        })
    }
    // update (dt) {}
}
