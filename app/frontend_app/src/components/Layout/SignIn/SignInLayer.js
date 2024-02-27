import "../layout.css";
import login from "../../../images/login.png";
import computer from "../../../images/computer.png";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import userService from "../../../services/userService";
import {red} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import { useState } from "react";
import SignInWindowLayer from "./SignInWindowLayer";
import SuccesfulWindowLogin from "./SuccesfulWindowLayer";
import CookieService from "../../../services/cookiesService";
import { useDispatch } from 'react-redux';
import { addEmail } from "../../../reducers/userReducer";

const SignInLayer = () => {
    const dispatch = useDispatch();
    const ColorButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[400],
        '&:hover': {
            backgroundColor: red[700],
        },
    }));
    const [email,setEmail] = useState(''),[password, setPassword] = useState(''),[badCredentials,setBadCredentials] = useState(false);
    const [errorMessage,setErrorMessage]=useState(""), [open,setOpen] = useState(false),[succesfulLogin, setSuccesfulLogin] = useState(false);
    const signUserIn = async () => {
        const user = {
            email : email,
            password : password
        };
        try {
            const response = await userService.login(user);
            if (response.status === 200) {
                dispatch(addEmail(email));
                handleSettingToken(response.data.token,response.data.tokenType);
                openSuccesfulPopup();
            }
        } catch(err) {
            const errResponse = err.response;
            if (errResponse.status === 400) {
                setBadCredentials(true);
                setErrorMessage(errResponse.data.token);
                setOpen(true);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    const openSuccesfulPopup = () => {
        setSuccesfulLogin(true);
    }

    const handleSettingToken = (token, tokenType) => {
        const cookieService = new CookieService();
        cookieService.setCookie('token',token);
        cookieService.setCookie('tokenType',tokenType);   
    }

    return (
        <div className="container">
            <div className="left_side">
                <img src={login} alt="login" height="900px" width="900px" />
            </div>
            <div className="right_side">
                <div className="sign_in_box">
                    <img className="computer" src={computer} alt="computer"height="300px" width="300px"></img>
                    <div className="login_box">
                        <FormControl className="login_form" variant="standard">
                            <TextField label="email" className="email_input" value={email} onChange={(event) => {setEmail(event.target.value)}}></TextField>
                            <TextField label="password" className="password_input" value={password} onChange={(event) => {setPassword(event.target.value)}}></TextField>
                            <ColorButton variant='contained' type="submit" onClick={signUserIn} size='large'>Sign In</ColorButton>
                        </FormControl>
                    </div>
                </div>
            </div>
            {badCredentials && <SignInWindowLayer open={open} close={handleClose} text={errorMessage}/>}
            {succesfulLogin && <SuccesfulWindowLogin open={succesfulLogin} />}
        </div>
    );
}

export default SignInLayer;