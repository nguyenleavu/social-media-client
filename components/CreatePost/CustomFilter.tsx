import RangeSlider from "@/components/RangeSlider";
import { ChangeEvent, RefObject, useState } from "react";

interface Props {
  imgRef: RefObject<HTMLImageElement>;
}

const CustomFilter = ({ imgRef }: Props) => {
  const [contrast, setContrast] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(100);
  const [sepia, setSepia] = useState<number>(0);
  const [gray, setGray] = useState<number>(0);

  const onChangeContrast = (e: ChangeEvent<HTMLInputElement>) => {
    setContrast(Number(e.target.value));
    setCustomFilterClass();
  };

  const onChangeBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
    setCustomFilterClass();
  };

  const onChangeSaturate = (e: ChangeEvent<HTMLInputElement>) => {
    setSaturate(Number(e.target.value));
    setCustomFilterClass();
  };
  const onChangeSepia = (e: ChangeEvent<HTMLInputElement>) => {
    setSepia(Number(e.target.value));
    setCustomFilterClass();
  };
  const onChangeGray = (e: ChangeEvent<HTMLInputElement>) => {
    setGray(Number(e.target.value));
    setCustomFilterClass();
  };

  const setCustomFilterClass = () => {
    const style = `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%) sepia(${sepia}%) grayScale(${gray}%)`;
    const divImg = imgRef.current;
    if (divImg) {
      divImg.style.filter = style;
    }
  };
  return (
    <div className="px-4">
      <RangeSlider
        value={brightness}
        label="Brightness"
        onChange={onChangeBrightness}
      />
      <RangeSlider
        value={contrast}
        label="Contrast"
        onChange={onChangeContrast}
      />
      <RangeSlider
        value={saturate}
        label="Saturate"
        onChange={onChangeSaturate}
      />
      <RangeSlider value={sepia} label="Sepia" onChange={onChangeSepia} />
      <RangeSlider value={gray} label="Gray scale" onChange={onChangeGray} />
    </div>
  );
};

export default CustomFilter;
