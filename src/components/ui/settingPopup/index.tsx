import React, { useEffect } from "react";
import PopupView from "../popup";
import Image from "next/image";
import Button from "@/components/custom/button";
import Search from "@/components/custom/search";
import plusIcon from "@/assets/popup/plus.svg";
import Switch from "@/components/custom/switch";
import { getPersonThreshold, setPersonThreshold } from "@/api/model/profile";
import { useSelector } from "react-redux";
import Toaster from "@/components/custom/Toast";

interface Props {
  // Define your component props here
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
}

const SettingPopup: React.FC<Props> = ({ setShowPopup, showPopup }) => {
  const [selectedPrice, setSelectedPrice] = React.useState(0);

  const [hideButtonBg, setHideButtonBg] = React.useState(false);

  const { userinfo } = useSelector((state: any) => state.user);

  const [checked, setChecked] = React.useState(false);

  const [threshold, setThreshold] = React.useState<string>("");

  const getPersonThresholdFunc = async () => {
    const res = await getPersonThreshold(userinfo.twitterUidStr);
    setChecked(res.result.thresholdFlag);
    setThreshold(res.result.threshold);
  };

  const clickSaveThreshold = async () => {
    const res = await setPersonThreshold(
      userinfo.twitterUidStr,
      Number(threshold),
      checked
    );
    setShowPopup(false);
    Toaster.success("Save successfully");
  };

  useEffect(() => {
    if (!showPopup) return;
    getPersonThresholdFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup]);

  return (
    <PopupView
      width={355}
      showPopup={showPopup}
      handleCancel={() => {
        setThreshold("");
        setShowPopup(false);
        setSelectedPrice(0);
      }}
      titleText="Setting"
    >
      <div className="text-[14px] font-medium">
        Thresholds For Joining The Club
      </div>

      <div className="mt-[4px] flex items-center">
        <Switch onChange={setChecked} checked={checked}></Switch>
        <div className="ml-[12px]">
          <Search
            width={247}
            height={32}
            value={threshold}
            onChange={(val) => {
              setThreshold(val);
            }}
            placeholder="min 0.001"
            rightNode={<div className="text-[16px] font-medium">Key</div>}
          ></Search>
        </div>
      </div>
      <div className="mt-[24px]">
        <Button
          hideBottomBackground={true}
          active={false}
          width="327px"
          height="54px"
          text={"Save"}
          color={"#fff"}
          normalBackGround={"#0D0D0D"}
          borderRadius="27px"
          border="none"
          buttonClick={() => {
            clickSaveThreshold();
          }}
        ></Button>
      </div>
    </PopupView>
  );
};

export default SettingPopup;
