import React,{ useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { MethodCommon } from '../../../common/MethodCommon'
import {TOKEN_NAME,INFO_USER,REFRESH_TOKEN} from '../../../common/parameters'
import { useHistory } from "react-router-dom";
import Userdotest from "../../../containers/UserDoTest";

const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let history = useHistory();
    let data_user =MethodCommon.getLocalStorage(INFO_USER)
    let user_role= data_user.role
  
    function handleLogout(){
        let token_cookie=MethodCommon.getCookies(TOKEN_NAME)
        let data_request ={ token:token_cookie}
        MethodCommon.clearCookie(TOKEN_NAME)
        MethodCommon.clearLocalStorage(INFO_USER)
        history.push("/login")
    //     axios.post("http://127.0.0.1:8000/api/auth/logout", data_request).then((response)=>{
    //         console.log("response:",response)
    //    })
    }
    //show modal add
    const showModal = () => {
        setIsModalVisible(true);
    };
    //cancel modal add
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <header>
            <div id="brand">
                <a href="/">Quizz</a>
            </div>
            <nav>
                <Link onClick={showModal} className="link" to="">
                   Thi
                </Link>
                {user_role === 'Admin'? 
                <Link className="link" to="/user">
                    Người Dùng
                </Link>:''}

                {user_role === 'Admin'? 
                <Link className="link" to="/test-plan">
                    Kế hoạch
                </Link>:''}

                {user_role === 'Admin'? 
                <Link className="link" to="/question">
                    Câu hỏi
                </Link>:''}

                <div>
                   { `Wellcome ${data_user.name}`}
                   {data_user.name !== null ? <button onClick={handleLogout}>Logout</button> :''}
                </div>
                <Userdotest
                    setIsModalVisible={setIsModalVisible}
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                />
            </nav>

        </header>
    );
};

export default Header;
