import './card.css'
import Draggable from 'react-draggable';

const Card = props =>{
    
    let b = props.author!=="" ?<div><h6>-{props.author}</h6></div>:null;
    let c = props.data!=="" ? <div className="data"><p>{props.data}</p></div> :null; 
    // console.log(props.group);
    let d = props.group.num!==0?<div className="title">{props.group.name.name}</div>:null;
    
    const colorcombo = ['lightblue','lightgreen','lightyellow','pink','rgb(209, 222, 250)','lightred','rgb(95, 224, 224)'];

    const setpos = event =>{
        props.setposition(event.x,event.y,props.keyid);
    }

    const setonstop = (event,data) =>{
        props.setposition(event.screenX,event.screenY,props.keyid);
    }

    return(
        <Draggable onStop={setonstop}>
        <div className="card" style={{backgroundColor:colorcombo[parseInt(Math.random()*5)]}}
            ref={el => {if (!el) return;
        
                setpos(el.getBoundingClientRect());
            }}
        >  
            {d} 
            {c}
            {b}
        </div>
        </Draggable>
    )
}

export default Card;