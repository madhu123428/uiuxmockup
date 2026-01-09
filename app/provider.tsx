"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { set } from "date-fns";
import { SettingContext } from "@/context/SettingContext";

function Provider({ children }: any) {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [settingsDetail, setSettingDetail] = useState();
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const result = await axios.post("/api/user", {
      //user data
    });
    console.log(result.data);
    setUserDetail(result?.data);
  };
  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <SettingContext.Provider value={{ settingsDetail, setSettingDetail }}>
          <div>{children}</div>
        </SettingContext.Provider>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
