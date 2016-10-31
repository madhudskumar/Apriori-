//{tra:[],sup:number,con:number}
var _c = require('js-combinatorics');

class item{
    constructor(name){
        this.name = name;
        this.freq = 0;
    };

    get occ(){
        return this.freq;
    }

    incFreq(){
        this.freq++;
    }
}

module.exports = function(tObj){
    if(!tObj.tra || !tObj.sup || !tObj.con) return new Error("invalid input");
    else{
        var obj = tObj;
        var sup = parseInt(obj.sup);
        var con = parseInt(obj.con);
        var nTra = (obj.tra.length);
        var itemSet = [];
        var track = [];
        var mapData = [];
        var c = 0;

        //calc supnu
        var nSup = (sup/100)*nTra;

        //item set
        obj.tra.map((item) => {
            item.items.map((o) => {
                if(track.indexOf(o) + 1){
                    itemSet.forEach((i) => {
                        if(i.name == o) i.freq++;
                    })
                }else{
                    track.push(o);
                    itemSet.push({name:o,freq:1});
                }
            })
        })

        itemSet.forEach((i) => {
            if(i.freq < nSup){
                itemSet.splice(itemSet.indexOf(i));
                track.splice(track.indexOf(i.name));
            }
        })

        // console.log("\n\nitemSet\n");
        // console.log(itemSet);
        // console.log(track)

        mapData.push(
            {
                c:c++,
                items:itemSet
            }
        )


        let upc = 2;
        var replicaItemSet = itemSet;
        while((replicaItemSet.length - 1) != 0){
            var tempItemSet = getComb(track, upc++);
            var newItemSet = [];
            tempItemSet.forEach((s) => {
                let data = {
                    name:s,
                    freq:0
                };
                obj.tra.map((item) => {
                    if(
                        data.name.every((e) => {return item.items.indexOf(e) >= 0})
                    ) data.freq++;
                });
                if(data.freq < nSup) ;
                else newItemSet.push(data);
            });
            //console.log(newItemSet);
            mapData.push({
                c:c++,
                items:newItemSet
            })
            replicaItemSet = newItemSet;
        }

        // console.log("\n\nmapdata:\n");
        // console.log(mapData);

        var confidence = [];
        replicaItemSet[0].name.forEach((e) => {
            itemSet.forEach((o) => {
                if(o.name === e){
                    let cCon = (replicaItemSet.freq/o.freq)*100;
                    if(cCon < con) ;
                    else confidence.push(o.name);
                }
            })
        })

        //ret json
        return {
            sup:sup,
            con:con,
            nTra:nTra,
            nSup:nSup,
            stack:mapData,
            confidenceRule:{
                set:replicaItemSet[0].name,
                cItems:confidence
            }
        };
    }
}

function getComb(arr, cmb){
    let x = [];
    cmb = _c.combination(arr, cmb);
    while(a = cmb.next()) x.push(a);
    return x;
}