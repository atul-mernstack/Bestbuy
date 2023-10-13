import React, { Fragment, useState } from 'react'
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import "./ProductDetails.css";
import { getProduct, clearErrors } from '../../action/productAction';
import { Box} from '@material-ui/core'

export const Search = ({history}) => {

  const navigate = useNavigate();
    const [keyword, setkeyword] = useState("");
    const dispatch =useDispatch();
    let search_Key;
    const searchSubmitHandler = (e) => {
        
        e.preventDefault();
        search_Key=keyword;
        setkeyword("");
        if(keyword.trim()) {
           
            navigate(`/products/${search_Key}`)
        } else {
            navigate(`/products`)
        }
    }
  


    return <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler} >
            <input
                type="text"
                placeholder="Search a Poduct ..."
                value={keyword}
                onChange={(e) =>setkeyword(e.target.value)}
            />
            
            <button type="submit" ><SearchIcon/></button>
                
            

        </form>

    </Fragment>
}
