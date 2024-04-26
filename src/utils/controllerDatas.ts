import { db } from "./firebase";

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

export const getAllNode = async () => {
  try {
    const snapshot = await db.collection("nodes").get();
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return false;
  }
};

export async function getNode(nodeID: string) {
  try {
    const doc = await db.collection("nodes").doc(nodeID).get();
    if (doc.exists) {
      return doc.data();
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const addNode = async (d: DataIter) => {
  try {
    await db.collection("nodes").doc(d.id).set({
      d0: d.d0,
      d1: d.d1,
      d2: d.d2,
      d3: d.d3,
    });
    console.log("User added with ID:", d.id);
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
};

export const updateNode = async (d: DataIter) => {
  try {
    await db.collection("users").doc(d.id).update({
      d0: d.d0,
      d1: d.d1,
      d2: d.d2,
      d3: d.d3,
    });
    console.log("User updated with ID:", d.id);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const deleteNode = async (nodeID: string) => {
  try {
    await db.collection("nodes").doc(nodeID).delete();
    console.log("User deleted with ID:", nodeID);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
