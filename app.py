from flask import Flask, request, render_template, send_from_directory
from predict import PythonPredictor
import json

app = Flask(__name__, template_folder='templates')
textPredictor = PythonPredictor(dataset="roberta.base")

@app.route('/predict', methods=['POST'])
def predict():
    req_data = request.get_json(force=True)
    content = json.dumps(textPredictor.predict({
        "text": req_data['text']
    })[0])
    return content[1:-1]

@app.route('/')
def home():
    return render_template("index.html")

if __name__=="__main__":
    app.run()