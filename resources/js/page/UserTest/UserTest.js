import React,{ useState, useEffect } from 'react';
import { loadingQuestionTest } from "../../../constants/backend_url";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN} from '../../../common/parameters'
import { Typography, Radio,Button } from "antd";
import RadioButton from './Controls/Radio_button ';
import { dataSubmit, chooseObject } from './Models/Models';
import Modalconfirm from './Controls/ModalConfirm';
const { Title } = Typography;
const Usertest = ({props}) => {
    const { planTest_id } = useParams();
    let data_user = MethodCommon.getLocalStorage(INFO_USER)
    const [allData, setAllData]= useState([])
    const [dataShowing, setDataShowing]= useState([])
    const [valueSkip,setValueSkip]= useState(0)
    const [lastPage,setLastPage]= useState(false)
    const [firstPage,setFirtPage]= useState(false)

    const [value, setValue] = useState(1);
    const [totalPages, set_TotalPages] = useState(1)
    const [info_pagination, setInfo_Pagination]=useState({pageNumber:1, limit:5})
    const [totalDataShowed,setTotalDataShowed ] =useState(0)
    const[arr_value_forEach_Page,setArr_value_forEach_Page]=useState([])
    
    let initData ={...dataSubmit}
    initData.id_user = data_user.id
    const [stateDataSubmit, setStateDataSubmit]=useState(initData)
    // const onChange = (e) => {
    //     console.log("radio checked", e.target.value);
    //     setValue(e.target.value);
    // };

    useEffect(() => {
        axios.post(loadingQuestionTest, {}).then((res)=>{
            let dataRes = res.data
            let newArray = dataRes.slice(0,info_pagination.limit)
            if(newArray.length === dataRes.length)
            {
                setLastPage(true)
                setFirtPage(true)
            }
            if(newArray.length < dataRes.length)
            {
                setLastPage(false)
                setFirtPage(true)
            }
            var initDataFirst = {...stateDataSubmit}
            for(var i=0;i<dataRes.length;i++)
            {
                let objectChoose = {...chooseObject}
                objectChoose.id_question = dataRes[i].id
                objectChoose.user_choice = []
                initDataFirst.data_choice.push(objectChoose)
            }
            setStateDataSubmit(initDataFirst)
            setAllData(dataRes)
            setDataShowing(newArray)
            setTotalDataShowed(totalDataShowed+ newArray.length)
        })
     
    }, []);
  
    var dataCurrent = []
    if(dataShowing.length>0){
        dataCurrent=dataShowing
    }
    // console.log("dataCurrent:",dataCurrent)

    //handle choose option in each question
    const handle_getChooseOption =(value,questionID)=>{
        let object_data = {...stateDataSubmit}
        let objectChoose = {...chooseObject}
        objectChoose.id_question = questionID
        objectChoose.user_choice = [value]
        var arrChoice = object_data.data_choice
        for(let i =0; i < arrChoice.length; i++)
        {
            if( arrChoice[i].id_question === questionID)
            {
                arrChoice[i].user_choice=[value]
            }
        }
        setStateDataSubmit(object_data)
    }
    //handle next page
    function handle_Next(){
        let newSkip =valueSkip + info_pagination.limit
        var index = newSkip
        setValueSkip(newSkip)
        var newArray =[]
       
        for(var i=0;i<info_pagination.limit;i++){
            if(allData[index] !== undefined){
                newArray.push(allData[index])
                index++
                if(index === allData.length)
                {
                    setLastPage(true)
                    setFirtPage(false)
                }
            }
        }
        setTotalDataShowed(totalDataShowed+newArray.length)
        setDataShowing(newArray)
    }
    //handle prev page
    function handle_Prev(){
        let newSkip =valueSkip - info_pagination.limit
        var index = newSkip
        setValueSkip(newSkip)
        var newArray =[]
        for(var i=0;i<info_pagination.limit;i++){
            if(allData[index] !== undefined){
                newArray.push(allData[index])
                index++
                if(index !== allData.length)
                {
                    setLastPage(false)
                }
                if(index === 1)
                {
                    setFirtPage(true)
                }
            }
        }
        setTotalDataShowed(totalDataShowed-newArray.length)
        setDataShowing(newArray)
    }
    // console.log("stateDataSubmit:",stateDataSubmit)
    return (
        <div>
            
            {dataCurrent?.map((ques, index) => (
                <div key={index} className="question">
                    <Title level={4}>
                       {`${totalDataShowed - (dataCurrent.length-(index+1))}/ ${ques.question}`}
                    </Title>
                    <div className="answers">
                        {/* <Radio.Group onChange={onChange} value={value}>
                            {ques.answers?.map((ans) => (
                                <Radio value={ans.answer}>{ans.answer}</Radio>
                            ))}
                        </Radio.Group> */}
                        <RadioButton 
                           list_option ={ques.answers}
                           handle_getChooseOption={(e)=>handle_getChooseOption(e,ques.id)}
                        />
                    </div>
                </div>
            ))}

           <div className="action_button_area">
                                {/* {
                                    info_pagination.pageNumber === totalPages ? "":
                                    <Button onClick ={handle_Next} className="next_button" type="primary">Next</Button>
                                }
                                {
                                    info_pagination.pageNumber !== 1 ? 
                                    <Button onClick ={handle_Prev}className="prev_button" type="primary">prev</Button>:""
                                } */}
                        {firstPage !==true ?
                        <Button onClick ={handle_Prev}className="prev_button" type="primary">prev</Button>
                        :''}
                        {lastPage !==true ?
                           <Button onClick ={handle_Next} className="next_button" type="primary">Next</Button>
                        :''}
                            {/* <Button onClick ={handle_Close} className="close_button" type="primary">{LANGUAGE_STATE.BUTTON_CLOSE}</Button> */}
                            </div>
                        <Modalconfirm
                              dataSource={stateDataSubmit}
                        />
            </div>
    );
};


export default Usertest;
