import React,{ useState, useEffect } from 'react';
import { loadingQuestionTest } from "../../../constants/backend_url";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN,LIMITE_PAGE} from '../../../common/parameters'
import { Typography, Radio,Button } from "antd";
import RadioButton from './Controls/Radio_button ';
import { dataSubmit, chooseObject } from './Models/Models';
import Modalconfirm from './Controls/ModalConfirm';
import Resultpopup from './Controls/ResultPopup';
import { useHistory } from "react-router-dom";
import './Css/index.css'
const { Title } = Typography;

const Usertest = ({props}) => {
    let history = useHistory();
    const { planTest_id } = useParams();
    let data_user = MethodCommon.getLocalStorage(INFO_USER)
    const [allData, setAllData]= useState([])
    const [dataShowing, setDataShowing]= useState([])
    const [valueSkip,setValueSkip]= useState(0)
    const [lastPage,setLastPage]= useState(false)
    const [firstPage,setFirtPage]= useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [info_pagination, setInfo_Pagination]=useState({pageNumber:1, limit:LIMITE_PAGE})
    const [totalDataShowed,setTotalDataShowed ] =useState(0)
    let initData ={...dataSubmit}
    initData.id_user = data_user.id
    const [stateDataSubmit, setStateDataSubmit]=useState(initData)
  
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

    // set submit status = true
    const handleCheckSubmit = ()=>{
        setIsSubmit(true)
    }
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
        setFirtPage(false)
        for(var i=0;i<info_pagination.limit;i++){
            if(allData[index] !== undefined){
                newArray.push(allData[index])
                index++
                if(index === allData.length)
                {
                    setLastPage(true)
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
    //go home page
    const handle_goHome=()=>{
        history.push("/")
    }
    var dataCurrent = []
    if(dataShowing.length>0){
        dataCurrent=dataShowing
    }
    return (
        <div className="UserTestArea">
            <h1 className="title_test">Bài kiểm tra</h1>
            {dataCurrent?.map((ques, index) => (
                <div key={index} className="question">
                    <Title level={4}>
                       {`${totalDataShowed - (dataCurrent.length-(index+1))}/ ${ques.question}`}
                    </Title>
                    <div className="answers">
                        <RadioButton 
                           list_option ={ques.answers}
                           handle_getChooseOption={(e)=>handle_getChooseOption(e,ques.id)}
                           user_choices ={stateDataSubmit.data_choice}
                           isSubmit={isSubmit}
                           question_id={ques.id}
                        />
                    </div>
                </div>
            ))}
            <div className="action_button_area"> 
                <div>
                <Button onClick ={handle_goHome} className="close_button" type="primary">Thoát</Button>         
                {firstPage !==true ?
                    <Button onClick ={handle_Prev}className="prev_button" type="primary">prev</Button>
                :''}
                {lastPage !==true ?
                    <Button onClick ={handle_Next} className="next_button" type="primary">Next</Button>
                :''}
                <Modalconfirm
                    dataSource={stateDataSubmit}
                    handleCheckSubmit={handleCheckSubmit}
                />
                </div>
                
            </div>
          
            <Resultpopup/>
        </div>
    );
};


export default Usertest;
