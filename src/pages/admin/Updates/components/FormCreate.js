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
import CreateController, { CreateContext } from "../controllers/CreateController";
import { Notification, toaster } from "rsuite";

const FormCreate = () => {
  const { form, handleSubmit, loadingSubmit } = useContext(CreateContext);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [title, content, thumbnail] = form.watch(["title", "content", "thumbnail"]);

  const [thumbnailSrc, setThumbnailSrc] = useState(undefined);
  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail?.blobFile);

      reader.onloadend = function (e) {
        setThumbnailSrc(e.currentTarget.result);
      }.bind(this);
    } else {
      setThumbnailSrc(undefined);
    }
  }, [thumbnail]);

  return (
    <div>
      <ContentHeader className="mb-6">Create New Update</ContentHeader>

      <div className="mb-6 p-4 bg-white bg-opacity-10 rounded-xl">
        <form className="p-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
          <div className="my-2 flex justify-end">
            <Button className="bg-opacity-100 hover:bg-opacity-80 text-black" loading={loadingSubmit}>
              Save
            </Button>
          </div>
        </form>
      </div>

      <Divider className="mb-6">Preview</Divider>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BlogCard title={title} thumbnailSrc={thumbnailSrc} content={content} date={`Updates - ${currentDate}`} />
        </div>
        <div>
          <PreviewCard title={title} date={currentDate}>
            {thumbnailSrc ? (
              <img src={thumbnailSrc} className="w-full object-cover" style={{ aspectRatio: "1920/1080" }} />
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
  <CreateController>
    <FormCreate />
  </CreateController>
);
