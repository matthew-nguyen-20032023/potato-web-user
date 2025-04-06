import { IoMdStar } from "react-icons/io";
function Star() {
  return <IoMdStar style={{ color: "#656E37" }} size={25} />;
}
function NoStar() {
  return <IoMdStar style={{ color: "#d4c7c7" }} size={25} />;
}

export default function StarContainer({
  average_star = 0,
  review_count = 0,
}: {
  average_star?: number;
  review_count?: number;
}) {
  return (
    average_star && (
      <div className="relative">
        <div className="absolute flex items-center">
          <div className="secondary-color text-xl">{average_star}</div>
          {average_star > 0 && <Star />}
          {average_star > 1 && <Star />}
          {average_star > 2 && <Star />}
          {average_star > 3 && <Star />}
          {average_star > 4 && <Star />}
          {average_star < 5 && <NoStar />}
        </div>
        <div className="absolute right-5 secondary-color text-xl">
          {review_count} ratings
        </div>
      </div>
    )
  );
}
