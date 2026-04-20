"use client"
import React from "react";

export default function Tomato() {
    return (
        <div>
            <div> <p>
                <h1 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    background: "limegreen",
                    margin: "0px",
                    padding: "10px",
                    // borderRadius: "10px"
                    color: "white"
                }}>
                    Unvision</h1>
                <h1 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0px",
                    padding: "10px",
                    textAlign: "center"

                }}>
                    Password Reset OTP
                </h1>
                <p style={{
                    marginTop: "4px",
                    marginBottom: "6px"
                }}>Hi Raj Ritik ,</p>

                <p
                >We received a request to verify your identity.</p>
                <p>Please enter the following One-Time Password OTP :</p>
                <h1 style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold"

                }}>
                    Please note: This request will expirein 4 hours.
                </h1>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px"
                }}>

                    <div style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "5px",
                        background: "limegreen",
                        padding: "10px 15px",
                        display: "inline-block",
                        borderRadius: "25px",
                        textAlign: "center",
                        color: "white"
                    }}
                    >
                        232323
                    </div>

                </div>

                <p style={{ marginTop: "15px" }}>
                    This OTP will expire shortly for security reasons.
                    Do not share this code with anyone.
                </p>

                <p style={{ marginTop: "5px" }}>If you did not initiate this request, please ignore this email.</p>

                <p style={{ marginTop: "15px" }}>Thank you,<br />Your App Team</p>
            </p></div>
            <br /><br /><br />
            <div> <p>
                <h1 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    background: "limegreen",
                    margin: "0px",
                    padding: "10px",
                    // borderRadius: "10px"
                    color: "white"
                }}>
                    Unvision</h1>
                <h1 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0px",
                    padding: "10px",
                    textAlign: "center"

                }}>
                    Password Reset request
                </h1>
                <p style={{
                    marginTop: "4px",
                    marginBottom: "6px"
                }}>Hi Raj Ritik ,</p>

                <p
                >We received a request to reset your passwor. To proceed, simply click  the button below. You may be asked to verify your identity before updating your password .</p>
                <h1 style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold"

                }}>
                    Please note: This request will expirein 10 minutes.
                </h1>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px"
                }}>

                    <a style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "5px",
                        background: "limegreen",
                        padding: "10px 15px",
                        display: "inline-block",
                        borderRadius: "25px",
                        textAlign: "center",
                        color: "white"
                    }}
                        href="http//localhost/resetpassword"
                    >
                        Reset your password
                    </a>

                </div>

                <p style={{ marginTop: "15px" }}>
                    Having troubles? Just copy and paste this link into your browser: http//localhost/resetpassword
                </p>

                <p style={{ marginTop: "5px" }}>If you didn't make this request, no further action is required.</p>

                <p style={{ marginTop: "15px" }}>Thank you,<br />Your App Team</p>
            </p></div>
            <div>
                <div>
                    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>

                        <h2
                            style={{
                                background: "#4CAF50",
                                color: "white",
                                padding: "12px",
                                margin: 0,
                            }}
                        >
                            Apna Web Tech
                        </h2>

                        <p style={{ marginTop: "15px" }}>
                            Hello Raj ,
                        </p>

                        <p>
                            his mail confirmsthat you've successfully update your unvision account password. Nofurther action is required.  <br />
                            please contact <a href="httplocalhost/contactus">unvision support</a>if you  did not authorized this change.
                        </p>


                        <p style={{ marginTop: "20px" }}>
                            Thanks,
                            <br />
                            <b>Apna Web Tech Team</b>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}