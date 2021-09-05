import Card from "./card";
import {useEffect, useState} from 'react';

const Data = (props)=>{    

    console.log(props.grp);
    const def = props.grp?(<div>
        {props.grp.map(q=>{
            let a = null;
            // console.log(props.grp);
            if(props.dataset){
                a = <div> {props.dataset.map(p=>{
                    if(q.num===p.group)return <div> <Card author={p.author} data={p.data} title={p.title} keyid={p.keyid} group={q}/></div>;
                    return null;
                })} </div>
            }
            return a;
        })
    }
    </div>):null;
    if(def!==null)console.log("Hey");
    const abc = props.dataset?(<div>{
    props.dataset.map(p=>{
        let a;
        const b = {name:"",num:0};
        a = p.group===0?<Card author={p.author} data={p.data} title={p.title} keyid={p.keyid} group={b}/>:null;
        return a;
    })
    }
    </div>):null;

    return (
        <div>
            {def}
            {abc}
        </div>
    )
}

export default Data;