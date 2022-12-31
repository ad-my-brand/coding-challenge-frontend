import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightRotate } from "@fortawesome/free-solid-svg-icons";
export default function (App) {
    function NetworkDetector() {
        const [isConnected, setConnection] = useState(true)
        const [user, setUser] = useState([])
        const style = {
            
        }
        useEffect(() => {
            const condition = navigator.onLine ? "onLine" : "offLine";
            if (condition) {
                let webPing = setInterval(
                    () => {
                        fetch('//google.com', {
                            mode: 'no-cors',
                        })
                            .then((res) => {
                                setConnection(true)
                                console.log("Client is Online")
                                console.log("fetching user...")
                                fetchUser()
                                clearInterval(webPing)
                                return
                            }).catch(() => { console.log("Network Fail!!"); setConnection(false) })
                    }, 2000);
                return
            }
            setConnection(false)
        }, [])


        //Fetch useer as network connecction is successfull
        const fetchUser = async () => {

            await axios.get("https://jsonplaceholder.typicode.com/users")
                .then(res => {
                    setUser(res.data)                    
                }
                )
                .catch((err) => {
                    console.log(err)
                    let x = window.performance.navigation.type
                    // this is to check wheather page is reloaded as to cause NetworkHelp useEffect
                    // once has already been reloaded or not 

                    if (x == 1) {
                        // window.performance.navigation.type = 0;
                        window.location.reload(false);
                    }

                })
        }
        return (
            <div>
                { !(isConnected) && (<div className="internet-error text-primary">
                    <p>Internet connection lost</p>
                    <button className="fine-tune" onClick={() => {
                        window.location.reload(false)
                    }}><FontAwesomeIcon icon={faArrowRightRotate} /></button>
                </div>)
                }
                <App user={user} />
            </div>

        )
    }
    return NetworkDetector
}