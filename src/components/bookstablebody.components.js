import React, { Component } from 'react';

const TableBody =({allbook,column})=> {
  
    
        return (
            <tbody>

              {allbook.map(item=>(
                 <tr>
              
                 {column.map(column=>(
                  (column.content(item))   
                   
                 ))}
                
              
               </tr>

              ))}
           
          </tbody>
        );
    
}
 
export default TableBody;