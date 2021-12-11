import { Button } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import Alert from "../../../../components/Alert";

const ComingSoon = () => {
  const toast = useToast();
  const [feedback, setFeedback] = useState("");

  // Submit Feedback
  const [submitFeedbackLoading, setSubmitFeedbackLoading] = useState(false);
  const submitFeedback = async () => {
    setSubmitFeedbackLoading(true);

    // IP Address
    const { data: ipAddress } = await axios.get("https://api.ipify.org?format=json").catch((err) => {
      setSubmitFeedbackLoading(false);
    });

    // Submit
    axios
      .post("/api/feedbacks", {
        data: {
          ipAddress: ipAddress?.ip || "0.0.0.0",
          feedback,
        },
      })
      .then((res) => {
        toast({
          render: () => <Alert title="Thanks!" caption="Your feedback sucessfully submitted" status="success" />,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          render: () => <Alert title="Your feedback not submitted." caption="Please try again later" status="error" />,
          position: "top",
        });
      })
      .finally(() => {
        setFeedback("");
        setSubmitFeedbackLoading(false);
      });
  };

  return (
    <div className="w-full h-screen bg-gradient-primary text-gray-800 flex flex-col gap-y-6 justify-center md:items-center px-8">
      <h1 className="poppins font-bold text-5xl uppercase -mb-2">
        <span className="text-transparent" style={{ WebkitTextStrokeColor: "#333", WebkitTextStrokeWidth: "1.5px" }}>
          New
        </span>{" "}
        Features{" "}
        <span className="text-transparent" style={{ WebkitTextStrokeColor: "#333", WebkitTextStrokeWidth: "1.5px" }}>
          Coming
        </span>{" "}
        Soon
      </h1>
      <p className="text-sm">Help us by giving your feedback, suggestions, or critiques</p>

      <Textarea
        background="none"
        className="border-0 bg-white bg-opacity-30 md:w-1/2 text-sm"
        placeholder="Write your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button
        className="text-white bg-gray-800 hover:bg-gray-700"
        onClick={() => submitFeedback()}
        isLoading={submitFeedbackLoading}
      >
        Submit
      </Button>
    </div>
  );
};

export default ComingSoon;
