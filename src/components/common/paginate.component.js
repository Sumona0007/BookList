import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {
  
    render() { 
        const {total,pagecount,activepage,onchangepage}=this.props;

        const total_pages=Math.ceil(total/pagecount);

        const pages=_.range(1 , total_pages+1 , 1);

        if(total_pages===1) return null;
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={()=>activepage-1 >0 ? onchangepage(activepage-1) : null}>
                        <a className="page-link" style={{cursor : "pointer"}}>Previous</a></li>
                    {
                        pages.map(page =>(
                             <li onClick={()=>onchangepage(page)}class={activepage=== page ? "page-item active" : "page-item"}>
                                <a className="page-link" style={{cursor : "pointer"}} >{page}</a></li>
                        ))
                    }
                   
                   
                    <li className="page-item" onClick={()=>activepage+1 <=total_pages ? onchangepage(activepage+1) : null}><a class="page-link" style={{cursor : "pointer"}} >Next</a></li>
                </ul>
            </nav>
        );
    }
}
 
export default Pagination;