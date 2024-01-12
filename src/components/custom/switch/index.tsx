import React from "react";
import { Switch as SwitchAntd } from "antd";
import "./index.css";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange ? event.target.checked : null;
  };

  return <SwitchAntd></SwitchAntd>;
};

export default Switch;
