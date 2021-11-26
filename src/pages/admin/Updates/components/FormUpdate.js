import { useForm } from "react-hook-form";
import ContentHeader from "../../../../components/ContentHeader";
import Button from "../../../../components/inputForm/Button";
import Input from "../../../../components/inputForm/Input";
import InputUpload from "../../../../components/inputForm/InputUpload";
import Textarea from "../../../../components/inputForm/Textarea";
import InputGroup from "../../../../components/inputForm/InputGroup";
import { useContext, useEffect, useState } from "react";
import BlogCard from "../../../../components/BlogCard";
import PreviewCard from "../../../../components/PreviewCard";
import Divider from "../../../../components/Divider";
import moment from "moment";
import UpdateController, { UpdateContext } from "../controllers/UpdateController";
import ProgressiveImage from "react-progressive-image";
import { Context } from "../controllers/Controller";

const FormUpdate = () => {
  const {
    form,
    update,
    loadingSubmitUpdateData,
    handleSubmitUpdateData,
    loadingRemoveThumbnail,
    handleRemoveThumbnail,
    loadingChangeThumbnail,
    handleChangeThumbnail,
  } = useContext(UpdateContext);
  const { handleModalDelete } = useContext(Context);
  const updateDate = moment(new Date(update?.createdAt)).format("YYYY-MM-DD");
  const [title, content, thumbnail, thumbnailUrl, lowThumbnailUrl] = form.watch([
    "title",
    "content",
    "thumbnail",
    "thumbnailUrl",
    "lowThumbnailUrl",
  ]);

  const [thumbnailSrc, setThumbnailSrc] = useState(undefined);
  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail?.blobFile);

      reader.onloadend = function (e) {
        setThumbnailSrc(e.currentTarget.result);
      }.bind(this);
    } else if (thumbnailUrl) {
      setThumbnailSrc(thumbnailUrl);
    } else {
      setThumbnailSrc(undefined);
    }
  }, [thumbnail, thumbnailUrl]);

  return (
    <div>
      <ContentHeader className="mb-6">Edit Update</ContentHeader>

      <div className="mb-6 p-4 bg-white bg-opacity-10 rounded-xl">
        <div className="p-4">
          <form onSubmit={form.handleSubmit(handleSubmitUpdateData)}>
            <InputGroup label="Title" required>
              <Input
                name="title"
                form={form}
                placeholder="Title"
                validation={{
                  required: "Title is required",
                }}
              />
            </InputGroup>
            <InputGroup label="Content" required>
              <Textarea
                name="content"
                form={form}
                placeholder="Content"
                validation={{
                  required: "Content is required",
                }}
              />
            </InputGroup>
            <div className="my-2 flex justify-end">
              <Button
                type="submit"
                className="bg-opacity-100 hover:bg-opacity-80 text-black"
                loading={loadingSubmitUpdateData}
              >
                Save
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <InputGroup label="Thumbnail Image">
              <InputUpload
                name="thumbnail"
                form={form}
                allowExtensions={["jpg", "jpeg", "png"]}
                label="Choose Thumbnail"
                fileList={form.getValues("thumbnail") ? [form.getValues("thumbnail")] : []}
                onChange={(e) => {
                  form.setValue("thumbnail", e[e.length - 1], { shouldValidate: true });
                }}
              />
            </InputGroup>
            <div className="my-2 flex justify-between">
              <Button
                className="bg-red-400 bg-opacity-100 hover:bg-opacity-80 text-white"
                onClick={() => handleModalDelete(true, form.getValues("updateId"))}
              >
                Delete
              </Button>
              <div className="flex justify-between gap-x-4">
                <Button
                  className="bg-red-300 bg-opacity-100 hover:bg-opacity-80 text-black"
                  loading={loadingRemoveThumbnail}
                  onClick={handleRemoveThumbnail}
                  disabled={!thumbnailUrl}
                >
                  Remove Thumbnail
                </Button>
                <Button
                  className="bg-opacity-100 hover:bg-opacity-80 text-black"
                  loading={loadingChangeThumbnail}
                  onClick={handleChangeThumbnail}
                >
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="mb-6">Preview</Divider>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BlogCard
            title={title}
            thumbnailSrc={thumbnailSrc}
            placeholderSrc={thumbnailSrc === thumbnailUrl && lowThumbnailUrl}
            content={content}
            date={`Updates - ${updateDate}`}
          />
        </div>
        <div>
          <PreviewCard title={title} date={updateDate}>
            {thumbnailSrc ? (
              <ProgressiveImage src={thumbnailSrc} placeholder={lowThumbnailUrl}>
                {(src) => <img src={src} className="w-full object-cover" style={{ aspectRatio: "1920/1080" }} />}
              </ProgressiveImage>
            ) : (
              content
            )}
          </PreviewCard>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <UpdateController>
    <FormUpdate />
  </UpdateController>
);
