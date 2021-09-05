import {useRef} from 'react';

const Add = (props) => {
    const title = useRef();
    const author = useRef(); 
    const data = useRef();

    const addUserHandler = (event) =>{
        event.preventDefault();
        const Title = title.current.value;
        const Auth = author.current.value;
        const Data = data.current.value;
        props.adduser(Title,Auth,Data);
        title.current.value='';
        author.current.value='';
        data.current.value='';
    }

    return(
        <div className="Addform">
            <form onSubmit={addUserHandler}>
                <input title="title" type="text" placeholder="Title" ref={title} /><br/>
                <input data="data" type="text" placeholder="Data" ref={data} /><br/>
                <input author="author" type="text" placeholder="User" ref={author} /><br/>
                <button type="submit" className="btn btn-primary">Add Sticky Notes</button>
            </form>
        </div>
    );

}

export default Add;