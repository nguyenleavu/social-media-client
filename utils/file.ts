import { CroppedAreaPixels } from "@/types/user.types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: CroppedAreaPixels,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  // lấy phong nền của canvas
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }
  // lấy dộ radian
  const rotRad = getRadianAngle(rotation);

  // tính toán kích thước của một hình sau khi nó được xoay.
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // tạo kích thước của thẻ canvas bằng chiều cao và chiều ngang của 1 hình khi xoay
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Hình ảnh được dịch chuyển đến tâm của hình chữ nhật bao quanh nó.
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  // Hình ảnh được xoay một góc bằng radian rotRad.
  ctx.rotate(rotRad);
  // Hình ảnh được tỷ lệ theo chiều ngang và chiều dọc.
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  // Hình ảnh được dịch chuyển trở lại vị trí ban đầu.
  ctx.translate(-image.width / 2, -image.height / 2);

  // vẽ hình ảnh image tại vị trí x, y trên canvas ctx. Nếu x và y là 0, thì hình ảnh sẽ được vẽ ở góc trên cùng bên trái của canvas.
  ctx.drawImage(image, 0, 0);

  // tạo 1 thẻ canvas mới
  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Đặt kích thước của canvas mới bằng kích thước của vùng được cắt pixelCrop
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Vẽ một hình ảnh đã được cắt xén lên một canvas. Phương thức này có 8 đối số:
  // croppedCtx: Đây là bối cảnh 2D của canvas nơi hình ảnh đã được cắt xén sẽ được vẽ.
  // canvas: Đây là phần tử canvas chứa hình ảnh gốc.
  // pixelCrop: Đây là một đối tượng đại diện cho khu vực đã được cắt xén của hình ảnh. Nó có các thuộc tính sau:
  //      x: Tọa độ x của góc trên cùng bên trái của khu vực đã được cắt xén.
  //      y: Tọa độ y của góc trên cùng bên trái của khu vực đã được cắt xén.
  //      width: Chiều rộng của khu vực đã được cắt xén.
  //      height: Chiều cao của khu vực đã được cắt xén.
  // 0: Tọa độ x của góc trên cùng bên trái của khu vực nơi hình ảnh đã được cắt xén sẽ được vẽ trên canvas.
  // 0: Tọa độ y của góc trên cùng bên trái của khu vực nơi hình ảnh đã được cắt xén sẽ được vẽ trên canvas.
  // pixelCrop.width: Chiều rộng của khu vực nơi hình ảnh đã được cắt xén sẽ được vẽ trên canvas.
  // pixelCrop.height: Chiều cao của khu vực nơi hình ảnh đã được cắt xén sẽ được vẽ trên canvas.
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // để chuyển đổi canvas thành một đối tượng Blob
  return new Promise<Blob>((resolve) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(file);
      }
    }, "image/jpeg");
  });
};

export const getCropVideo = async (
  file: File,
  pixelCrop: CroppedAreaPixels
) => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  await ffmpeg.writeFile("in.mp4", await fetchFile(file));
  await ffmpeg.exec([
    "-i",
    "in.mp4",
    "-vf",
    `crop=${pixelCrop.width}:${pixelCrop.height}:${pixelCrop.x}:${pixelCrop.y}`,
    "-c:a",
    "copy",
    "-threads",
    "12",
    "-preset",
    "ultrafast",
    "-strict",
    "-2",
    "output.mp4",
  ]);
  const data = await ffmpeg.readFile("output.mp4");
  return new Blob([data], { type: "video/mp4" });
};

export const getImagesByVideo = async (file: Blob, duration?: number) => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  await ffmpeg.writeFile("in.mp4", await fetchFile(file));
  console.log(1);
  await ffmpeg.exec([
    "-i",
    "in.mp4",
    "-r",
    "30",
    "-s",
    "WxH",
    "-f",
    "image2",
    "image%03d.jpg",
  ]);
  console.log(2);
  const data = await ffmpeg.readFile("image%03d.jpg");
  console.log("data", data);
  return data;
};

export const createImage = (url: string) =>
  //biến link ảnh thành 1 thẻ image có src là link ảnh
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image as HTMLImageElement));
    image.addEventListener("error", (error) => reject(error));
    // Đặt thuộc tính crossOrigin của đối tượng HTMLImageElement thành anonymous. Điều này cần thiết để tránh các vấn đề cross-origin trên CodeSandbox.
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getRadianAngle = (degreeValue: number) => {
  // thay đổi giá trị degreeValue sang độ góc radian
  // ảnh minh hoạ https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkwOrvGEI2HbfG-L4B48TNbfTrm7S7pmhOmvESVEftNpelok9Z3FF0mLPh1c7LgGB-
  return (degreeValue * Math.PI) / 180;
};

export function rotateSize(width: number, height: number, rotation: number) {
  // lấy dộ radian
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File(
    [theBlob as any], // cast as any
    fileName,
    {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    }
  );
};
