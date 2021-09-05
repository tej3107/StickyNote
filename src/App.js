import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import Data from './components/data'
import Add from './components/add/add';
import { useEffect, useState } from 'react';
import Changeit from './components/grpchg/grpchg';
import Addgrp from './components/grpchg/addgrp';

const App = () => {

  const [addstate,setadd] = useState();
  const [grp,setgrp] = useState();
  const [dataset,setdata] = useState();
  const [xyz,incxyz] = useState();
  // =============================================================

  // ================================================================

  useEffect(()=>{
    setdata((prev)=>{
        const prevarr = prev ? {...prev} : {author:"", data:"", title:"-1"};
        return [
            prevarr,
            
        ]
    });
    incxyz(()=>{return 19;})
    setgrp(()=>[{num:-1,name:"-1"}])
},[]);


  const adduser = (title,auth,data) =>{
    const dataadd={title:title,author:auth,data:data,keyid:xyz,group:0};
    incxyz(()=> xyz+1)
    setdata((prev)=>{
        return[
            ...prev,
            dataadd
        ]
    })
  }

  const addgrp = (name) =>{
    const n = grp.length;
    setgrp(prev=>{
      return[
        ...prev,
        {num:n+1,name:{name}}
      ];
    })
    // console.log(grp);
  }

  const grpchage = (id,name) =>{
    let dta=[];if(dataset.length>0)dta = [...dataset];
    let gp=[];if(grp.length>0) gp = [...grp];
    const pind = gp.findIndex(p=>{return p.name.name===name});
    const pdta = dataset.findIndex(p=>{return p.keyid==id});
    // console.log(pdta);console.log(dta.length);
    // console.log(pind);console.log(grp.length);
    if(pind>=0&&pind<grp.length&&pdta>=0&&pdta<dta.length){
      // console.log("Changed");
      dta[pdta].group = gp[pind].num;
      // dta[pdta].data = "changed";
      setdata(()=> dta);
    }
  }

  return (
    <div className="App">
      <h3>Sticky Board</h3>
      <div className="container">
        <Add adduser={adduser}/>;
        <Changeit grpchage={grpchage}/>
        <Addgrp addgrp={addgrp}/>
        <Data dataset={dataset} grp={grp}/>
      </div>
    </div>
  );
}

export default App;
