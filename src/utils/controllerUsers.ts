import { db } from "./firebase";
import { hashPassword, verifyPassword } from "./hashPass";

export interface UserInter {
  username: string;
  name: string;
  password: string;
}

export interface UserFirebaseInter {
  id: string;
  username?: string;
  name?: string;
  password?: string;
}

export async function getUser(id: string) {
  try {
    const doc = await db.collection("users").doc(id).get();
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

export async function getUserByUsername(username: string) {
  try {
    const doc = await db
      .collection("users")
      .where("username", "==", username)
      .get();
    if (!doc.empty) {
      return doc.docs;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function login(UserData: UserInter) {
  try {
    const findUser = await getUserByUsername(UserData.username);
    if (!findUser) {
      console.log("not fund user");
      return false;
    } else {
      const password = UserData.password;
      const storePass = findUser[0].data();
      const validPass = verifyPassword(password, storePass.password);
      if (validPass) return { id: findUser[0].id, ...findUser[0].data() };
      else {
        console.log("wrong password");
        return false;
      }
    }
  } catch (error) {
    console.log("error on serve", error);
    return false;
  }
}

export async function getAllUsers() {
  try {
    const snapshot = await db.collection("users").get();
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return false;
  }
}

export async function createUser(UserData: UserInter) {
  try {
    const findUser = await getUserByUsername(UserData.username);
    if (findUser) return false;
    const password = hashPassword(UserData.password);
    await db.collection("users").doc().set({
      username: UserData.username,
      name: UserData.name,
      password,
    });
    console.log("User added with Username:", UserData.username);
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

export async function deleteUser(id: string) {
  try {
    await db.collection("users").doc(id).delete();
    console.log("User deleted with ID:", id);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}
