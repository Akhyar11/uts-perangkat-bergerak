export const IsMsg = ({ msg }: { msg: string }) => {
  return msg !== "" ? (
    <div className="w-full mb-4 bg-red-400 flex justify-center items-center text-white p-4 rounded-lg font-semibold">
      {msg}
    </div>
  ) : (
    <></>
  );
};
