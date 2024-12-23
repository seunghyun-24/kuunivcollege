import { Panel, useReactFlow, getNodesBounds } from "@xyflow/react";
import { toPng } from "html-to-image";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.setAttribute("download", `${dataUrl}.png`);
  a.setAttribute("href", dataUrl);
  a.click();
}

const padding = 50;

function DownloadButton() {
  const { getNodes } = useReactFlow();

  const onClick = async () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewportElement = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement | null;

    if (viewportElement) {
      const imageWidth = nodesBounds.width + padding * 2;
      const imageHeight = nodesBounds.height + padding * 2;

      try {
        const dataUrl = await toPng(viewportElement, {
          backgroundColor: "#efefef",
          width: imageWidth,
          height: imageHeight,
          style: {
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            transform: `translate(${-nodesBounds.x + padding}px, ${
              -nodesBounds.y + padding
            }px) scale(1)`,
            transformOrigin: "top left",
          },
        });
        downloadImage(dataUrl);
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <button className="download-btn" onClick={onClick} style={buttonStyle}>
      Download Image
    </button>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

export default DownloadButton;
