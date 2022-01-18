import React,{ useState, useEffect} from 'react';
import { loadingQuestionTest } from "../../../constants/backend_url";
import axios from "axios";
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN,LIMITE_PAGE} from '../../../common/parameters'
import { Typography, Radio,Button ,Row, Col} from "antd";
import RadioButton from './Controls/Radio_button ';
import { dataSubmit, chooseObject } from './Models/Models';
import Modalconfirm from './Controls/ModalConfirm';
import Resultpopup from './Controls/ResultPopup';
import { useHistory } from "react-router-dom";
import './Css/index.css'
import CheckBoxButton from './Controls/CheckBox_button';

const { Title } = Typography;

const Usertest = ({props}) => {

    let history = useHistory();
    let data_user = MethodCommon.getLocalStorage(INFO_USER)
    const [allData, setAllData]= useState([])
    const [dataShowing, setDataShowing]= useState([])
    const [valueSkip,setValueSkip]= useState(0)
    const [lastPage,setLastPage]= useState(false)
    const [firstPage,setFirtPage]= useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [info_pagination, setInfo_Pagination]=useState({pageNumber:1, limit:LIMITE_PAGE})
    const [gotoQuestionId,setGotoQuestionId]=useState(null)
    let initData ={...dataSubmit}
    initData.id_user = data_user.id
    const [stateDataSubmit, setStateDataSubmit]=useState(initData)

    useEffect(() => {
        axios.post(loadingQuestionTest, {}).then((res)=>{
            let dataRes = res.data
           
            for(var i=0;i<dataRes.length;i++)
            {
                dataRes[i].index=i+1
            }
          
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
        })
   
    }, []);

    useEffect(() => {
       if(gotoQuestionId !==null )
       {
          let item = document.getElementsByClassName(`question${gotoQuestionId}`);
          let item_position = item[0].offsetTop;
          window.scrollTo({top:item_position,behavior: 'smooth'});
       }
    })

    //set submit = true
    const handleCheckSubmit = ()=>{
        setIsSubmit(true)
    }
    //handle choose option in each question
    const handle_getChooseOption =(value,questionID)=>{
        let object_data = {...stateDataSubmit}
        let objectChoose = {...chooseObject}
        objectChoose.id_question = questionID
        let NewValue = value
        if( typeof value === 'number')
        {
            objectChoose.user_choice = [value]
            NewValue=[value]
        }else{
            objectChoose.user_choice = value
            NewValue=value
        }
        var arrChoice = object_data.data_choice
        for(let i =0; i < arrChoice.length; i++)
        {
            if( arrChoice[i].id_question === questionID)
            {
                arrChoice[i].user_choice=NewValue
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
    for(var i=0;i<stateDataSubmit.data_choice.length;i++)
    {
        if(typeof stateDataSubmit.data_choice[i]==='string')
        {
            stateDataSubmit.data_choice[i]=JSON.parse(stateDataSubmit.data_choice[i])
        }
    }
    //go to question clicked
    let handle_GotoQuestion=(id,index)=>{
        console.log("index:",index)
        let newSkip = LIMITE_PAGE;
        var newArray = [...allData];
        var item_found=false;
        var isBettweenPage = true;
        var skipPage=null;
        do {
           let arrayCompare=[];
           if(newArray.length < LIMITE_PAGE)
           {
              skipPage = allData.length - newArray.length
              arrayCompare=newArray
           }else{
                skipPage = allData.length - newArray.length
                for(var i=0; i< newSkip; i++){
                    arrayCompare.push(newArray.shift())
                }
           }
           setValueSkip(skipPage)
           for(var j=0; j<arrayCompare.length; j++){
                if(id === arrayCompare[j].id){
                    item_found=true
                }
            }
           
            if(item_found === true)
            {
                for(var m=0; m < arrayCompare.length; m++)
                {
                    if(arrayCompare[m].index === allData.length)
                    {
                        setLastPage(true)
                        setFirtPage(false)
                        isBettweenPage = false
                    }
                    if(arrayCompare[m].index === 1){
                        isBettweenPage = false
                        setFirtPage(true)
                        setLastPage(false)
                    }
                }
                if(isBettweenPage === true)
                {
                    setFirtPage(false)
                    setLastPage(false)
                }
                setDataShowing(arrayCompare)
                setGotoQuestionId(index)
                // xx(listRef.current[index])
                // console.log(listRef.current[index])
            }
            // let a=  document.getElementsByClassName(`question${index}`)
            // console.log("a:",a)
        }while(!item_found);
    }
    
    return (
        <div className="UserTestArea">
            <div>
                <h1 className="title_test">Bài kiểm tra</h1>
                <div className="mainTest_Area">
                    <div className="listQuestionCurrent">
                        {dataCurrent?.map((ques, index) => (
                            <div key={index}  className={`question${ques.index}`}>
                                <Title level={4}>
                                {`${ques.index}/ ${ques.question}`}
                                </Title>
                                <div className="answers">
                                    {ques.is_multiple === 1 ? 
                                        <CheckBoxButton
                                            list_option ={ques.answers}
                                            handle_getChooseOption={(e)=>handle_getChooseOption(e,ques.id)}
                                            user_choices ={stateDataSubmit.data_choice}
                                            isSubmit={isSubmit}
                                            question_id={ques.id}
                                        />
                                    :
                                    <RadioButton 
                                            list_option ={ques.answers}
                                            handle_getChooseOption={(e)=>handle_getChooseOption(e,ques.id)}
                                            user_choices ={stateDataSubmit.data_choice}
                                            isSubmit={isSubmit}
                                            question_id={ques.id}
                                    />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="AllQuestion">
                         <div>
                             <div><p>Danh sách câu hỏi</p></div>
                             <div>
                                <Row className = "search_area" > 
                                    {stateDataSubmit.data_choice?.map((item, index) => (
                                        <Col key={index} xs={8} sm={8} md={8} lg={4} xl={4}>
                                            <div 
                                               className="itemQuestionTracking" 
                                               style={{ backgroundColor: item.user_choice.length >0 ? '#7ec1ff':'#ff7875' }} 
                                               onClick={()=>handle_GotoQuestion(item.id_question,index+1)}
                                            >
                                            {index+1}
                                            </div>
                                        </Col>
                                    ))
                                    }
                                </Row>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
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
