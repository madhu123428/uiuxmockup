"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { set } from 'date-fns';

function Provider({children}:any) {
    const [userDetail, setUserDetail] =useState<any>(null);
    useEffect(()=>{
       CreateNewUser();
    },[])

    const CreateNewUser=async()=>{
        const result=await axios.post('/api/user', {
            //user data
        });
        console.log(result.data);
        setUserDetail(result?.data);
    }
  return (
    <div>
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
          <div>{children}</div>
        </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
