import ShowMoreText from "react-show-more-text";

interface Props {
  content: string;
}

const Content = ({ content }: Props) => {
  return (
    <div className="pb-1 text-sm text-left">
      <ShowMoreText
        more={<button className="text-grayA8">more</button>}
        less=""
        truncatedEndingComponent={"... "}
      >
        {content}
      </ShowMoreText>
    </div>
  );
};

export default Content;
