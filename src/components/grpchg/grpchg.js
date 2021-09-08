import { useRef } from "react";

const Changeit = props =>{
    const Id = useRef();
    const Name = useRef();

    const changegroup = (event) =>{
        event.preventDefault();

        if(Id.current.value==='')return;
        const title = Id.current.value;
        const name = Name.current.value;
        props.grpchage(title,name);
        Id.current.value='';
        Name.current.value='';
    }

    return(
        <div className="chngrp">
            <form onSubmit={changegroup}>
                <input type="text" placeholder="Note Number" ref={Id} /><br/>
                <input name="name" type="text" placeholder="Group Name" ref={Name} /><br/>
                <button type="submit" className="btn btn-secondary">Change Group</button>
            </form>
        </div>
    );
}

export default Changeit;