"use client";

import Footer from "@/components/Footer";
import PostDetail from "@/components/PostDetail";

interface PostModalPageProps {
  params: {
    id: string;
  };
}

const PostDetailPage = ({ params }: PostModalPageProps) => {
  return (
    <div className="flex items-center min-h-screen flex-col px-16">
      <div className="py-16">
        <PostDetail id={params.id} smallSize />
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
