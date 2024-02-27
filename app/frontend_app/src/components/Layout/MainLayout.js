import { Outlet } from "react-router-dom";
import server from "../../images/server.png";
import computer from "../../images/computer.png";
import "./layout.css"; 
import SignButton from "../AccountComponents/SignButton";

const PrepareMainLayout = () => {
    return (
        <>
            <div className="container">
                <div className="left_side">
                    <img src={server} height="900px" width="900px" alt="server"/>
                </div>
                <div className="right_side">
                <img src={computer} className="computer_img" height="400px" width="400px" alt="computer"/>
                    <div className="box">
                        <SignButton text="Sign in" path="/sign_in"></SignButton>
                        <SignButton text="Sign up" path="/sign_up"></SignButton>
                    </div>
                </div>
            </div>
            <Outlet/>
        </> 
    );
}


export default PrepareMainLayout;