"use client"

import { useState } from "react";

export function SendKey() {
  const [ip, setIp] = useState("");

  async function postLocal() {
    console.log(ip);
    await fetch(`https://${ip}:3001/press/E`, {headers:{
        "Access-Control-Request-Private-Network": "true",
    }});
  }
    return (
        <>
        <input className="text-black" type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
        <div className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors cursor-pointer" onClick={postLocal}>
            <p>Send Key!</p>
        </div>
        </>
    )
}