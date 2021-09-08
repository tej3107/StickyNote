import Card from "./card";
import Radium from "radium";

const Data = (props)=>{    

    const setposition = (x,y,keyid) =>{
        props.setposition(x,y,keyid);
    }

    const setpos = (x,y,keyid) =>{
        console.log(x);
    }

    const style = {
        ':hover':{minHeight:'20px'},
        backgroundColor:'brown'
    }

    console.log(props.grp);
    const def = props.grp?(<div>
        {props.grp.map(q=>{
            let a = null;
            // console.log(props.grp);
            if(props.dataset){
                a = <div className="grouping"> {props.dataset.map(p=>{
                    if(q.num===p.group)return(
                    <section key={p.keyid.toString()}> 
                        <Card style={style} author={p.author} data={p.data} title={p.title} keyid={p.keyid} group={q} setposition={setposition}/>
                    </section>);
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
        a = p.group===0||isNaN(p.group)?<Card author={p.author} data={p.data} title={p.title} keyid={p.keyid} group={b} setposition={setposition}/>:null;
        return a;
    })
    }
    </div>):null;


    let all = props.dataset?(<div>{
        props.dataset.map(p=>{
            let a;
            const b = p.group!="00" && p.group!==0&& (!isNaN(p.group))? {name:{name:props.grp[p.group-1].name.name},num:props.grp[p.group-1].num} : {name:"",num:0};
            console.log(b);
            a = p.group!==0&&(!isNaN(p.group))&&p.group!=="00"?<Card author={p.author} data={p.data} title={p.title} keyid={p.keyid} group={b} setposition={setpos}/>:null;
            return a;
        })
        }
    </div>):null;

    all = props.standard ? all : def ;

    return (
        <div>
            {/* <br/><br/><br/><br/><br/><br/> */}
            {all}
            {abc}
        </div>
    )
}

export default Radium(Data);