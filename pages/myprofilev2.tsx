import { Avatar, Card } from "@material-ui/core";
import React from "react";
import { sizing } from '@material-ui/system';
import ReactDOM from "react-dom";


export default function profile() {
    
    return (
        <div style={{ width: "100%", height: '100%', backgroundColor: 'rgb(192, 197, 255)' }}>
            <p>ok</p>
            <Card elevation={5} style={{width: '60%', margin: 'auto', marginTop:'50px' }}>
                <div className="wrapper">
                    <div style={{width:'30%'}}>
                        {/* <div style={{position:'relative', width:'80%', height:'0', paddingBottom:'80%', backgroundColor:'red' }}>
                            <Avatar alt="Tristan" src="pinguin.jpg" style={{width:'100%'}} />
                        </div> */}
                        <Avatar id='avatar' object-fit='none' alt="Tristan" src="pinguin.jpg" style={{width:'100px', height:'100px', margin:'20px 20px 20px 40px'}}/>
                    </div>
                    <div style={{width:'70%'}}>
                        <p>yes</p>
                    </div>
                </div>
            </Card>
            <h1>Coucou</h1>
        </div>


    )
}