import React from "react";

const lists = [
  {
    name: "Voice Note",
  },
  {
    name: "Audio Gem",
  },
];

interface tabsProps {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;
  tabList?: Array<any>;
}
const CreationTabs: React.FC<tabsProps> = (props) => {
  const { currentTab, setCurrentTab, tabList = lists } = props as tabsProps;
  return (
    <div className="flex">
      {tabList.map((item, index) => {
        return (
          <div
            key={index + "q"}
            className="mr-[4px] text-[12px] py-[3px] px-[10px] font-medium  rounded-[16px] cursor-pointer flex items-center justify-center"
            style={{
              fontWeight: index === currentTab ? "600" : "500",
              border:
                index === currentTab ? "2px solid #0D0D0D" : "2px solid #fff",
            }}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default CreationTabs;
