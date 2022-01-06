import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div id="brand">
                <a href="/">Quizz</a>
            </div>
            <nav>
                <Link className="link" to="/user">
                    Người Dùng
                </Link>
                <Link className="link" to="/test-plan">
                    Kế hoạch
                </Link>
                <Link className="link" to="/question">
                    Câu hỏi
                </Link>
                <Link className="link" to="/test-list">
                    Bài kiểm tra
                </Link>
            </nav>
        </header>
    );
};

export default Header;
