// public/worker.ts
self.onmessage = (event) => {
  const { number } = event.data;

  // Lakukan pemrosesan atau operasi lain
  const result = number * 2;

  // Kirim hasil kembali ke thread utama
  console.log(result);
  self.postMessage(result);
};
