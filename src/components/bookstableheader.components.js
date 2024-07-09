import React, { Component } from 'react';

const TableHeader=({column})=>{
    
    
        return (
            <thead>
             <tr>

          
            {column.map(d=>(
              <th scope="row">{d.path}</th>
            ))}
           
          </tr>
        </thead>
        );
    
}
 
export default TableHeader;