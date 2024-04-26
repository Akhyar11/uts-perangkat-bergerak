import { readFileSync, writeFileSync } from "fs";

export interface DataIter {
  id: string;
  d0: PinType;
  d1: PinType;
  d2: PinType;
  d3: PinType;
}

export type PinType = {
  label: string;
  condition: boolean;
};

export function loadData(): DataIter[] {
  const dataJson = readFileSync("src/data.json", "utf-8");
  const data = JSON.parse(dataJson);
  return data;
}

export function writeData(data: DataIter[]) {
  const dataJson = JSON.stringify(data);
  writeFileSync("src/data.json", dataJson);
}

export function findData(id: string) {
  const datas = loadData();
  const data = datas.find((data) => data.id === id);
  if (data) return data;
  else return false;
}

export function updateData(d: DataIter) {
  const datas = loadData();
  const newData = datas.map((data) => {
    if (data.id === d.id) {
      return d;
    } else {
      return data;
    }
  });

  writeData(newData);
  return true;
}

export function createData(d: DataIter) {
  const datas = loadData();
  const findData = datas.find((data) => data.id === d.id);
  if (!findData) {
    datas.push(d);
    writeData(datas);
    return true;
  } else return false;
}

export function delateData(id: string) {
  const datas = loadData();
  const findData = datas.find((data) => data.id === id);
  if (findData) {
    const newData: DataIter[] = [];
    datas.map((data) => {
      if (data.id !== id) {
        newData.push(data);
      }
    });

    writeData(newData);
    return true;
  } else return false;
}
