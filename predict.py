import torch
import regex
import tqdm

class PythonPredictor:
    def __init__(self, dataset = "roberta.large"):
        roberta = torch.hub.load("pytorch/fairseq", dataset)
        roberta.eval()

        self.model = roberta

    def predict(self, payload):
        predictions = self.model.fill_mask(payload["text"] + " <mask>", topk=5)
        return [prediction[2] for prediction in predictions]