import React,{ useState,useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { MethodCommon } from "../../../common/MethodCommon";
import {
    TOKEN_NAME,
    INFO_USER,
    REFRESH_TOKEN,
} from "../../../common/parameters";
import { useHistory } from "react-router-dom";
import { Menu, Dropdown} from 'antd';
import Userdotest from "../../../containers/UserDoTest";
import { UserOutlined } from '@ant-design/icons';
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
    const menuUser = (
        <Menu>
          <Menu.Item key="logout">
            <p onClick={handleLogout}> Logout</p>
          </Menu.Item>
        </Menu>
      );
    return (
        <header>
            <div id="brand">
                <a href="/">Quizz</a>
            </div>
            <nav>
                <Link onClick={showModal} className="link" to="">
                    Thi
                </Link>
                {user_role === "User" ? (
                    <Link className="link" to="/result-me">
                        Kết quả
                    </Link>
                ) : (
                    ""
                )}
                {user_role === "Admin" ? (
                    <Link className="link" to="/user">
                        Người Dùng
                    </Link>
                ) : (
                    ""
                )}

                {user_role === "Admin" ? (
                    <Link className="link" to="/test-plan">
                        Kì thi
                    </Link>
                ) : (
                    ""
                )}

                {user_role === 'Admin'? 
                <Link className="link" to="/question">
                    Câu hỏi
                </Link>:''}

                 <Dropdown className="userDropdown" overlay={menuUser} placement="bottomCenter">
                            <p><UserOutlined className="iconUser"/> {data_user.name}</p>
                </Dropdown>
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
