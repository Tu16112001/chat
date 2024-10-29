export const URL_Login = 'http://localhost:8080/auth/signin/social';//login



// const createOrNavigateToChatRoom = async (matching) => {
//     try {
//         const existingChatQuery = await firebase.firestore()
//             .collection("messages")
//             .where(`participants.${userId}`, "==", true)
//             .where(`participants.${matching.id}`, "==", true)
//             .get();

//         if (existingChatQuery.empty) {
//             // Tạo phòng tin nhắn mới
//             const participants = {
//                 [userId]: true,
//                 [matching.id]: true
//             };

//             const chatRoomRef = await firebase.firestore().collection("messages").add({
//                 participants,
//                 matching,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp()
//             });

//             navigate(`/Mess/${chatRoomRef.id}`);
//         } else {
//             // Chuyển hướng đến phòng tin nhắn đã tồn tại
//             navigate(`/Mess/${existingChatQuery.docs[0].id}`);
//         }
//     } catch (error) {
//         console.error("Error creating or navigating to chat room: ", error);
//     }
// };

// const [mess, setMess] = useState([]);

// useEffect(() => {
//     // Lắng nghe thay đổi trong bảng "messages"
//     const unsubscribe = firebase.firestore().collection("messages").onSnapshot((snapshot) => {
//         const messData = [];
//         snapshot.forEach(doc => {
//             const messItemData = doc.data();
//             const matchingData = messItemData.matching; // Lấy thông tin từ trường matching
//             messData.push({ id: doc.id, matching: matchingData });
//         });

//         setMess(messData);
//     });

//     // Remember to unsubscribe when component unmounts to avoid memory leaks
//     return () => unsubscribe();
// }, []);
