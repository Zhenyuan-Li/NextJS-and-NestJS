import { buildFeedbackPath, extractFeedback } from './index';

function handler(req, res) {
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const feedbackId = req.query.feedbackId;
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({
    feedback: selectedFeedback,
  });
}

export default handler;
