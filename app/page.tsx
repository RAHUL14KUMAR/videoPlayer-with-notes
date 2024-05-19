import VideoPlayer from "@/components/VideoPlayer";

export default function Home () {
  return (
    <div className="p-4 flex flex-col justify-center">
      <h1 className="w-full font-semibold text-xl pb-4">
        Video Player with Notes
      </h1>
      <VideoPlayer videoId="OjEg0IBR_ak?si=2zZIbs66uAcfu044" />
    </div>
  );
}
