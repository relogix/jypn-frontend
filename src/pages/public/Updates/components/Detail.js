import moment from "moment";
import { useContext } from "react";
import BlogCard from "../../../../components/BlogCard";
import Button from "../../../../components/inputForm/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import DetailController, { DetailContext } from "../controllers/DetailController";

const Detail = () => {
  const history = useHistory();
  const { update, loadingUpdate } = useContext(DetailContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-4">
      <div className="col-span-3">
        <div className="flex justify-between mb-4">
          <Link to="#" onClick={() => history.goBack()}>
            <Button className="flex items-center">
              <BiLeftArrowAlt className="mr-1 text-lg" /> Back
            </Button>
          </Link>
        </div>
        <BlogCard
          title={update?.title}
          thumbnailSrc={update?.thumbnailUrl}
          placeholderSrc={update?.lowThumbnailUrl}
          content={update?.content}
          date={`Updates - ${moment(new Date(update?.createdAt)).format("YYYY-MM-DD")}`}
          loading={loadingUpdate}
        />
      </div>
    </motion.div>
  );
};

export default () => (
  <DetailController>
    <Detail />
  </DetailController>
);
