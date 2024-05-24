import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, []);

  return null;
}

export default Home;
