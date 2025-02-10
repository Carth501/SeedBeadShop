from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
	return 'Hello, World!'

# Define a GET endpoint
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message='Hello, Client!')

# Define a POST endpoint
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    # Process the data as needed
    return jsonify(status='success', received=data)

if __name__ == '__main__':
    app.run(debug=True)