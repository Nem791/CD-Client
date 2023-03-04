import React from "react";

const IconEyeToggle = ({ open = false, onClick = () => {} }) => {
  //   console.log(open);
  if (open) {
    return (
      <ion-icon name="eye-off" class="eye-size" onClick={onClick}></ion-icon>
    );
  }
  return <ion-icon name="eye" class="eye-size" onClick={onClick}></ion-icon>;
};

export default IconEyeToggle;
