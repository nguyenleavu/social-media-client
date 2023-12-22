import { ROUTES } from "@/constants/routes";
import Link from "next/link";

interface Props {
  commentCount: number;
  id: string;
}

const ViewAllComments = ({ commentCount, id }: Props) => {
  return (
    <div className="flex items-center">
      {commentCount > 0 && (
        <Link
          href={`${ROUTES.POST_ID}/${id}`}
          className="text-sm text-grayA8 text-left"
        >
          View all {commentCount} comments
        </Link>
      )}
    </div>
  );
};

export default ViewAllComments;
