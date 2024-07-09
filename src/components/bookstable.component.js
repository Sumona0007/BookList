import React, { Component } from "react";
import TableHeader from "./bookstableheader.components";
import TableBody from "./bookstablebody.components";


const BooksTable =({allbook , bookheader,title})=>{
  const columns=[
    {path:'id' , label:'poster', content:item=> <td>{item.id}</td>},
    {path:'title' , label:'title' ,content:item=><td>{title(item.title)} .........</td>},
    { path:'category' , label:'IMDB Rating', content:item=><td>{item.category}</td>},
    {path:'price' , label:'Your Rating', content:item=><td >{item.price}</td>},
    

    
]
  

   
    return (
      <table className="table">
       <TableHeader column={columns}/>
        <TableBody 
          allbook={allbook}
          column={columns}
          
          />
       
      </table>
    );
}
  
  
  


export default BooksTable;
