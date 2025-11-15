export default function Loading() {
  return (
    <div className="animate-pulse bg-black min-h-screen">
      <div className="h-[70vh] w-full bg-linear-to-b from-gray-800 to-black" />
      <div className="space-y-12 px-4 md:px-10 py-10 -mt-32">
        {[1, 2, 3, 4].map((section) => (
          <div key={section} className="space-y-4">
            <div className="h-8 w-48 rounded bg-gray-700" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((card) => (
                <div
                  key={card}
                  className="w-[150px] h-[225px] rounded-md bg-gray-700"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
