// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


import User from '../../services/firebase/classes/User';
type Data = {
  msg: string

}






export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {





  // const user: User = {

  //   username: "tom",
  //   email: "so@gmail.com",
  //   password: "123",

  // }


  // try {
  //   const db = admin.firestore()

  //   // add user
  //   const userCollection = db.collection('users')
  //   const tomDoc = userCollection.doc("useridtom111")
  //   // tomDoc.set(user)

  // add layer
  //   const layerCollection = tomDoc.collection("layers")
  //   const bgDoc = layerCollection.doc("layerIdbg222");


  //   /**
  //    * Add Imgs for a layer
  //   */

  //   const imgsCollection = bgDoc.collection("imgs");
  //   const pink = imgsCollection.doc("imgID2")
  //   // pink.set({
  //   //   filename: "yellow#30",
  //   //   path: "fake/path/2"
  //   // })



  //   // bgDoc.set({
  //   //   folderName: "bg",
  //   // })


  //   // const tomData = await tomDoc.get();
  //   // if (!tomData.exists) {
  //   //   console.log('No such document!');
  //   // } else {
  //   //   console.log('Document data:', tomData.data());
  //   // }


  //   /**
  //   * get layers
  //   * */
  //   // const tomsLayers = await layerCollection.get()
  //   // tomsLayers.forEach(doc => {
  //   //   console.log(doc.id, '=>', doc.data());
  //   // });

  //   /**
  //    * Get imgs for a layer
  //    * */
  //   // const tomsImgs = await imgsCollection.get()
  //   // tomsImgs.forEach(doc => {
  //   //   console.log(doc.id, '=>', doc.data());
  //   // });



  //   /**
  //    * update layer name
  //    * */
  //   // bgDoc.update({
  //   //   folderName: "legs"
  //   // })

  //   /**
  //    *  push layer to layers
  //    * */
  //   // doc.update({
  //   //   layers: admin.firestore.FieldValue.arrayUnion({
  //   //     folderName: "eyes",
  //   //     imgs: []
  //   //   })
  //   // });


  //   /**
  //   *  push img to layer
  //   * */
  //   // doc.update({
  //   //   'layers.imgs': admin.firestore.FieldValue.arrayUnion({
  //   //     filename: 'pink#3.png',
  //   //     path: "img/path3"
  //   //   })
  //   // });



  //   // doc.set(user)


  //   console.log("added ");
  // } catch (e) {
  //   console.log("Error adding document: ", e);
  // }




  const user = new User()
  const isSended = await user.sendVerificationCode('7b5c6338-e48b-48f0-a129-a89c775a8569')
  console.log('iseSended: ', isSended)

  return res.json({ msg: "hello api" })
}
