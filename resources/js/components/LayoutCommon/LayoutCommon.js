
import React,{ useState, useEffect } from 'react';
import Header from '../Header';
import { Service  } from './Services/Services';
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN} from '../../../common/parameters'
const LayoutCommon = ({component_ui}) => {
    useEffect(() => { 
        let data_user =MethodCommon.getLocalStorage(INFO_USER)
        let token_cookie=MethodCommon.getCookies(TOKEN_NAME)
        let data_request ={ token:token_cookie}
        Service.authenticatice(data_request).then((response)=>{
            //  console.log("response:",response)
        })
    })
    return (
        <div>
            <Header/>
            {component_ui}
        </div>
    );
};

export default LayoutCommon;
