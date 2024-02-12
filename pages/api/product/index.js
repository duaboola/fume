import sessionChecker from "~/lib/sessionPermission";
import ProductModel from "../../../models/product";
import dbConnect from "../../../utils/dbConnect";

export default async function apiHandler(req, res) {
  const { method, query } = req;
  // if (!(await sessionChecker(req, "product")))
  //   return res
  //     .status(403)
  //     .json({ success: false, message: "Access Forbidden" });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const productItemField = {
          name: 1,
          slug: 1,
          image: 1,
          unit: 1,
          unitValue: 1,
          price: 1,
          discount: 1,
          type: 1,
          variants: 1,
          quantity: 1,
          date: 1,
          review: 1,
          categories:1
        };
        let search = {};
        if(query && Object.keys(query).length > 0){
          search['categories'] = {$in:[query.category]}
        }
        const product = await ProductModel.find(search).sort("-date").select(productItemField).exec();
        res.status(200).json({ success: true, product });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
