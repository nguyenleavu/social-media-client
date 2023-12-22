import PostModal from "@/components/PostModal";

interface PostModalPageProps {
  params: {
    id: string;
  };
}

const PostModalPage = ({ params }: PostModalPageProps) => {
  return <PostModal id={params.id} />;
};

export default PostModalPage;
