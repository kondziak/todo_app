import register_img from "../../../images/register.png";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {red} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import { useState } from "react";
import userService from "../../../services/userService";
import Typography from '@mui/material/Typography';
import SignUpWindowLayer from "./SignUpWindowLayer";

const SignUpLayer = () => {
    const ColorButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[400],
        '&:hover': {
            backgroundColor: red[700],
        },
    }));
    const bothPasswordsMustMatchText ="Both passwords must match";
    const passwordText = "Password must have 7 characters, 1 digit, letter and special character";
    const cantBeEmptyText = "Field can't be empty";
    const wrongEmailFormatText = "Email is incorrect";
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(true);
    const [response,setResponse] = useState({});
    const [email,setEmail] = useState(''),[password, setPassword] = useState('');
    const [name,setName] = useState(''),[lastName,setLastName] = useState('');
    const [secondPassword,setSecondPassword] = useState('');
    const [errorSet, setErrorSet] = useState([false,false,false,false,false]);
    const [helpingText, setHelpingText] = useState(["","","","",""]);

    const signUpUser = () => {
        let newErrorSet = [...errorSet], newHelpingTextSet = [...helpingText], hasEmptyEmail = false, hasOnePasswordEmpty = false;
        if (checkEmptyField(name)) {
            changeElements(newErrorSet,true,newHelpingTextSet,cantBeEmptyText,0);
        } else {
            changeElements(newErrorSet,false,newHelpingTextSet,'',0);
        }
        if (checkEmptyField(lastName)) {
            changeElements(newErrorSet,true,newHelpingTextSet,cantBeEmptyText,1);
        } else {
            changeElements(newErrorSet,false,newHelpingTextSet,'',1);
        }
        if (checkEmptyField(email)) {
            changeElements(newErrorSet,true,newHelpingTextSet,cantBeEmptyText,2);
             hasEmptyEmail = true;
        } else {
            changeElements(newErrorSet,false,newHelpingTextSet,'',2);
        }
        if (checkEmptyField(password)) {
            changeElements(newErrorSet,true,newHelpingTextSet,cantBeEmptyText,3);
            hasOnePasswordEmpty = true;
        } else {
            changeElements(newErrorSet,false,newHelpingTextSet,'',3);
        }
        if (checkEmptyField(secondPassword)) {
            changeElements(newErrorSet,true,newHelpingTextSet,cantBeEmptyText,4); 
            hasOnePasswordEmpty = true;
        } else {
            changeElements(newErrorSet,false,newHelpingTextSet,'',4);
        }

        if (!hasEmptyEmail) {
            if (!isEmailValid(email)) {
                changeElements(newErrorSet,true,newHelpingTextSet,wrongEmailFormatText,2);
            } else {
                changeElements(newErrorSet,false,newHelpingTextSet,'',2);
            }
        }

        if (!hasOnePasswordEmpty) {
            if (password !== secondPassword) {
                changeElements(newErrorSet,true,newHelpingTextSet,bothPasswordsMustMatchText,3);
                changeElements(newErrorSet,true,newHelpingTextSet,bothPasswordsMustMatchText,4);
            } else {
                if (!isPasswordValid()) {
                    changeElements(newErrorSet,true,newHelpingTextSet,passwordText,3);
                    changeElements(newErrorSet,true,newHelpingTextSet,passwordText,4);
                } else {
                    changeElements(newErrorSet,false,newHelpingTextSet,'',3);
                    changeElements(newErrorSet,false,newHelpingTextSet,'',4);
                }
            }
        }

        setErrorSet(newErrorSet);
        setHelpingText(newHelpingTextSet);
        for (let i = 0; i < 5;i++) {
            if (newErrorSet[i] === true) {
                return;
            }
        }

        const registerUser = {
            name : name,
            lastname : lastName,
            password : password,
            email : email
        };

        userService.createUser(registerUser)
            .then(response => {
                console.log(response);
                setResponse(response);
                setLoading(false);
                setOpen(true);
            })
            .catch(err => {
                setResponse(err.response);
                setLoading(false);
                console.log(err);
                setOpen(true);
            });
        
    }

    const handleClose = () => setOpen(false);
    const checkEmptyField = (field) => field === null || field.trim().length === 0;
    
    const changeElements = (newErrorSet, errorValue, newHelpingTextSet, textValue,position) => {
        newErrorSet[position] = errorValue;
        newHelpingTextSet[position] = textValue;
    }
    const isEmailValid = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const isPasswordValid = () => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
        return pattern.test(password);
    }

    return (
        <>
        <div className="container">
            <div className="left_side">
                <img src={register_img} height="900px" width="900px" alt="register"></img>
            </div>
            <div className="right_side">
                <div className="sign_in_box">
                    <div className="register_box">
                        <FormControl className="register_form" variant="standard">
                            <Typography variant="h2" color="#5237b4">Sign Up</Typography>
                            <TextField label="name" value={name} onChange={(event) => setName(event.target.value)} error={errorSet[0]} helperText={helpingText[0]}/>
                            <TextField label="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)} error={errorSet[1]} helperText={helpingText[1]}/>
                            <TextField label="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errorSet[2]} helperText={helpingText[2]}/>
                            <TextField label="password" value={password} onChange={(event) => setPassword(event.target.value)} error={errorSet[3]} helperText={helpingText[3]}/>
                            <TextField label="secondPassword" value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)} error={errorSet[4]} helperText={helpingText[4]}/>
                            <ColorButton variant='contained' onClick={(event) => signUpUser(event)} type="submit" size='large'>Sign Up</ColorButton>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
        {open === true && <SignUpWindowLayer loading={loading} response={response} open={open} setOpen={handleClose}/>}
        </>
    );
}

export default SignUpLayer;