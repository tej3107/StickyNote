import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import Data from './components/data'
import Add from './components/add/add';
import { useEffect, useState } from 'react';
import Changeit from './components/grpchg/grpchg';
import data from './components/data';
import {Stage,Layer,Rect} from 'react-konva';
import Addgrp from './components/grpchg/addgrp';

let ix=0,iy=0,fx=0,fy=0;
let pqr=null,lmn=null,pqrs=null;
let change_array=[];
let std="Standared";

const App = () => {

  const [grp,setgrp] = useState();
  const [dataset,setdata] = useState();
  const [xyz,incxyz] = useState();
  const [rectangle,setrect]=useState([{aix:0,aiy:0,afx:0,afy:0}]);
  const [canvas,seton] = useState(false);
  const [addnote,setadd] = useState(false);
  const [standard,setstand] = useState(false);
  
  // =============================================================
  const DrawAnnotations = () => {
    const [annotations, setAnnotations] = useState([]);
    const [newAnnotation, setNewAnnotation] = useState([]);
  
    const handleMouseDown = event => {
      // console.log(event.evt.button);
      if (newAnnotation.length === 0&&event.evt.button!==0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    };
  
    const handleMouseUp = event => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        ix=sx;iy=sy;fx=x;fy=y;
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: annotations.length + 1
        };
        annotations.push(annotationToAdd);
        setNewAnnotation([]);
        setAnnotations(annotations);
      }
    };
  
    const handleMouseMove = event => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            key: "0"
          }
        ]);
      }
    };
  
    const annotationsToDraw = [...annotations, ...newAnnotation];
    return (
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={1500}
        height={1500}
      >
        <Layer>
          {annotationsToDraw.map(value => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill="transparent"
                stroke="white"
              />
            );
          })}
        </Layer>
      </Stage>
    );
  };
  // ================================================================

  useEffect(()=>{
    setdata((prev)=>{
        const prevarr = prev ? {...prev} : {author:"", data:"", title:"-1",group:"00"};
        return [
            prevarr,
            {author:"Rajnish", data:"Have Dinner sharp at 9pm tonight", title:"Food", keyid:1, group:0,x:0,y:0},
            {author:"Tej", data:"Left with Oxytocin frontend for today", title:"Food", keyid:2, group:0,x:0,y:0},
            {author:"Tej", data:"Oxytocin submission by 2pm today", title:"Food", keyid:3, group:0,x:0,y:0},
            {author:"Rajnish", data:"Play badminton at 6pm in the evening", title:"Food", keyid:4, group:0,x:0,y:0},
            {author:"Tej", data:"Data structure left with tries", title:"Food", keyid:5, group:0,x:0,y:0},
            {author:"Shubham", data:"Fill all the bottles of fridge", title:"Food", keyid:6, group:0,x:0,y:0},
            {author:"Tej", data:"Friday is cheat day for junk food", title:"Food", keyid:7, group:0,x:0,y:0}
        ]
    });
    incxyz(()=>{return 8;})
    setgrp(()=>[{num:-1,name:"-1"}])
  },[]);

  const adduser = (title,auth,data) =>{
    let grop=-1;
    let pind;
    let gp = [...grp];
    if(title!==''){
      pind = gp.findIndex(p=>{return p.name.name===title});
    }
    grop=0;
    if(pind!==-1) grop = pind+1;
    else if(title!==''){
      addgrp(title);
      grop = gp.length+1;
    }
    else{grop = 0;}
    console.log(parseInt(grop));
    const dataadd={title:title,author:auth,data:data,keyid:xyz,group:grop};
    console.log(dataadd);
    incxyz(xyz+1)
    setdata((prev)=>{
        return[
            ...prev,
            dataadd
        ]
    })
  }

  const addgrp = (name) =>{
    const gp = [...grp];
    let pind = gp.findIndex(p=>name===p.name.name);
    if(pind===-1){
      const n = grp.length;
      setgrp(prev=>{
        return[
          ...prev,
          {num:n+1,name:{name}}
        ];
      })
      pind = n;
    }
    if(change_array.length>0){
      let dta=[...dataset];
      change_array.forEach(p=>{
        dta[p].group = pind+1;
      })
      setdata(dta);
      change_array=[];
    }
    pqr = null;
    // console.log(grp);
  }

  const grpchage = (id,name) =>{
    let dta=[];if(dataset.length>0)dta = [...dataset];
    let gp=[];if(grp.length>0) gp = [...grp];
    let pind = gp.findIndex(p=>{return p.name.name===name});
    let pdta = dataset.findIndex(p=>{return p.keyid==id});
    if(pind===-1&&pdta!==-1){
      // console.log("Here");
      addgrp(name);
      gp = [...grp];
      // console.log(grp);
      // pind = gp.findIndex(p=>{return p.name.name===name});
      pind = grp.length;
    }
    console.log(pind);
    if(pind>=0&&pind<=grp.length&&pdta>=0&&pdta<dta.length){
      // console.log("Done");
      dta[pdta].group = pind+1;
      setdata(()=> dta);
    }
  }

  const setposition = (x,y,keyid) =>{
    let dst = [...dataset];
    let pind = dst.findIndex(p=>keyid===p.keyid);
    if(dst[pind].x!==x){
      dst[pind].x=x;
      dst[pind].y=y;
      setdata(()=>dst);
      // console.log("reached");
    }
    // console.log(dataset);
  }
  
  console.log(rectangle);
  const abc = canvas? <DrawAnnotations/> :null;
  const canva = () =>{
    if(canvas===false){seton(true);pqr=null;}
    else{
      if(ix!==rectangle[0].aix&&fy!==rectangle[0].afy){
        setrect([{aix:ix,aiy:iy,afx:fx,afy:fy}]);
        console.log("reached");

        let dta=[...dataset];
        change_array=[];
        dta.forEach(p=>{
          console.log(rectangle);
          console.log(p.x,p.y);
          if(p.x>ix&&p.x<fx&&p.y>iy&&p.y<fy){
            const pdta = dta.findIndex(q=>q===p);
            change_array.push(pdta);
          }
        })
        pqr = <Addgrp addgrp={addgrp}/>;
      }
      seton(false);
    }

  }
  const addstick = () =>{
    if(addnote) setadd(false);
    else setadd(true);
  }
  pqrs=<Add adduser={adduser} addstick={addstick}/>;
  lmn=<button type="submit" className="btn btn-primary" style={{marginTop:'40px'}} onClick={addstick}>Add Sticky Notes</button>
  if(addnote)lmn=pqrs;

  const stand = () =>{
    if(standard){setstand(false);std="Standared";}
    else{setstand(true);std="Grouped";}
  }

  return (
    <div className="App">
      <div className="container">
        {/* <Add adduser={adduser}/> */}
        {lmn}
        {/* <Changeit grpchage={grpchage}/> */}
        <button className="btn btn-danger" style={{float:'left'},{marginTop:'40px'}} onClick={canva}>Group Highlight</button>
        <button className="btn btn-warning" style={{float:'left'},{marginTop:'40px'}} onClick={stand}>{std}</button>
        {pqr}
        <Data dataset={dataset} grp={grp} setposition={setposition} standard={standard}/>
      </div>
      {abc}
    </div>
  );
}

export default App;
