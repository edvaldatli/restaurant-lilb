export default function CocktailPlaceholder() {
  return (
    <div className="h-32 bg-white w-full p-4 rounded-xl">
      <div className="animate-pulse flex flex-row  w-full h-full gap-4">
        <div className="w-1/6 bg-gray-400 rounded-xl"></div>
        <div className="flex flex-col w-full gap-2 h-full">
          <div className="w-full h-10 bg-gray-400 rounded-xl"></div>
          <div className="w-1/2 h-8 bg-gray-400 rounded-xl"></div>
          <div className="my-auto"></div>
          <div className="flex flex-row justify-end w-full">
            <div className="h-10 w-20 bg-gray-400 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
