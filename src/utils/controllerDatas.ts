import { db } from "./firebase";

export interface DataIter {
  id: string;
  userId: string;
  name: string;
  d0: PinType;
  d1: PinType;
  d2: PinType;
  d3: PinType;
  sensor: {
    name: string;
    value: boolean;
  };
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

export async function getNodeByUserId(userId: string) {
  try {
    const doc = await db
      .collection("nodes")
      .where("userId", "==", userId)
      .get();
    if (!doc.empty) {
      const data: DataIter[] = doc.docs.map((payload) => {
        const d = payload.data();
        return {
          id: d.id,
          d0: d.d0,
          d1: d.d1,
          d2: d.d2,
          d3: d.d3,
          name: d.name,
          sensor: d.sensor,
          userId: d.userId,
        };
      });
      return data;
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
    await db
      .collection("nodes")
      .doc(d.id)
      .set({
        userId: d.userId,
        name: d.name,
        d0: d.d0,
        d1: d.d1,
        d2: d.d2,
        d3: d.d3,
        sensor: {
          name: "nn",
          value: false,
        },
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
    await db.collection("nodes").doc(d.id).update({
      userId: d.userId,
      name: d.name,
      d0: d.d0,
      d1: d.d1,
      d2: d.d2,
      d3: d.d3,
      sensor: d.sensor,
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
