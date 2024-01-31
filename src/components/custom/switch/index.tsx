import React from "react";
import { Switch as SwitchAntd } from "antd";
import "./index.css";

interface SwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleChange = (checked: boolean) => {
    onChange(checked);
  };

  return <SwitchAntd checked={checked} onChange={handleChange}></SwitchAntd>;
};

export default Switch;
