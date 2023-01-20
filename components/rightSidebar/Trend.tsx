import Link from "next/link";

const Trend = ({ trend }: { trend: { number: number; hashtag: string } }) => {
  return (
    <div className="">
      <Link
        href={`/trends/${trend.hashtag}`}
        className="text-sm font-bold text-sky-600 hover:underline underline-offset-2"
      >
        {trend.hashtag}
      </Link>
      <h4 className="text-[0.7rem] font-light">{trend.number} Posts</h4>
    </div>
  );
};

export default Trend;
