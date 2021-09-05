import './card.css'
// import Math;
const Card = props =>{
    let a = props.title!=="" ? <div className="title"><h5>{props.title}</h5></div> :null;
    let b = props.author!=="" ?<div><h6>-{props.author}</h6><p className="key">{props.keyid}</p></div>:null;
    let c = props.data!=="" ? <div className="data"><p>{props.data}</p></div> :null; 
    console.log(props.group);
    // let d;
    let d = props.group.num!==0?<div className="xyz">Group : {props.group.name.name}</div>:null;
    // let d = props.keyid!==-1 ? <p className="key">{props.keyid}</p>:null;
    // console.log(props.keyid);
    const colorcombo = ['lightblue','lightgreen','yellow','pink','magenta'];
    console.log(Math.random()*5);
    if(props.title==="-1") return<div></div>;
    return(
        <div className="card" style={{backgroundColor:colorcombo[parseInt(Math.random()*5)]}}>  
            {a} 
            {c}
            {b}
            {d}
        </div>
    )
}

export default Card;