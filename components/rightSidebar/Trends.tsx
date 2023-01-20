import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Trend from "./Trend";

async function getTrends() {
  const trendsRef = collection(db, "trends");
  const q = query(trendsRef, orderBy("number", "desc"), limit(4));
  const querySnapshot = await getDocs(q);
  const trends: { number: number; hashtag: string }[] = [];
  querySnapshot.forEach((doc) => {
    const trend = doc.data();
    trends.push(trend as { number: number; hashtag: string });
  });
  return trends;
}

const Trends = async () => {
  const trendsData = await getTrends();
  return (
    <div className="p-4 bg-gray-100 flex flex-col mt-4 rounded-md gap-0">
      <h3 className="text-center text-sky-600">Trends</h3>
      <div className="h-[1px] mt-1 mb-2 bg-sky-600" />
      <div className="flex flex-col gap-2">
        {trendsData.map((trend, index) => {
          return <Trend key={index} trend={trend}></Trend>;
        })}
      </div>
    </div>
  );
};

export default Trends;
