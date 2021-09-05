import { useRef } from "react";

const Addgrp = props =>{
    const title = useRef();
    const addgrp = (event) =>{
        event.preventDefault();
        if(title!==''){
            const Title = title.current.value;
            props.addgrp(Title);
            title.current.value = '';
        }
    }

    return(
        <div className="Addgrp">
            <form onSubmit={addgrp}>
                <input title="title" type="text" placeholder="Group Name"ref={title}/><br/>
                <button type="submit" className="btn btn-danger">Add Group</button>
            </form>
        </div>
    );
}

export default Addgrp;