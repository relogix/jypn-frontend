const YoutubeEmbed = ({ embedId }) => {
  return (
    <div style={{ paddingBottom: "56.25%" }} className="my-4 h-0 relative">
      <iframe
        className="w-full h-full absolute"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
