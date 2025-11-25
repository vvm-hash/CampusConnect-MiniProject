// src/screens/services/chatService.ts
import firestore from "@react-native-firebase/firestore";

export type Thread = {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: any;
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt?: any;
};

// Create a thread between two users or return existing one
export async function createOrGetThread(currentUid: string, otherUid: string) {
  const threadsRef = firestore().collection("threads");

  // Find existing thread where both are participants
  const snapshot = await threadsRef
    .where("participants", "array-contains", currentUid)
    .get();

  let existing = snapshot.docs.find((doc) => {
    const data: any = doc.data();
    return (
      Array.isArray(data.participants) &&
      data.participants.includes(currentUid) &&
      data.participants.includes(otherUid)
    );
  });

  if (existing) {
    return existing.id;
  }

  // Create new thread
  const newDoc = await threadsRef.add({
    participants: [currentUid, otherUid],
    lastMessage: "",
    lastMessageAt: firestore.FieldValue.serverTimestamp(),
  });

  return newDoc.id;
}

// Listen to all threads of a user
export function listenToThreads(
  currentUid: string,
  callback: (threads: Thread[]) => void
) {
  return firestore()
    .collection("threads")
    .where("participants", "array-contains", currentUid)
    .orderBy("lastMessageAt", "desc")
    .onSnapshot(
      (snapshot) => {
        if (!snapshot) {
          callback([]);
          return;
        }

        const threads: Thread[] = snapshot.docs.map((doc) => {
          const data: any = doc.data();
          return {
            id: doc.id,
            participants: data.participants || [],
            lastMessage: data.lastMessage || "",
            lastMessageAt: data.lastMessageAt || null,
          };
        });

        callback(threads);
      },
      (error) => {
        console.log("listenToThreads error:", error);
        callback([]);
      }
    );
}

// Listen to messages inside a thread
export function listenToMessages(
  threadId: string,
  callback: (messages: Message[]) => void
) {
  return firestore()
    .collection("threads")
    .doc(threadId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .onSnapshot(
      (snapshot) => {
        if (!snapshot) {
          callback([]);
          return;
        }

        const messages: Message[] = snapshot.docs.map((doc) => {
          const data: any = doc.data();
          return {
            id: doc.id,
            text: data.text || "",
            senderId: data.senderId,
            createdAt: data.createdAt || null,
          };
        });

        callback(messages);
      },
      (error) => {
        console.log("listenToMessages error:", error);
        callback([]);
      }
    );
}

// Send a message in a thread
export async function sendMessage(
  threadId: string,
  text: string,
  senderId: string
) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const msgRef = firestore()
    .collection("threads")
    .doc(threadId)
    .collection("messages");

  await msgRef.add({
    text: trimmed,
    senderId,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  // Update thread preview
  await firestore().collection("threads").doc(threadId).update({
    lastMessage: trimmed,
    lastMessageAt: firestore.FieldValue.serverTimestamp(),
  });
}
