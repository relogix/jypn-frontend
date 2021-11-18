import moment from "moment";
import { useContext } from "react";
import { Dropdown } from "rsuite";
import BlogCard from "../../../../components/BlogCard";
import Button from "../../../../components/inputForm/Button";
import { BiLeftArrowAlt, BiPencil, BiTrash } from "react-icons/bi";
import DetailController, { DetailContext } from "../controllers/DetailController";
import { Context } from "../controllers/Controller";
import { Link } from "react-router-dom";
import { adminRouteSlug } from "../../../../router/adminRoute";
import { stringToURL } from "../../../../utils/string.util";

const Detail = () => {
  const { handleModalDelete } = useContext(Context);
  const { update, loadingUpdate } = useContext(DetailContext);

  return (
    <div className="grid md:grid-cols-4">
      <div className="col-span-3">
        <div className="flex justify-between mb-4">
          <Link to={adminRouteSlug.UPDATES}>
            <Button className="flex items-center">
              <BiLeftArrowAlt className="mr-1 text-lg" /> Back
            </Button>
          </Link>

          <Dropdown title="Action" placement="bottomEnd">
            <Dropdown.Item>
              <Link to={`${adminRouteSlug.UPDATE_UPDATE}/${update?.updateCode}/${stringToURL(update?.title || "")}`}>
                <div className="flex items-center">
                  <BiPencil className="mr-1" />
                  Edit
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item style={{ color: "#ff704d" }} onSelect={() => handleModalDelete(true, update?.updateId)}>
              <div className="flex items-center">
                <BiTrash className="mr-1" />
                Delete
              </div>
            </Dropdown.Item>
          </Dropdown>
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
    </div>
  );
};

export default () => (
  <DetailController>
    <Detail />
  </DetailController>
);
