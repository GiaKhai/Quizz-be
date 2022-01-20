import React from 'react';
import { Pagination } from 'antd';


const Questionlistpagination = ({handleChangePageSize,handleChangePageCurrent,totalPage,pageSize}) => {

    //handle change page size
    function onShowSizeChange(current, pageSize) {
        handleChangePageSize(pageSize)
    }
     //handle change page current
    const onChange = page => {
        handleChangePageCurrent(page)
    };
    return (
        <Pagination
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            total={totalPage}
            total={totalPage}
            pageSize={pageSize}
            defaultCurrent={1}
        />
    );
};




export default Questionlistpagination;
