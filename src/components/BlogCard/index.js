import { useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-image";
import { Placeholder } from "rsuite";
import { youtubeLink } from "../../utils/string.util";
import YoutubeEmbed from "../Embed/YoutubeEmbed";

const BlogCard = ({
  title = "",
  thumbnailSrc = undefined,
  placeholderSrc = undefined,
  content = "",
  date = "",
  loading = false,
}) => {
  const [youtubeEmbedId, setYoutubeEmbedId] = useState();
  useEffect(() => {
    setYoutubeEmbedId(youtubeLink(content));
  }, [content]);

  return (
    <div className="p-4 px-6 bg-white bg-opacity-10 rounded-xl">
      <h2 className="poppins font-medium text-xl md:text-2xl">
        {loading ? <Placeholder.Paragraph rows={1} rowHeight={20} className="mb-1" /> : title}
      </h2>
      <div className="font-light opacity-60 italic" style={{ fontSize: "0.7rem" }}>
        {loading ? <Placeholder.Paragraph rows={1} rowHeight={10} className="mb-2" /> : date}
      </div>
      {thumbnailSrc && (
        <ProgressiveImage src={thumbnailSrc} placeholder={placeholderSrc || undefined}>
          {(src) => <img className="w-full my-4 object-cover rounded-md" src={src} alt="Thumbnail" />}
        </ProgressiveImage>
      )}

      <div className="mt-8 whitespace-pre-wrap">
        {loading ? (
          <Placeholder.Paragraph rows={5} rowMargin={15} />
        ) : youtubeEmbedId ? (
          <YoutubeEmbed embedId={youtubeEmbedId} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default BlogCard;
