import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <p>
      Selamat datang di aplikasi kendali pintar NodeMCU, silahkan login terlebih
      dahulu{" "}
      <span
        className="text-blue-400 hover:cursor-pointer"
        onClick={() => router.push("/login")}
      >
        LOGIN
      </span>
    </p>
  );
}
