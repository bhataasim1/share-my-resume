import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <HashLoader
        color="#2563EB"
        className="flex justify-center items-center"
      />
    </div>
  );
}
